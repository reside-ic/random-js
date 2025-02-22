import type { RngState } from "./state";

import { lngamma } from "ieee745gamma";

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
export function poisson(state: RngState, lambda: number) {
    return lambda < 10 ? poissonKnuth(state, lambda) : poissonHormann(state, lambda);
}

const MAX_I32 = 2 ** 31 - 1;

function poissonKnuth(state: RngState, lambda: number) {
    let x = 0;
    // Knuth's algorithm for generating Poisson random variates.
    // Given a Poisson process, the time between events is exponentially
    // distributed. If we have a Poisson process with rate lambda, then,
    // the time between events is distributed Exp(lambda). If X ~
    // Uniform(0, 1), then Y ~ Exp(lambda), where Y = -log(X) / lambda.
    // Thus to simulate a Poisson draw, we can draw X_i ~ Exp(lambda),
    // and N ~ Poisson(lambda), where N is the least number such that
    // \sum_i^N X_i > 1.
    const expNegRate = Math.exp(-lambda);

    let prod = 1;

    // Keep trying until we surpass e^(-rate). This will take
    // expected time proportional to rate.
    while (true) {
        const u = state.random();
        prod = prod * u;
        if (prod <= expNegRate && x <= MAX_I32) {
            break;
        }
        x++;
    }
    return x;
}

function poissonHormann(state: RngState, lambda: number) {
    // Transformed rejection due to Hormann.
    //
    // Given a CDF F(x), and G(x), a dominating distribution chosen such
    // that it is close to the inverse CDF F^-1(x), compute the following
    // steps:
    //
    // 1) Generate U and V, two independent random variates. Set U = U - 0.5
    // (this step isn't strictly necessary, but is done to make some
    // calculations symmetric and convenient. Henceforth, G is defined on
    // [-0.5, 0.5]).
    //
    // 2) If V <= alpha * F'(G(U)) * G'(U), return floor(G(U)), else return
    // to step 1. alpha is the acceptance probability of the rejection
    // algorithm.
    //
    // For more details on transformed rejection, see:
    // https://citeseer.ist.psu.edu/viewdoc/citations;jsessionid=1BEB35946CC807879F55D42512E5490C?doi=10.1.1.48.3054
    //
    // The dominating distribution in this case:
    //
    // G(u) = (2 * a / (2 - |u|) + b) * u + c

    let x = 0;
    const logRate = Math.log(lambda);

    // Constants used to define the dominating distribution. Names taken
    // from Hormann's paper. Constants were chosen to define the tightest
    // G(u) for the inverse Poisson CDF.
    const b = 0.931 + 2.53 * Math.sqrt(lambda);
    const a = -0.059 + 0.02483 * b;

    // This is the inverse acceptance rate. At a minimum (when rate = 10),
    // this corresponds to ~75% acceptance. As the rate becomes larger, this
    // approaches ~89%.
    const invAlpha = 1.1239 + 1.1328 / (b - 3.4);

    while (true) {
        let u = state.random();
        u -= 0.5;
        const v = state.random();

        const uShifted = 0.5 - Math.abs(u);
        const k = Math.floor(((2 * a) / uShifted + b) * u + lambda + 0.43);

        // When alpha * f(G(U)) * G'(U) is close to 1, it is possible to
        // find a rectangle (-u_r, u_r) x (0, v_r) under the curve, such
        // that if v <= v_r and |u| <= u_r, then we can accept.
        // Here v_r = 0.9227 - 3.6224 / (b - 2) and u_r = 0.43.
        if (uShifted >= 0.07 && v <= 0.9277 - 3.6224 / (b - 2)) {
            x = k;
            break;
        }

        if (k < 0 || (uShifted < 0.013 && v > uShifted)) {
            continue;
        }

        // The expression below is equivalent to the computation of step 2)
        // in transformed rejection (v <= alpha * F'(G(u)) * G'(u)).
        const s = Math.log((v * invAlpha) / (a / (uShifted * uShifted) + b));
        const t = -lambda + k * logRate - lngamma(k + 1);
        if (s <= t) {
            x = k;
            break;
        }
    }
    return x;
}
