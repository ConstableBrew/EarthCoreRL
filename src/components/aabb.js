export class AABB {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.x2 = x + w - 1;
        this.y2 = y + h - 1;
    }

    static containsPoint(rect, point) {
        if (rect.x > point.x  || point.x > rect.x2) return false;
        if (rect.y > point.y  || point.y > rect.y2) return false;
        return true;
    }

    containsPoint(point) {
        return AABB.containsPoint(this, point);
    }

    static intersects(rect1, rect2) {
        return !(
            rect1.x > rect2.x2
            || rect2.x > rect1.x2
            || rect1.y > rect2.y2
            || rect2.y > rect1.y2
        )
    }

    intersects(rect) {
        return AABB.intersects(this, rect);
    }

}
