import type {RngState} from "./generator";
import {randomReal} from "./generator";

export function uniform(state: RngState, min: number, max: number) {
    return randomReal(state) * (max - min) + min;
}
