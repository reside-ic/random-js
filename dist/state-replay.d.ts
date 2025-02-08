import { RngState } from './state';
/**
 * A non-random random number state, where the stream is replayed from
 * some set of provided numbers. Typically created from {@link
 * RngStateObserved.replay}, in which case generating more draws from
 * the original source will increase the number available in the
 * replayable state.
 */
export declare class RngStateReplay extends RngState {
    private _i;
    private readonly _values;
    /** @param values The values that the state will return. */
    constructor(values: number[]);
    random(): number;
    /**
     * Number of draws left in the object before we run out of state to
     * replay
     */
    length(): number;
}
