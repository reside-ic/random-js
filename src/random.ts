import { RngState } from "./state";

import { binomial } from "./binomial";
import { exponential, randomExponential } from "./exponential";
import { normal, randomNormal } from "./normal";
import { poisson } from "./poisson";
import { randomUniform, uniform } from "./uniform";

/**
 * Generate random numbers. This provides a single object that can be
 * passed around to generate numbers from all distributions supported
 * by the package, as well as the state required to generate the
 * numbers from.
 */
export class Random {
    /** The internal random number state, which is updated by calls to
     * any of the distribution functions.
     */
    public readonly state: RngState;

    /** An initialised random number state
     */
    constructor(state: RngState) {
        this.state = state;
    }

    /** Generate a standard exponential random number Exponential(1)
     * ({@link randomExponential})
     */
    public randomExponential() {
        return randomExponential(this.state);
    }

    /** Generate a standard normal random number N(0, 1) ({@link
     * randomNormal})
     */
    public randomNormal() {
        return randomNormal(this.state);
    }

    /** Generate a standard uniform random number U(0, 1) ({@link
     * randomUniform})
     */
    public randomUniform() {
        return randomUniform(this.state);
    }

    /** Generate a binomially distributed random number ({@link binomial})
     * @param n number of trials
     * @param p per-traial probability of success
     */
    public binomial(n: number, p: number) {
        return binomial(this.state, n, p);
    }

    /** Generate an exponentially distributed random number
     * ({@link exponential})
     * @param rate The rate of the process
     */
    public exponential(rate: number) {
        return exponential(this.state, rate);
    }

    /** Generate an normally distributed random number ({@link normal})
     * @param mean The mean of the distribution
     * @param sd The standard deviation of the distribution
     */
    public normal(mean: number, sd: number) {
        return normal(this.state, mean, sd);
    }

    /** Generate a Poisson distributed random number ({@link poisson})
     * @param lambda The mean of the distribution
     */
    public poisson(lambda: number) {
        return poisson(this.state, lambda);
    }

    /** Generate a uniformly distributed random number ({@link uniform})
     * @param min Minimum value of the distribution
     * @param max Max value of the distribution
     */
    public uniform(min: number, max: number) {
        return uniform(this.state, min, max);
    }
}
