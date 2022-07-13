import {binomial} from "../src/binomial";
import {RngStateBuiltin} from "../src/state-builtin";

import {approxEqual, mean, repeat, variance} from "./helpers";
import "./matchers";

describe("binomial random numbers", () => {
    const state = new RngStateBuiltin();
    it("generates with expected mean and variance when n * p is large", () => {
        const m = 100000;
        const n = 100;
        const p = 0.1;
        const res = repeat<number>(() => binomial(state, n, p), m);
        // Because we don't have a seedable generator, these can't be
        // very tight tests (and the underlying generator is known not
        // to be good!)
        expect(mean(res)).toApproxEqual(n * p, 5e-3);
        expect(variance(res)).toApproxEqual(n * p * (1 - p), 5e-2);
    });

    it("generates exact answers on the short circuit path", () => {
        const m = 100000;
        const n = 100;
        const p = 0.1;

        expect(repeat<number>(() => binomial(state, 0, p), m))
            .toEqual(Array(m).fill(0));
        expect(repeat<number>(() => binomial(state, n, 0), m))
            .toEqual(Array(m).fill(0));
        expect(repeat<number>(() => binomial(state, n, 1), m))
            .toEqual(Array(m).fill(n));
    });

    it("generates with expected mean and variance when n * p is small", () => {
        const m = 500000;
        const n = 20;
        const p = 0.8;
        const res = repeat<number>(() => binomial(state, n, p), m);
        expect(mean(res)).toApproxEqual(n * p, 1e-3);
        expect(variance(res)).toApproxEqual(n * p * (1 - p), 1e-2);
    });
});
