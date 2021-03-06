import * as characters from "./information/characters";
import character from "./character";
import getResolution from "./information/resolutions";
import {gameOverModal, informationModal} from "./modals";

class battle {
    constructor(character1, character2) {
        this.player = character1;
        let enemies = Object.values(characters);
        let enemy = enemies[Math.floor(Math.random() * enemies.length)];
        // let enemy = enemies[3];
        this.enemy = new character(enemy, -128);
        this.addButtons(this.player);
        this
            .player
            .renderChar("player");
        this
            .enemy
            .renderChar("enemy");
        this.checkWinner = this
            .checkWinner
            .bind(this);
    }

    addButtons(player) {
        let moves = document.querySelector(".moves-list");
        player
            .moves
            .forEach(move => {
                let moveLi = document.createElement('IMG');
                moveLi.setAttribute('src', move.image);
                moveLi.setAttribute("class", "move");
                moveLi.addEventListener("click", () => {
                    this.handleMove(move);
                });
                moves.appendChild(moveLi);
            });
    }

    handleMove(move) {
        if (!(this.player.alive() && this.enemy.alive())) 
            return null;
        this
            .player
            .renderMove(move.render.start, move);
        let enemyMove = this
            .enemy
            .getMove();
        let resolution = getResolution(move.move, enemyMove.move);
        this.handleHp(resolution);
        let previous = document.getElementsByClassName('announce')[0];
        if (previous) {
            previous.remove();
        }
        let announce = document.createElement("DIV");
        announce.innerText = resolution.string;
        announce.setAttribute("class", "announce");
        let sky = document.getElementsByClassName('sky')[0];
        sky.appendChild(announce);
    }

    handleHp(resolution) {
        this.player.hitPoints -= resolution.player;
        this.enemy.hitPoints -= resolution.enemy;
        if (this.enemy.hitPoints > 50) 
            this.enemy.hitPoints = 50;
        if (this.player.hitPoints > 50) 
            this.player.hitPoints = 50;
        let pHealth = document.getElementsByClassName(this.player.identifier)[0];
        pHealth.style.width = `${ (this.player.hitPoints * 100) / 50}%`;
        let eHealth = document.getElementsByClassName(this.enemy.identifier)[0];
        eHealth.style.width = `${ (this.enemy.hitPoints * 100) / 50}%`;
        setTimeout(this.checkWinner, 500);
        // this.checkWinner();
    }

    checkWinner() {
        if (!this.enemy.alive()) {
            this
                .enemy
                .renderDeath(10);

            gameOverModal("Congratulats, you won!!!", this);
        } else if (!this.player.alive()) {
            this
                .player
                .renderDeath(10);
            gameOverModal("I'm Sorry, you died", this);
        }
    }
}
export default battle;