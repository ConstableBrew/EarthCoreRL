
/*
 * returns true if point c lies on the line segment defined by points a and b.
 */
export function isPointOnSegment(a, b, c) {
    const crossproduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y);
    if (Math.abs(crossproduct) !== 0) return false;

    const dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y)
    if (dotproduct < 0) return false;

    const squaredlength = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
    if (dotproduct > squaredlength) return false;

    return true;
};

/*
 * Returns true if the given polygon contains the given point.
 * Count the number of edges crossed by a line cast from the given point.
 * If the number of edges crossed is even, then the point is outside.
 * If the number of edges crossed is odd, then the point is inside.
 * @param {[Point]} path - array of points describing the perimiter of the polygon
 * @param {Point} c - point to test
 */
export function isPointInPolygon(path, c) {
    let contains = false;
    for (let i = 0, j = path.length - 1; i < path.length; j = i++) {
        const a = path[i];
        const b = path[j];
        if (isPointOnSegment(a, b, c)) return true;
        if (
            ((a.y > c.y) !== (b.y > c.y))
            && (c.x < (b.x - a.x) * (c.y - a.y) / (b.y - a.y) + a.x)
        ) {
            contains = !contains;
        }
    }
    return contains;
};
