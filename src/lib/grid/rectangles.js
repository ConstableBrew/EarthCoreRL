import {cellToId} from './points';

/**
 * Axis Aligned Bounding Box
 * @typedef {Object} AABB
 * @property {number} x1 - Left  
 * @property {number} x2 - Right
 * @property {number} y1 - Top
 * @property {number} y2 - Bottom
 **/

/**
 * Returns array of all LocIds withing the given AABB
 * @param {AABB} rect
 * @returns {LocId[]}
 **/
export const rectangle = ({x1: left, y1: top, x2: right, y2: bottom}) => {
    const locIds = [];

    for (let y = top; y <= bottom; ++y) {
        for (let x = left; x <= right; ++x) {
            const locId = cellToId({x, y});
            locIds.push(locId);
        }
    }

    return locIds;
};

/**
 * Returns true if a given point is within the given AABB
 * @param {AABB} rect
 * @param {(Point|Cell)} cell
 * @returns {boolean}
 **/
export const isPointInRect = ({x1, y1, x2, y2}, {x, y}) => {
    return (
        x >= x1 &&
        x <= x2 &&
        y >= y1 &&
        y <= y2
    );
}

/**
 * Returns true if the given Point is on the border edges of the given AABB
 * @param {AABB} rect
 * @param {(Point|Cell)} cell
 * @returns {boolean}
 **/
export const isPointOnRectEdge = ({x1, y1, x2, y2}, {x, y}) => {
    return (
        x === x1 && y >= y1 && y <= y2 ||
        x === x2 && y >= y1 && y <= y2 ||
        y === y1 && x >= x1 && x <= x2 ||
        y === y2 && x >= x1 && x <= x2
    );
};

/**
 * Returns true if any points within the two given AABBs overlap
 * @param {AABB} rect1
 * @param {AABB} rect2
 * @returns {boolean}
 **/
export const rectsIntersect = (rect1, rect2) => {
    return (
        rect1.x1 <= rect2.x2 &&
        rect1.x2 >= rect2.x1 &&
        rect1.y1 <= rect2.y2 &&
        rect1.y2 >= rect2.y1
    );
};
