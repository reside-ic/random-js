import type {RngState} from "./generator";

export function binomial(state: RngState, n: number, p: number) {
    if (n === 0 || p === 0) {
        return 0;
    }
    if (p === 1) {
        return n;
    }
    const q = p <= 0.5 ? p : 1 - p;
    const draw = n * q >= 10 ?
        btrs(state, n, q) :
        inversion(state, n, q);
    return p <= 0.5 ? draw : n - draw;
}

function btrs(state: RngState, n: number, p: number) {
    // This is spq in the paper.
    const stddev = Math.sqrt(n * p * (1 - p));

    // Other coefficients for Transformed Rejection sampling.
    const b = 1.15 + 2.53 * stddev;
    const a = -0.0873 + 0.0248 * b + 0.01 * p;
    const c = n * p + 0.5;
    const vr = 0.92 - 4.2 / b;
    const r = p / (1 - p);

    const alpha = (2.83 + 5.1 / b) * stddev;
    const m = Math.floor((n + 1) * p);

    let draw;
    while (true) {
        const u = state.random() - 0.5;
        let v = state.random();
        const us = 0.5 - Math.abs(u);
        const k = Math.floor((2 * a / us + b) * u + c);

        // Region for which the box is tight, and we
        // can return our calculated value This should happen
        // 0.86 * vr times. In the limit as n * p is large,
        // the acceptance rate converges to ~79% (and in the lower
        // regime it is ~24%).
        if (us >= 0.07 && v <= vr) {
            draw = k;
            break;
        }
        // Reject non-sensical answers.
        if (k < 0 || k > n) {
            continue;
        }

        // This deviates from Hormann's BRTS algorithm, as there is a log missing.
        // For all (u, v) pairs outside of the bounding box, this calculates the
        // transformed-reject ratio.
        v = Math.log(v * alpha / (a / (us * us) + b));
        const upperbound =
            ((m + 0.5) * Math.log((m + 1) / (r * (n - m + 1))) +
             (n + 1) * Math.log((n - m + 1) / (n - k + 1)) +
             (k + 0.5) * Math.log(r * (n - k + 1) / (k + 1)) +
             stirlingApproxTail(m) + stirlingApproxTail(n - m) -
             stirlingApproxTail(k) - stirlingApproxTail(n - k));
        if (v <= upperbound) {
            draw = k;
            break;
        }
    }
    return draw;
}

const kTailValues = [
    0.08106146679532733,
    0.041340695955409457,
    0.02767792568499805,
    0.020790672103764951,
    0.016644691189821703,
    0.013876128823071987,
    0.011896709945892425,
    0.010411265261971892,
    0.0092554621827094508,
    0.0083305634333594725,
];

function stirlingApproxTail(k: number) {
    return k < kTailValues.length ? kTailValues[k] : stirlingApproxTailCalc(k);
}

function stirlingApproxTailCalc(k: number) {
    const kp1sq = (k + 1) * (k + 1);
    return (1 / 12 - (1 / 360 - 1 / 1260 / kp1sq) / kp1sq) / (k + 1);
}

function inversion(state: RngState, n: number, p: number) {
    let k = -1;
    do {
        const u = state.random();
        k = inversionCalc(u, n, p);
    } while (k < 0);
    return k;
}

function inversionCalc(u: number, n: number, p: number) {
    const q = 1 - p;
    const r = p / q;
    const g = r * (n + 1);
    let f = Math.pow(q, n);
    let k = 0;

    let fPrev = f;
    while (u >= f) {
        u -= f;
        k++;
        f *= (g / k - r);
        if (f === fPrev || k > n) {
            // This catches an issue seen running with floats where we end
            // up unable to decrease 'f' because we've run out of
            // precision. In this case we'll try again with a better u
            return -1;
        }
        fPrev = f;
    }

    return k;
}
