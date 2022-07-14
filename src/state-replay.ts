import {RngState} from "./state";

/**
 * A non-random random number state, where the stream is replayed from
 * some set of provided numbers.
 */
export class RngStateReplay extends RngState {
    private _i: number;
    private _values: number[];

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

    public clone(this: RngStateReplay) {
        const ret = new RngStateReplay(this._values);
        ret._i = this._i;
        return ret;
    }

    public length() {
        return this._values.length - i;
    }
}
