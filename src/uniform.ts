import type {RngState} from "./state";

/**
 * Generate a uniformly distributed random number from the standard
 * distribion (min 0, max 1); this is just a wrapper around
 * `state.random()`
 *
 * @param state Random number state
 */
export function randomUniform(state: RngState) {
    return state.random();
}

/**
 * Generate uniformly distributed random numbers with given min and
 * max.
 *
 * @param state Random number state
 *
 * @param min Minimum value of the distribution
 *
 * @param max Max value of the distribution
 */
export function uniform(state: RngState, min: number, max: number) {
    return randomUniform(state) * (max - min) + min;
}
