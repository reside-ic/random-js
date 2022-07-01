import type {RngState} from "./generator";

export function randomUniform(state: RngState) {
    return state.random();
}

export function uniform(state: RngState, min: number, max: number) {
    return randomUniform(state) * (max - min) + min;
}
