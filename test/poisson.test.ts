import {RngStateBuiltin} from "../src/state-builtin";
import {poisson} from "../src/poisson";

import {approxEqual, mean, mockRandomState, repeat, sd, variance} from "./helpers";
import "./matchers";

describe("poisson random numbers", () => {
    const state = new RngStateBuiltin();
    it("generates with expected mean and variance, knuth", () => {
        const n = 100000;
        const lambda = 5;
        const res = repeat<number>(() => poisson(state, lambda), n);
        expect(mean(res)).toApproxEqual(lambda, 1e-2);
        expect(variance(res)).toApproxEqual(lambda, 1e-2);
    });

    it("generates with expected mean and variance, hormann", () => {
        const n = 100000;
        const lambda = 20;
        const res = repeat<number>(() => poisson(state, lambda), n);
        expect(mean(res)).toApproxEqual(lambda, 1e-2);
        expect(variance(res)).toApproxEqual(lambda, 1e-2);
    });
});
