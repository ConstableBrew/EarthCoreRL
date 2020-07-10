document.addEventListener('keydown', (event) => input(event.key));

import {MoveTo} from 'src/components';
import {gameState, player, loadGame, saveGame} from 'src/state';

const MOVE = 'MOVE';
const SAVE = 'SAVE';
const LOAD = 'LOAD';

export const input = (key) => {
    switch (key) {
        // Game save
        case 'S':
            gameState.userInput.push({type: SAVE, payload: {}});
            break;
        case 'L':
            gameState.userInput.push({type: LOAD, payload: {}});
            break;

        // Movement
        case 'ArrowUp':
            gameState.userInput.push({type: MOVE, payload: {x: 0, y: -1}});
            break;
        case 'ArrowDown':
            gameState.userInput.push({type: MOVE, payload: {x: 0, y: 1}});
            break;
        case 'ArrowLeft':
            gameState.userInput.push({type: MOVE, payload: {x: -1, y: 0}});
            break;
        case 'ArrowRight':
            gameState.userInput.push({type: MOVE, payload: {x: 1, y: 0}});
            break;
    }
};

export const processUserInput = () => {
    while (gameState.userInput.length) {
        const {type, payload} = gameState.userInput.shift();

        if (type === MOVE) {
            player.add(MoveTo, payload);
        }

        if (type === SAVE) {
            saveGame();
        }

        if (type === LOAD) {
            loadGame();
        }
    }
};