import {gameState} from './state';
import {processUserInput} from './lib/process-user-input';

import initCaverns from './initializers/init-caverns';

import {
    fov,
    render,
} from './systems';

initGame();

function initGame() {
    initCaverns();
    requestAnimationFrame(gameLoop);
}

function update() {
    gameState.userInput = null;
}

let lastTimestamp = null;
let lag = 0;
const MS_PER_UPDATE = 33;

function gameLoop(timestamp) {
    if (lastTimestamp === null) {
        lastTimestamp = timestamp;
    }
    const elapsed = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    lag += elapsed;
    while (lag >= MS_PER_UPDATE) {
        update();
        lag -= MS_PER_UPDATE;
    }
    fov();
    render(lag / MS_PER_UPDATE);
    requestAnimationFrame(gameLoop);
}
