import {RNG} from 'Utilities/rng';

describe('RNG', () => {
    describe('random()', () => {
        it('returns same sequence for given seed', () => {
            const a = new RNG('foo');
            const b = new RNG('foo');
            RNG.init('foo');

            for(let i = 0; i < 10; ++i) {
                const r1 = a.random();
                const r2 = b.random();
                const r3 = RNG.random();
                expect(r1).toBe(r2);
                expect(r2).toBe(r3);
            };
        });

        it('consistent default seed if none provided', () => {
            const a = new RNG();
            const b = new RNG();
            RNG.init();

            for(let i = 0; i < 10; ++i) {
                const r1 = a.random();
                const r2 = b.random();
                const r3 = RNG.random();
                expect(r1).toBe(r2);
                expect(r2).toBe(r3);
            };
        });

        it('returns different sequences for different seeds', () => {
            const a = new RNG('foo');
            const b = new RNG('bar');
            RNG.init('baz');

            for(let i = 0; i < 10; ++i) {
                const r1 = a.random();
                const r2 = b.random();
                const r3 = RNG.random();
                expect(r1).not.toBe(r2);
                expect(r1).not.toBe(r3);
                expect(r2).not.toBe(r3);
            };
        });
    });

    describe('die()', () => {
        it('defaults to a d6', () => {
            const a = new RNG('fizz');
            const results = {};
            for(let i = 0; i < 1000; ++i) {
                const val = a.die();
                results[val] = (results[val] || 0) + 1
            }
            expect(Object.keys(results)).toEqual(['1', '2', '3', '4', '5', '6']);
        });

        it('returns evenly distributed int from 1 to the given number', () => {
            const a = new RNG('foo');
            const b = new RNG('bar');
            RNG.init('baz');

            const results1 = {};
            const results2 = {};
            const results3 = {};

            for(let i = 0; i < 1000; ++i) {
                const val1 = a.die(10);
                const val2 = b.die(10);
                const val3 = RNG.die(10);
                results1[val1] = (results1[val1] || 0) + 1
                results2[val2] = (results2[val2] || 0) + 1
                results3[val3] = (results3[val3] || 0) + 1
            }
            expect(results1).toEqual({
                1: 102,
                2: 107,
                3: 107,
                4: 106,
                5: 99,
                6: 99,
                7: 104,
                8: 97,
                9: 75,
                10: 104,
            });

            expect(results2).toEqual({
                1: 101,
                2: 98,
                3: 96,
                4: 98,
                5: 107,
                6: 93,
                7: 100,
                8: 121,
                9: 90,
                10: 96,
            });

            expect(results3).toEqual({
                1: 90,
                2: 99,
                3: 98,
                4: 110,
                5: 117,
                6: 88,
                7: 95,
                8: 102,
                9: 101,
                10: 100,
            });
        });
    });

    describe('randomNormal()', () => {
        it('is supported statically', () => {
            RNG.init('bar');
            const results = [];
            for(let i = 0; i < 20; ++i) {
                results.push(RNG.randomNormal());
            }
            expect(results).toEqual([
                0.8089051021390467, -0.31486023462339807, -0.28723687035509193, -0.5281167166845739, -0.9471723750698876, 
                1.6067729353315277, -1.3425661854387596, -0.21674923052721123, -1.2463897042060457, -1.1805919659049622, 
                1.3252273850384886, 0.6743506362277444, 0.6747262742274726, 0.7692798788985432, 2.0338133051833474, 
                0.6443291352893376, 0.4302685842689696, 0.48424025738444076, -0.7500768006457594, 0.5021750186907858,
            ]);
        });

        it('returns normally distributed float', () => {
            const a = new RNG('foo');
            const results = [];
            for(let i = 0; i < 20; ++i) {
                results.push(a.randomNormal());
            }
            expect(results).toEqual([
                0.9846477884916706, 1.134063758906143, 1.5984089283939324, -0.18794058624149138, 1.1513718903061567,
                -0.6345534432224947, 0.8912608505307249, -1.7147190158797074, 1.2365488447467299, -1.7601444490890852,
                0.5564280447872445, -1.6040072298467145, -0.9503101824358449, -0.507363706018658, 0.29656634761531975,
                -0.7009276812032877, 0.9085124474967402, -1.356825871016282, -2.6245054384882507, -0.07708946576263119,
            ]);
        });


        it('handles mean and standard deviation params', () => {
            const a = new RNG('foo');
            const results = [];
            for(let i = 0; i < 20; ++i) {
                results.push(a.randomNormal(50, 15));
            }
            expect(results).toEqual([
                64.76971682737506, 67.01095638359214, 73.97613392590898, 47.18089120637763, 67.27057835459235,
                40.48169835166258, 63.36891275796087, 24.27921476180439, 68.54823267120095, 23.597833263663723,
                58.346420671808666, 25.939891552299283, 35.74534726346233, 42.38954440972013, 54.448495214229794,
                39.48608478195068, 63.6276867124511, 29.647611934755773, 10.632418422676238, 48.843658013560535,
            ]);
        });
    });
});
