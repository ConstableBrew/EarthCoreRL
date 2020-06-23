import {isPointInPolygon} from 'Utilities/isPointInPolygon';

describe('isPointInPolygon', () => {
    const polygon = [
        {x: 10, y: 10},
        {x: 15, y: 15},
        {x: 15, y: 10},
        {x: 20, y: 10},
        {x: 20, y: 20},
        {x: 10, y: 20},
    ];

    describe('points outside polygon, outside convex hull', () => {
        const points = [
            {x: 0, y: 0},
            {x: 15, y: 0},
            {x: 25, y: 0},
            {x: 25, y: 15},
            {x: 25, y: 25},
            {x: 15, y: 25},
            {x: 0, y: 25},
            {x: 0, y: 15},
        ];
        test.each(points)('%p should return false', (p) => {
            expect(isPointInPolygon(polygon, p)).toBe(false);
        });
    });

    describe('points outside polygon, inside convex hull', () => {
        const points = [
            {x: 13, y: 10},
            {x: 13, y: 11},
        ];
        test.each(points)('%p should return false', (p) => {
            expect(isPointInPolygon(polygon, p)).toBe(false);
        });
    });

    describe('points coinciding with polygon verticies', () => {
        test.each(polygon)('%p should return true', (p) => {
            expect(isPointInPolygon(polygon, p)).toBe(true);
        });
    });

    describe('points on polygon edges', () => {
        const points = [
            {x: 13, y: 13},
            {x: 13, y: 15},
            {x: 17, y: 10},
            {x: 20, y: 15},
            {x: 15, y: 20},
            {x: 10, y: 15},
        ];
        test.each(points)('%p should return true', (p) => {
            expect(isPointInPolygon(polygon, p)).toBe(true);
        });
    });

    describe('points inside polygon', () => {
        const points = [
            {x: 11, y: 12},
            {x: 12, y: 18},
            {x: 18, y: 12},
            {x: 18, y: 18},
        ];
        test.each(points)('%p should return true', (p) => {
            expect(isPointInPolygon(polygon, p)).toBe(true);
        });
    });
});
