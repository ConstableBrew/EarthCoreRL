import {Engine} from 'geotic';
import * as components from 'src/components';
import * as prefabs from 'src/prefabs';

export const ecs = new Engine();

for (const component of components) {
    ecs.registerComponent(component);
}

for (const prefab of prefabs) {
    ecs.registerPrefab(prefab);
}

export let gameState = {
    userInput: null,
    playerTurn: true,
    turn: 0,
};

export function saveGame() {
    const gameSaveData = JSON.stringify({
        ecs: ecs.serialize(),
        gameState,
    });
    localStorage.setItem('gameSaveData', gameSaveData);

    console.log('Game save to local storage');
}

export function loadGame() {
    const data = JSON.parse(localStorage.getItem('gameSaveData'));
    if (!data) {
        console.log('No Saved Games Found');
        return;
    }

    for (let item of ecs.entities.all) {
        item.destroy();
    }

    ecs.deserialize(data.ecs);
    cache.deserialize(data.cache);
    gameState = data.gameState;

    console.log('Local save game data loaded', {
        ecs,
        cache,
        gameState,
    });
}
