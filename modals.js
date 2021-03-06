import character from "./character";
import * as characters from "./information/characters";
import {startGame} from "./game";

export const gameOverModal = (message, battle) => {
    let game = document.getElementsByClassName("game")[0];
    let modalBackground = document.createElement("DIV");
    modalBackground.setAttribute("class", "modal-background");
    game.appendChild(modalBackground);
    let modal = document.createElement("div");
    modal.setAttribute("class", "announce modal");
    modalBackground.appendChild(modal);
    let goMsg = document.createElement("DIV");
    goMsg.innerHTML += message;
    modal.appendChild(goMsg);
    let goButtons = document.createElement("DIV");
    goButtons.setAttribute("class", "go-buttons");
    modal.appendChild(goButtons);
    let playAgainButton = document.createElement("div");
    playAgainButton.innerHTML = "Play Again";
    playAgainButton.setAttribute("class", "button");
    playAgainButton.addEventListener("click", () => {
        let moveLi = document.getElementsByClassName("moves-list")[0];
        while (moveLi.firstChild) 
            moveLi.removeChild(moveLi.firstChild);
        let enemies = document.getElementsByClassName("enemy-chars")[0];
        enemies.innerHTML = '';
        let player = document.getElementsByClassName("player-chars")[0];
        player.innerHTML = '';
        let announce = document.getElementsByClassName("announce")[0];
        announce.remove();
        modalBackground.remove();
        startGameModal();
    });

    goButtons.appendChild(playAgainButton);
};

export const informationModal = () => {
    let game = document.getElementsByClassName("game")[0];
    let modalBackground = document.createElement("DIV");
    modalBackground.setAttribute("class", "modal-background");
    game.appendChild(modalBackground);
    let moveModal = document.createElement("div");
    moveModal.setAttribute("class", "announce");
    modalBackground.appendChild(moveModal);
    let moveTitle = document.createElement("H3");
    moveTitle.innerHTML = "move interactions";
    moveTitle.setAttribute("class", "moves-modal-text");
    moveModal.appendChild(moveTitle);
    let moveInteractions = document.createElement("img");
    moveInteractions.src = "./assets/moves/moveChart.png";
    moveModal.appendChild(moveInteractions);
    let instructions = document.createElement('div');
    instructions.setAttribute("class", "moves-modal-with-arrow");
    moveModal.appendChild(instructions);
    let arrow = document.createElement("p");
    arrow.setAttribute("class", "arrow");
    arrow.innerHTML = "&#8665;";
    instructions.appendChild(arrow);
    let instructionText = document.createElement("div");
    instructionText.innerHTML = "click your move";
    instructionText.setAttribute("class", "instruction-text");
    instructions.appendChild(instructionText);
    let gotItButton = document.createElement('div');
    gotItButton.innerHTML = "Got it";
    gotItButton.setAttribute("class", "button");
    gotItButton.addEventListener("click", () => {
        modalBackground.remove();
    });
    moveModal.appendChild(gotItButton);
};

export const startGameModal = () => {
    let game = document.getElementsByClassName("game")[0];
    let modalBackground = document.createElement("DIV");
    modalBackground.setAttribute("class", "start-background");
    game.appendChild(modalBackground);
    let title = document.createElement("H1");
    title.innerHTML = "MEDIEVAL EVIL";
    modalBackground.appendChild(title);
    let startHeader = document.createElement("H2");
    startHeader.innerHTML = "CHOOSE A CHARACTER";
    modalBackground.appendChild(startHeader);
    let characterUL = document.createElement("UL");
    modalBackground.appendChild(characterUL);
    Object
        .values(characters)
        .forEach((char, ind) => {
            let canvas = document.createElement("CANVAS");
            canvas.setAttribute("class", `canvas-${ind} choose-char`);
            characterUL.appendChild(canvas);
            renderWalking(ind, 0, char.sprites);
            canvas.addEventListener("click", () => {
                startGame(char);
                modalBackground.remove();
            });
        });
};

const renderWalking = (index, start, spriteSrc) => {
    let canvas = document.getElementsByClassName(`canvas-${index}`)[0];
    if (!canvas) 
        return null;
    let context = canvas.getContext("2d");
    canvas.style.width = "150px";
    canvas.style.height = "150px";
    let image = new Image();
    image.src = spriteSrc;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, start, 649, 64, 64, 75, 0, 150, 150);
    setTimeout(() => renderWalking(index, (start + 64) % 384, spriteSrc), 100);
};