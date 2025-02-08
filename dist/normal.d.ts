import { RngState } from './state';
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
export declare function randomNormal(state: RngState): number;
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
export declare function normal(state: RngState, mean: number, sd: number): number;
