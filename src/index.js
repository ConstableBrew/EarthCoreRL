import {dictionary} from 'src/dictionary';
import {initCaverns} from 'src/initializers';
import {onClick, onMouseMove} from 'src/lib/display';
import {input, processUserInput} from 'src/lib/process-user-input';
import {RNG} from 'src/lib/rng';
import {initState, gameState} from 'src/state';
import {render} from 'src/systems';

// Set up user input listeners
document.addEventListener('keydown', (event) => input(event.key));
onClick((x, y) => console.log('clicked on', x, y));
onMouseMove((x, y) => console.log('moused over', x, y));

// Game loop tracking
let lastTimestamp = null;
let lag = 0;
const MS_PER_UPDATE = 33; // 33 ms per frame is targeting 30 fps

initGame();

function initGame() {
    const seed = [
        dictionary[(Math.random() * dictionary.length) | 0],
        dictionary[(Math.random() * dictionary.length) | 0],
        dictionary[(Math.random() * dictionary.length) | 0],
    ].join('-');
    console.log('seed:', seed);
    RNG.init(seed);
    initState();
    initCaverns();
    requestAnimationFrame(gameLoop);
}

function stateUpdate() {
    gameState.userInput = null;
}


function gameLoop(timestamp) {
    const elapsed = timestamp - (lastTimestamp || timestamp);
    lastTimestamp = timestamp;
    lag += elapsed;
    while (lag >= MS_PER_UPDATE) {
        stateUpdate();
        lag -= MS_PER_UPDATE;
    }
    render(lag / MS_PER_UPDATE);
    requestAnimationFrame(gameLoop);
}
