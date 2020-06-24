document.addEventListener('keydown', (event) => input(event.key));

import {MoveTo} from 'src/components';
import {gameState, player, loadGame, saveGame} from 'src/state';

const MOVE = 'MOVE';
const SAVE = 'SAVE';
const LOAD = 'LOAD';

export const input = (key) => {
    switch (key) {
        case 'S':
            gameState.userInput = {type: SAVE, payload: {}};
            break;
        case 'L':
            gameState.userInput = {type: LOAD, payload: {}};
            break;
        case 'ArrowUp':
            gameState.userInput = {type: MOVE, payload: {x: 0, y: -1}};
            break;
        case 'ArrowDown':
            gameState.userInput = {type: MOVE, payload: {x: 0, y: 1}};
            break;
        case 'ArrowLeft':
            gameState.userInput = {type: MOVE, payload: {x: -1, y: 0}};
            break;
        case 'ArrowRight':
            gameState.userInput = {type: MOVE, payload: {x: 1, y: 0}};
            break;
        case 'Escape': {
            gameState.userInput = {type: ESCAPE, payload: {}};
            break;
        }
    }
};

export const processUserInput = () => {
    if (!gameState.userInput) {
        return;
    }

    const {type, payload} = gameState.userInput;

    if (type === MOVE) {
        player.add(MoveTo, payload);
    }

    if (type === SAVE) {
        saveGame();
    }

    if (type === LOAD) {
        loadGame();
    }
};