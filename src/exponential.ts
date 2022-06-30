import type {RngState} from "./generator";
import {randomReal} from "./generator";

export function randomExponential(state: RngState) {
    return -Math.log(randomReal(state));
}

export function exponential(state: RngState, rate: number) {
    return randomExponential(state) / rate;
}
