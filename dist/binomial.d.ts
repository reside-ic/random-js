import { RngState } from './state';
/**
 * Generate a binomially-distributed random number; the number of
 * successes in `n` trials each with probability `p`.
 *
 * The approach follows the BRTS algorithm of [Hormann
 * 1992](https://www.tandfonline.com/doi/abs/10.1080/00949659308811496)
 * for large `min(n * p, n * (1 - p)) > 10` and uses an inversion
 * algorithm for small `n * p`.
 *
 * @param state Random number state
 *
 * @param n Number of trials
 *
 * @param p Per-trial probability of success
 */
export declare function binomial(state: RngState, n: number, p: number): number;
