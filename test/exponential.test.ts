import { describe, it, expect } from "vitest";
import { exponential, randomExponential } from "../src/exponential";
import { RngStateBuiltin } from "../src/state-builtin";

import { approxEqual, mean, repeat, sd, variance } from "./helpers";
import "./matchers";

describe("exponential random numbers", () => {
    const state = new RngStateBuiltin();
    it("generates std distribution with expected mean and variance", () => {
        const n = 1000000;
        const res = repeat<number>(() => randomExponential(state), n);
        expect(mean(res)).toApproxEqual(1, 1e-2);
        expect(variance(res)).toApproxEqual(1, 1e-2);
    });

    it("generates general distribution with expected mean and variance", () => {
        const n = 1000000;
        const rate = 0.04;
        const res = repeat<number>(() => exponential(state, rate), n);
        expect(mean(res)).toApproxEqual(1 / rate, 1e-2);
        expect(variance(res)).toApproxEqual(1 / (rate * rate), 1e-2);
    });
});
