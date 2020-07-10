import {
    isPointInRect,
    isPointOnRectEdge,
    rectangle,
    rectsIntersect,
} from './rectangles';

describe('Gird Rectangle Helpers', () => {
    describe('isPointInRect() and isPointOnRectEdge()', () => {
        const points = [
            [{x: 7, y: 7}, true, false],
            [{x: 3, y: 3}, true, true],
            [{x: 3, y: 13}, true, true],
            [{x: 13, y: 3}, true, true],
            [{x: 13, y: 13}, true, true],
            [{x: 7, y: 3}, true, true],
            [{x: 7, y: 13}, true, true],
            [{x: 3, y: 7}, true, true],
            [{x: 13, y: 7}, true, true],
            [{x: 2, y: 3}, false, false],
            [{x: 3, y: 2}, false, false],
            [{x: 14, y: 3}, false, false],
            [{x: 13, y: 2}, false, false],
            [{x: 14, y: 13}, false, false],
            [{x: 13, y: 14}, false, false],
            [{x: 2, y: 13}, false, false],
            [{x: 3, y: 14}, false, false],
        ];
        const rect = {x1: 3, y1: 3, x2: 13, y2: 13};

        test.each(points)('returns bool if point lies within or on the box edge %p', (p, inRectResult, onRectEdgeResult) => {
            expect(isPointInRect(rect, p)).toBe(inRectResult);
            expect(isPointOnRectEdge(rect, p)).toBe(onRectEdgeResult);
        });
    });

    describe('rectangle()', () => {
        it('returns an array of location ids contained by the rect', () => {
            const locIds = rectangle({x1: 1, y1: 2, x2: 3, y2: 4});
            expect(locIds).toEqual(expect.arrayContaining([
                '1,2', '2,2', '3,2',
                '1,3', '2,3', '3,3',
                '1,4', '2,4', '3,4',
            ]));
        });
    });

    describe('rectsIntersect()', () => {
        it('returns true if rects intersect', () => {
            const a = {x1: 3, y1: 3, x2: 10, y2: 10};
            const b = {x1: 1, y1: 2, x2: 3, y2: 4};
            expect(rectsIntersect(a, b)).toBe(true);
            expect(rectsIntersect(b, a)).toBe(true);

        });
        it('returns false if rects do not intersect', () => {
            const a = {x1: 3, y1: 3, x2: 10, y2: 10};
            const b = {x1: 0, y1: 0, x2: 2, y2: 2};
            expect(rectsIntersect(a, b)).toBe(false);
            expect(rectsIntersect(b, a)).toBe(false);
        });
    });
});
