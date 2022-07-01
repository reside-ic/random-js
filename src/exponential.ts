import type {RngState} from "./state";

export function randomExponential(state: RngState) {
    return -Math.log(state.random());
}

export function exponential(state: RngState, rate: number) {
    return randomExponential(state) / rate;
}
