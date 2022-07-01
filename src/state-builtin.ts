import {RngState} from "./state";

export class RngStateBuiltin extends RngState {
    constructor() {
        super();
    }
    public random() {
        return Math.random();
    }
}
