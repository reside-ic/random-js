import type { RngState } from "./state";

const pi = Math.PI;
const twoPi = 2 * pi;

/** Generate a normally-distributed random number from the standard
 * normal distribution (mean 0, sd 1), use {@link normal} to generate
 * values with different mean and standard deviation.
 *
 * The algorithm used is the
 * [Box-Muller](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform)
 * transform
 *
 * @param state Random number state
 */
export function randomNormal(state: RngState) {
    let u1 = 0;
    let u2 = 0;
    do {
        u1 = state.random();
        u2 = state.random();
    } while (u1 < Number.EPSILON);
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(twoPi * u2);
}

/** Generate a normally-distributed random number. If you just want
 * the standard normal distribution (mean 0, sd 1), {@link
 * randomNormal} is slightly faster
 *
 * @param state Random number state
 *
 * @param mean Mean
 *
 * @param sd Standard deviation
 */
export function normal(state: RngState, mean: number, sd: number) {
    return mean + randomNormal(state) * sd;
}
