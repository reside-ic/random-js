import { RngState } from './state';
/**
 * Generate a exponentially distributed random number from the
 * standard distribution (rate or scale of 1). Use {@link exponential}
 * to generate values with different rates. The approach uses
 * inversion which is unlikely to be the fastest approach, but it's
 * unlikely that this will slow much down.
 *
 * @param state Random number state
 */
export declare function randomExponential(state: RngState): number;
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
export declare function exponential(state: RngState, rate: number): number;
