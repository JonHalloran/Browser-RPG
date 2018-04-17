import * as moves from './moves';

export const goblin = {
    moves: [moves.basicAttack],

    attributes: {
        speed: 50,
        strength: 50,
        dexterity: 50,
        constitution: 50,
        intelligence: 50
    },

    equipment: {},

    sprites: "./assets/sprites/goblin.png"
};