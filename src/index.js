import {Display} from 'rot-js/lib';
import {RNG} from 'Utilities';
import {Room} from 'Components';
import {TileMap, TileTypes} from 'Src/constants';

RNG.init(Math.random());

const rows = 120;
const cols = 60;
const display = new Display({width: rows, height: cols});
const canvas = display.getContainer();
canvas.id = 'main';
document.body.appendChild(canvas);

const rooms = [
    new Room(50, 20, 20, 20), // Just a rect about half the screen size, centered
];

const drawRoom = (room) => {
    const {x, y, x2, y2, tiles, exits} = room;
    console.log({tiles})
    Object.keys(tiles).forEach((pos) => {
        const tile = tiles[pos];
        const [ch, color, bgcolor] = tile.type;
        display.draw(tile.x, tile.y, ch, color, bgcolor);
    });

    if (DEBUG) {
        let [ch, color, bgcolor] = TileMap[TileTypes._debug];

        // Draw room's AABB
        display.draw(x, y, '╭', color, bgcolor);
        display.draw(x2, y, '╮', color, bgcolor);
        display.draw(x2, y2, '╯', color, bgcolor);
        display.draw(x, y2, '╰', color, bgcolor);
        for (let i = x + 1; i < x2; ++i) {
            display.draw(i, y, '─', color, bgcolor);
            display.draw(i, y2, '─', color, bgcolor);
        }
        for (let j = y + 1; j < y2; ++j) {
            display.draw(x, j, '│', color, bgcolor);
            display.draw(x2, j, '│', color, bgcolor);
        }
        exits.forEach((exit) => {
            display.draw(exit.x, exit.y, '◌', color, bgcolor);
        });
    }
};

rooms.forEach((room) => {
    room.carve();
    drawRoom(room);
});
