import { RngState } from './state';
/**
 * Generate Poisson distributed random number. This implementation
 * switches between two algorithms (Knuth's and Hormann's) as `lambda`
 * gets large (10).
 *
 * See [Knuth
 * 1994](https://books.google.co.uk/books?vid=ISBN9780201896848&redir_esc=y)
 * (or on
 * [wikipedia](https://en.wikipedia.org/wiki/Poisson_distribution#Generating_Poisson-distributed_random_variables))
 * and [Hormann and Derflinger
 * 1994](https://citeseer.ist.psu.edu/viewdoc/summary?doi=10.1.1.48.3054)
 * for details.
 *
 * @param state Random number state
 *
 * @param lambda The mean (and variance!) of the distribution
 */
export declare function poisson(state: RngState, lambda: number): number;
