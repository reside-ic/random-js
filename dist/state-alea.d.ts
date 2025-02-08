import { RngState } from './state';
export declare function masher(): (data: string) => number;
/**
 * Random number generator based on the "Alea" algorithm of Johannes
 * Baagøe; designed to produce acceptable quality random numbers at a
 * reasonable speed given limitations of JavaScript's numbers.
 */
export declare class RngStateAlea extends RngState {
    private s0;
    private s1;
    private s2;
    private c;
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
    constructor(seed?: any, state?: number[]);
    random(): number;
    setSeed(seed: any): void;
    getState(): number[];
    setState(state: number[]): void;
}
