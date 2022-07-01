import type {RngState} from "./state";

const pi = Math.PI;
const twoPi = 2 * pi;
export function randomNormal(state: RngState) {
    let u1 = 0;
    let u2 = 0;
    do {
        u1 = state.random();
        u2 = state.random();
    } while (u1 < Number.EPSILON);
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(twoPi * u2);
}

export function normal(state: RngState, mean: number, sd: number) {
    return mean + randomNormal(state) * sd;
}
