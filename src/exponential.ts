import type {RngState} from "./state";

/**
 * Generate a exponentially distributed random number from the
 * standard distribution (rate or scale of 1). Use {@link exponential}
 * to generate values with different rates.
 *
 * @param state Random number state
 */
export function randomExponential(state: RngState) {
    return -Math.log(state.random());
}

/**
 * Generate a exponentially distributed random number from the general
 * distribution. Using {@link randomExponential} to generate values
 * with rate of 1 may be slightly faster.
 *
 * @param state Random number state
 *
 * @param rate The rate parameter (sometimes this distribution is
 * parameterised by scale, which is `1 / rate`)
 */
export function exponential(state: RngState, rate: number) {
    return randomExponential(state) / rate;
}
