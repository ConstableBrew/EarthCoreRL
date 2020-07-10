import {RNG} from 'src/lib/rng';

export const bresenhamLine = ({x: x1, y: y1}, {x: x2, y: y2}) => {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0; // No float values!
    const points = [];

    // Find delta x,y
    let dx = x2 - x1;
    let dy = y2 - y1;

    // Sign of delta values +1 or 0 or -1
    const sx = (dx > 0) - (dx < 0);
    const sy = (dy > 0) - (dy < 0);

    // Convert dx,dy to abs values use the multiple with sign
    dx = Math.abs(dx);
    dy = Math.abs(dy);

    if(dx || dy) {
        let d = 0
        let x = x1
        let y = y1
        let v;
        if (dy < dx) {
            // Iterate by x += sign of deltaX
            for(v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) {
                // v is Tan() = y/x scaled by * 32768 (sub grid step) 
                y += (d += v) >> 15;
                points.push({x, y}); //d accumulate += grid step, so Y take +1px for each 32768 steps.
            }
        }
        else {
            // Iterate by y += sign of deltaY
            for(v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) {
                //v is Ctn() = x/y scaled by * 32768 (sub grid step)
                x += (d += v) >> 15;
                points.push({x, y}); // d &= 32767 is accumulator partial emptyer
            }
        }
    }
    return points;
};

export const roughLine = (a, b) => {
    const linePoints = bresenhamLine(a, b);
    const points = [a, b];
    linePoints.reduce(
        (p, q) => {
            const {x: px, y: py} = p;
            const {x: qx, y: qy} = q;
            for (let x = Math.min(px, qx); x <= Math.max(px, qx); ++x) {
                points.push({x, y: py});
                points.push({x, y: py + RNG.die(3) - 2});
            }
            for (let y = Math.min(py, qy); y <= Math.max(py, qy); ++y) {
                points.push({x: px, y});
                points.push({x: px + RNG.die(3) - 2, y});
            }
            return q;
        },
        a // start from one end of the line
    );
    return points;
}
