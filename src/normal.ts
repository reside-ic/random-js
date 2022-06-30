import type {RngState} from "./generator";
import {randomReal} from "./generator";

const pi = Math.PI;
const twoPi = 2 * pi;
export function randomNormal(state: RngState) {
    let u1 = 0;
    let u2 = 0;
    do {
        u1 = randomReal(state);
        u2 = randomReal(state);
    } while (u1 < Number.EPSILON);
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(twoPi * u2);
}

export function normal(state: RngState, mean: number, sd: number) {
    return mean + randomNormal(state) * sd;
}