import {cellToId} from './points';

/**
 * Returns true if a given point is within the given circle
 * @param {Point|Cell} center
 * @param {number} radius
 * @param {Point|Cell} p
 * @returns {boolean}
 **/
export const isPointInCircle = (center, radius, p) => {
    const dx = center.x - p.x;
    const dy = center.y - p.y;
    const distance_squared = dx * dx + dy * dy;
    return distance_squared <= radius * radius;
};

/**
 * Returns array of all LocIds withing the given circle
 * @param {Point|Cell} center
 * @param {number} radius
 * @returns {LocId[]}
 **/
export const circle = (center, radius) => {
    const top = (center.y - radius) | 0;
    const bottom = (center.y + radius) | 0;
    const left = (center.x - radius) | 0;
    const right = (center.x + radius) | 0;

    const locIds = [];

    for (let y = top; y <= bottom; ++y) {
        for (let x = left; x <= right; ++x) {
            const cell = {x, y};
            if (isPointInCircle(center, cell, radius)) {
                const locId = cellToId(cell);
                locIds.push(locId);
            }
        }
    }

    return locIds;
};
