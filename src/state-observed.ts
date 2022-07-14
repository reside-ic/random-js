import {RngState} from "./state";
import {RngStateBuiltin} from "./state-builtin";
import {RngStateReplay} from "./state-replay";

export class RngStateObserved extends RngState {
    private readonly _state: RngState;
    private readonly _values: number[]

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

    public clone(this: RngStateObserved) {
        const ret = new RngStateObserved(this._state.clone());
        ret._values.concat(this._values);
        return ret;
    }

    public replay() {
        return new RngStateReplay(this._values);
    }

    public length() {
        return this._values.length;
    }
}
