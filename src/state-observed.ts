import {RngState} from "./state";
import {RngStateBuiltin} from "./state-builtin";
import {RngStateReplay} from "./state-replay";

export class RngStateObserved extends RngState {
    private readonly _state: RngState;
    private readonly _values: number[];

    /**
     * Optionally, a random number state - if not given we default
     * construct the the builtin state {@link RngStateBuiltin}.
     */
    constructor(state?: RngState) {
        super();
        if (state === undefined) {
            state = new RngStateBuiltin();
        }
        this._state = state;
        this._values = [];
    }

    public random() {
        const ret = this._state.random();
        this._values.push(ret);
        return ret;
    }

    /**
     * Create a new {@link RngStateReplay} random number state that
     * will replay the values from this generator.
     */
    public replay() {
        return new RngStateReplay(this._values);
    }

    /**
     * The number of random number draws available to replay.
     */
    public length() {
        return this._values.length;
    }

    /**
     * The array of values drawn by this generator
     */
    public values(): readonly number[] {
        return this._values;
    }
}
