import {RNG} from 'src/lib/rng';

/**
 * The four primary directions
 * @const {Cell[]} CARDINAL
 */
export const CARDINAL = [
    {x: 0, y: -1}, // N
    {x: 1, y: 0}, // E
    {x: 0, y: 1}, // S
    {x: -1, y: 0}, // W
];

/**
 * The four diagonal directions
 * @const {Cell[]} DIAGONAL
 */
export const DIAGONAL = [
    {x: 1, y: -1}, // NE
    {x: 1, y: 1}, // SE
    {x: -1, y: 1}, // SW
    {x: -1, y: -1}, // NW
];

/**
 * All eight principal compas directions
 * @const {Cell[]} ALL
 */
export const ALL = [...CARDINAL, ...DIAGONAL];

/**
 * Enum for compas directions
 * @enum {number}
 */
export const DIRECTIONS = {
    n: 0,
    e: 1,
    s: 2,
    w: 3,
    ne: 4,
    se: 5,
    sw: 6,
    nw: 7,
};

/**
 * A 2D point or vector
 * @typedef {Object} Point
 * @property {number} x - horizontal position
 * @property {number} y - vertical position
 **/

/**
 * A point on a map grid, integer values
 * @typedef {Object} Cell
 * @property {integer} x - horizontal position
 * @property {integer} y - vertical position
 **/

/**
 * A string hash representing a Cell
 * @typedef {string} LocId - A string in the form "xx,yy" where xx is the horizontal position and yy is the vertical position
 **/

/**
 * Returns a Cell object when given a Cell or LocId
 * @param {(LocId|Cell)} cellOrId
 * @returns {Cell}
 **/
export const toCell = (cellOrId) => {
    let cell = cellOrId;
    if (typeof cell === 'string') cell = idToCell(cell);

    return cell;
};

/**
 * Returns a LocId when given a Cell or LocId
 * @param {(LocId|Cell)} cellOrId
 * @returns {LocId}
 **/
export const toLocId = (cellOrId) => {
    let locId = cellOrId;
    if (typeof locId !== 'string') locId = cellToId(locId);

    return locId;
};

/**
 * Returns a Cell object when given a LocId
 * @param {LocId} locId
 * @returns {Cell}
 **/
export const idToCell = (locId) => {
    const [x, y] = locId.split(',').map((n) => Number.parseInt(n, 10));
    return {x, y};
};

/**
 * Returns a LocId when given a Cell object
 * @param {Cell} cell
 * @param {number} cell.x - horizontal position
 * @param {number} cell.y - vertical position
 * @returns {LocId}
 **/
export const cellToId = ({x, y}) => `${x},${y}`;

/**
 * Returns the distance between two points
 * @param {(Point|Cell)} a
 * @param {(Point|Cell)} b
 * @returns {boolean}
 **/
export const distance = (a, b) => {
    const x = (b.x - a.x) ** 2;
    const y = (b.y - a.y) ** 2;
    return (x + y) ** 0.5 | 0;
};

/**
 * Returns the manhattan distance between two points
 * @param {(Point|Cell)} a
 * @param {(Point|Cell)} b
 * @returns {boolean}
 **/
export const manhattan = (a, b) => {
    const x = Math.abs(b.x - a.x);
    const y = Math.abs(b.y - a.y);
    return x + y;
};

/**
 * Returns array of all locIds neighboring the given Cell
 * @param {Cell} cell
 * @param {(CARDINAL|DIAGONAL|ALL|Cell[])} [direction=CARDINAL] - relative offset of cells to consider
 * @param {AABB} [bounds=null] - Restrict to neighbors within the given AABB. No restriction if undefined
 * @returns {LocId}
 **/
export const getNeighbors = ({x, y}, direction = CARDINAL, bounds = null) => {
    const locIds = direction
        .map((dir) => ({x: x + dir.x, y: y + dir.y}))
        .filter(bounds && insideRect.bind(null, bounds) || (() => true))
        .map(cellToId);
    return locIds;

};

/**
 * Returns the locId of the neighbor to the given direction, null if ouside the given bounds
 * @param {Cell}, cell
 * @param {(CARDINAL|DIAGONAL|ALL|Cell[])} [direction=CARDINAL] - relative offset of cells to consider
 * @param {AABB} [bounds=null] - restricts to neighbors within the given AABB. No restriction if undefined
 * @returns {LocId}
 **/
export const getNeighbor = ({x, y}, direction = CARDINAL, bounds = null) => {
    const offset = ALL[direction];
    const cell = {
        x: x + offset.x,
        y: y + offset.y,
    };
    if (bounds && !insideRect(bounds, cell)) {
        return null;
    }
    return cellToId(cell);
};

/**
 * Returns the locId of a random neighbor to the given cell
 * @param {Cell}, cell
 * @param {(CARDINAL|DIAGONAL|ALL|Cell[])} [direction=CARDINAL] - relative offset of cells to consider
 * @param {AABB} [bounds=null] - restricts to neighbors within the given AABB. No restriction if undefined
 * @returns {LocId}
 **/

export const getRandomNeighbor = (cell, direction = CARDINAL, bounds = null) => {
    const neighbors = getNeighbors(cell, direction, bounds);
    const neighbor = neighbors[RNG.die(direction.length) - 1];
    return neighbor;
};
