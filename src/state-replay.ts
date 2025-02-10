import { RngState } from "./state";

/**
 * A non-random random number state, where the stream is replayed from
 * some set of provided numbers. Typically created from {@link
 * RngStateObserved.replay}, in which case generating more draws from
 * the original source will increase the number available in the
 * replayable state.
 */
export class RngStateReplay extends RngState {
    private _i: number;
    private readonly _values: readonly number[];

    /** @param values The values that the state will return. */
    constructor(values: number[]) {
        super();
        this._i = 0;
        this._values = values;
    }

    public random() {
        const ret = this._values[this._i++];
        if (this._i > this._values.length) {
            throw Error("Exhausted stream");
        }
        return ret;
    }

    /**
     * Number of draws left in the object before we run out of state to
     * replay
     */
    public length() {
        return this._values.length - this._i;
    }
}
