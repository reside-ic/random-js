import { RngState } from "./state";

// Two reference implementations:
//
// https://github.com/macmcmeans/aleaPRNG/blob/master/aleaPRNG-1.1.js
// https://github.com/coverslide/node-alea/blob/master/alea.js
//
// The original seems to have dropped off the internet, and I can't
// see a simple impementation with types. As usual, most of the
// complication is in the initialisation, which uses another prng or
// streaming hash function.

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

function aleaInitialState(seed: any[]): number[] {
    if (seed.length === 0) {
        seed = [Math.random()];
    }
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

export class RngStateAlea extends RngState {
    // The compiler can't work out that these are definitely assigned,
    // but they are, via setState() (eventually).
    private s0!: number;
    private s1!: number;
    private s2!: number;
    private c!: number;

    constructor(seed: any[] = [], state?: number[]) {
        super();
        const hasSeed = seed.length > 0;
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

    public setSeed(seed: any[]) {
        const state = aleaInitialState(seed);
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
