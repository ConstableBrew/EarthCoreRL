import {sha512} from 'js-sha512';

let singleton;

export class RNG {
    static init(seed) {
        singleton = new RNG(seed);
    }

    static random() {
        return singleton.random();
    }

    static randomNormal(mean, stdDev) {
        return singleton.randomNormal(mean, stdDev);
    }

    static die(sides) {
        return singleton.die(sides);
    }

    constructor(seed = 'deadbeef') {
        this.outBuffer = new ArrayBuffer(8);
        this.outView = new DataView(this.outBuffer);
        this.seed = seed.toString();
        this.generate();
    }

    generate() {
        this.buffer = sha512.arrayBuffer(this.seed);
        this.view = new DataView(this.buffer);
        this.seed = (this.view.getBigUint64(0)).toString(16)
            + (this.view.getBigUint64(8)).toString(16)
            + (this.view.getBigUint64(16)).toString(16)
            + (this.view.getBigUint64(24) + 1n).toString(16);
        this.ptr = 0;
    }

    random() {
        if (this.ptr > 56) {
            // Not enough available bytes left in the buffer
            this.generate();
        }
        const chunk1 = this.view.getUint32(this.ptr, true);
        const chunk2 = this.view.getUint32(this.ptr + 4, true);

        this.outView.setUint32(0, 0x3ff00000 | 0x000fffff & chunk1);
        this.outView.setUint32(4, chunk2);
        this.ptr += 8;
        return this.outView.getFloat64(0) - 1;
    }

    randomNormal(mean = 0, stdDev = 1) {
        let val;
        if (this.nextNormalVal) {
            val = this.nextNormalVal;
            this.nextNormalVal = null;
        }
        else {
            let w1, w2, r;
            do {
                w1 = 2 * this.random() - 1;
                w2 = 2 * this.random() - 1;
                r = w1 * w1 + w2 * w2;
            } while (r >= 1);
            r = Math.sqrt(-2 * Math.log(r) / r);
            this.nextNormalVal = w2 * r;
            val = w1 * r;
        }
    
        return val * stdDev + mean;
    }

    die(sides = 6) {
        return ~~(this.random() * sides + 1);
    }
}
