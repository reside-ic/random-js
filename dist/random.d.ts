import { RngState } from './state';
/**
 * Generate random numbers. This provides a single object that can be
 * passed around to generate numbers from all distributions supported
 * by the package, as well as the state required to generate the
 * numbers from.
 */
export declare class Random {
    /** The internal random number state, which is updated by calls to
     * any of the distribution functions.
     */
    readonly state: RngState;
    /** An initialised random number state
     */
    constructor(state: RngState);
    /** Generate a standard exponential random number Exponential(1)
     * ({@link randomExponential})
     */
    randomExponential(): number;
    /** Generate a standard normal random number N(0, 1) ({@link
     * randomNormal})
     */
    randomNormal(): number;
    /** Generate a standard uniform random number U(0, 1) ({@link
     * randomUniform})
     */
    randomUniform(): number;
    /** Generate a binomially distributed random number ({@link binomial})
     * @param n number of trials
     * @param p per-traial probability of success
     */
    binomial(n: number, p: number): number;
    /** Generate an exponentially distributed random number
     * ({@link exponential})
     * @param rate The rate of the process
     */
    exponential(rate: number): number;
    /** Generate an normally distributed random number ({@link normal})
     * @param mean The mean of the distribution
     * @param sd The standard deviation of the distribution
     */
    normal(mean: number, sd: number): number;
    /** Generate a Poisson distributed random number ({@link poisson})
     * @param lambda The mean of the distribution
     */
    poisson(lambda: number): number;
    /** Generate a uniformly distributed random number ({@link uniform})
     * @param min Minimum value of the distribution
     * @param max Max value of the distribution
     */
    uniform(min: number, max: number): number;
}
