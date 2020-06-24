import {AABB, Tile} from 'Components';
import {isPointInPolygon, RNG, roughLine} from 'Utilities';
import {TileMap, TileTypes} from 'Src/constants';

export class Room extends AABB {
    constructor(x, y, height, width) {
        super(x, y, height, width);
        this.polyline = [
            {x: this.x + 1, y: this.y + 1},
            {x: this.x2 - 2, y: this.y + 1},
            {x: this.x2 - 2, y: this.y2 - 2},
            {x: this.x + 1, y: this.y2 - 2},
        ];
        this.exits = [
            {x: this.x + RNG.die(width - 2), y: this.y, link: null, parent: this}, // Top
            {x: this.x2, y: this.y + RNG.die(height - 2), link: null, parent: this}, // Right
            {x: this.x + RNG.die(width - 2), y: this.y2, link: null, parent: this}, // Bottom
            {x: this.x, y: this.y + RNG.die(height - 2), link: null, parent: this}, // Left
        ];
        this.tiles = Object.create(null);
    }

    carve() {
        // Open up interior space
        for (let y = this.y; y < this.y2; ++y) {
            for (let x = this.x; x < this.x2; ++x) {
                const point = {x, y};
                if (isPointInPolygon(this.polyline, point)) {
                    this.openTile(point);
                }
            }
        }

        // Draw a rough line of open tiles for each segment of the polyline boundry
        this.polyline.forEach((p, i) => {
            const q = this.polyline[i + 1] || this.polyline[0];
            const points = roughLine(p, q);
            points && points.forEach((point) => {
                this.openTile(point);
            });
        });
    }

    openTile(point) {
        const tile = new Tile(point.x, point.y, TileTypes.open);
        this.tiles[tile.pos()] = tile;
    }
}

export class RoughRect extends Room {
    constructor(x, y, height, width) {
        super(x, y, height, width);
        this.polyline = [
            {x: this.x, y: this.y},
            {x: this.x2, y: this.y},
            {x: this.x2, y: this.y2},
            {x: this.x, y: this.y2},
        ];
        this.exits = [
            {x: this.x + RNG.die(width - 2), y: this.y, link: null, parent: this}, // Top
            {x: this.x2, y: this.y + RNG.die(height - 2), link: null, parent: this}, // Right
            {x: this.x + RNG.die(width - 2), y: this.y2, link: null, parent: this}, // Bottom
            {x: this.x, y: this.y + RNG.die(height - 2), link: null, parent: this}, // Left
        ];
        this.tiles = Object.create(null);
    }
}