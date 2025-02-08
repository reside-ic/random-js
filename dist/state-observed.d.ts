import { RngState } from './state';
import { RngStateReplay } from './state-replay';
export declare class RngStateObserved extends RngState {
    private readonly _state;
    private readonly _values;
    /**
     * Optionally, a random number state - if not given we default
     * construct the the builtin state {@link RngStateBuiltin}.
     */
    constructor(state?: RngState);
    random(): number;
    /**
     * Create a new {@link RngStateReplay} random number state that
     * will replay the values from this generator.
     */
    replay(): RngStateReplay;
    /**
     * The number of random number draws available to replay.
     */
    length(): number;
    /**
     * The array of values drawn by this generator
     */
    values(): readonly number[];
}
