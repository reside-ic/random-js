import { RngState } from "./state";

// The original was here
// http://baagoe.com/en/RandomMusings/javascript/ but seems to have
// dropped off the internet, some context exists here
// https://web.archive.org/web/20100712063034/http://baagoe.com/en/RandomMusings/javascript/
//
// I can find two vanilla js versions:
//
// https://github.com/macmcmeans/aleaPRNG/blob/master/aleaPRNG-1.1.js
// https://github.com/coverslide/node-alea/blob/master/alea.js
//
// on which this implementation is based, but in TypeScript
//
// As usual, most of the complication is in the initialisation, which
// uses another prng implemented as a hash function.

const TWO_POS_32 = 0x100000000; // 2^32
const TWO_NEG_32 = 2.3283064365386963e-10; // 2^-32

export function masher() {
    let n = 0xefc8249d;
    return (data: string): number => {
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * TWO_POS_32;
        }
        return (n >>> 0) * TWO_NEG_32;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function aleaInitialState(seed: any[]): number[] {
    const mash = masher();
    let s0 = mash(" ");
    let s1 = mash(" ");
    let s2 = mash(" ");
    const c = 1;

    seed.forEach((el) => {
        const s = el.toString();
        s0 -= mash(s);
        if (s0 < 0) {
            s0 += 1;
        }

        s1 -= mash(s);
        if (s1 < 0) {
            s1 += 1;
        }

        s2 -= mash(s);
        if (s2 < 0) {
            s2 += 1;
        }
    });

    return [s0, s1, s2, c];
}

/**
 * Random number generator based on the "Alea" algorithm of Johannes
 * Baagøe; designed to produce acceptable quality random numbers at a
 * reasonable speed given limitations of JavaScript's numbers.
 */
export class RngStateAlea extends RngState {
    // The compiler can't work out that these are definitely assigned,
    // but they are, via setState() (eventually).
    private s0!: number;
    private s1!: number;
    private s2!: number;
    private c!: number;

    /**
     * The generator can be started from a "seed" (some small piece of
     * data from which we'll derive a state) or from a state.
     *
     * @param seed An initial seed; any truthy value will do. If not
     * given (and if `state` is not given, then we seed using
     * `Math.random()`
     *
     * @param state A state extracted from a previously initialised
     * copy of an `RngStateAlea` generator; will be a length 4
     * array. If given, then seed must be `null`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(seed: any = null, state?: number[]) {
        super();
        const hasSeed = seed !== null;
        const hasInitialState = state !== undefined;
        if (hasSeed && hasInitialState) {
            throw Error("Can't provide both initial seed and state");
        }
        if (hasInitialState) {
            this.setState(state);
        } else {
            this.setSeed(seed);
        }
    }

    public random() {
        const t = 2091639 * this.s0 + this.c * TWO_NEG_32;
        this.s0 = this.s1;
        this.s1 = this.s2;
        return this.s2 = t - (this.c = t | 0);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public setSeed(seed: any) {
        const state = aleaInitialState([seed || Math.random()]);
        this.setState(state);
    }

    public getState(): number[] {
        return [this.s0, this.s1, this.s2, this.c];
    }

    public setState(state: number[]) {
        if (state.length !== 4) {
            throw Error(`Expected state to have length 4 (but was ${state.length})`);
        }

        this.s0 = state[0];
        this.s1 = state[1];
        this.s2 = state[2];
        this.c = state[3];
    }
}
