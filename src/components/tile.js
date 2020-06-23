import {TileMap} from 'Src/constants';

export class Tile {
    constructor(x, y, type) {
        this.x = x | 0;
        this.y = y | 0;
        this.type = TileMap[type];
    }

    pos() {
        return `${this.x},${this.y}`;
    }
}
