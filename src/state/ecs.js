import {Engine} from 'geotic';
import {Cache} from './Cache';
import * as components from 'src/components';
import * as prefabs from 'src/prefabs';

export const ecs = new Engine();
export const cache = new Cache();

ecs.clear = () => {
    for (const entity of ecs.entities.all) {
        entity.destroy();
    }
};

for (const component of components) {
    ecs.registerComponent(component);
}

for (const prefab of prefabs) {
    ecs.registerPrefab(prefab);
}

export let gameState = {};

export let player = {};

export function saveGame() {
    const gameSaveData = JSON.stringify({
        ecs: ecs.serialize(),
        cache: cache.serialize(),
        gameState,
    });
    localStorage.setItem('gameSaveData', gameSaveData);

    console.log('Game saved to local storage');
}

export function loadGame() {
    const data = JSON.parse(localStorage.getItem('gameSaveData'));
    if (!data) {
        console.log('No Saved Games Found');
        return;
    }

    clear();

    ecs.deserialize(data.ecs);
    cache.deserialize(data.cache);
    gameState = data.gameState;

    console.log('Local save game data loaded', {
        ecs,
        cache,
        gameState,
    });
}

export function initState() {
    gameState = {
        userInput: null,
        activePawn: 0,
    };
    ecs.clear();
    cache.clear();
}
