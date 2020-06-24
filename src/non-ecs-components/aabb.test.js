import {AABB} from 'Components/aabb';

describe('AABB', () => {
    describe('containsPoint()', () => {
        const points = [
            [{x: 7, y: 7}, true],
            [{x: 3, y: 3}, true],
            [{x: 3, y: 13}, true],
            [{x: 13, y: 3}, true],
            [{x: 13, y: 13}, true],
            [{x: 7, y: 3}, true],
            [{x: 7, y: 13}, true],
            [{x: 3, y: 7}, true],
            [{x: 13, y: 7}, true],
            [{x: 2, y: 3}, false],
            [{x: 3, y: 2}, false],
            [{x: 14, y: 3}, false],
            [{x: 13, y: 2}, false],
            [{x: 14, y: 13}, false],
            [{x: 13, y: 14}, false],
            [{x: 2, y: 13}, false],
            [{x: 3, y: 14}, false],
        ];
        const rect = new AABB(3, 3, 11, 11);

        test.each(points)('returns bool if point lies within or on the box %p', (p, result) => {
            expect(rect.containsPoint(p)).toBe(result);
            expect(AABB.containsPoint(rect, p)).toBe(result);
        });

    });

    describe('intersects()', () => {
        it('returns true if rects intersect', () => {
            const a = new AABB(3, 3, 10, 10);
            const b = new AABB(1, 2, 3, 4);
            expect(a.intersects(b)).toBe(true);
            expect(b.intersects(a)).toBe(true);
            expect(AABB.intersects(a, b)).toBe(true);
            expect(AABB.intersects(b, a)).toBe(true);

        });
        it('returns false if rects do not intersect', () => {
            const a = new AABB(3, 3, 10, 10);
            const b = new AABB(0, 0, 2, 2);
            expect(a.intersects(b)).toBe(false);
            expect(b.intersects(a)).toBe(false);
            expect(AABB.intersects(a, b)).toBe(false);
            expect(AABB.intersects(b, a)).toBe(false);
        });
    });
});
