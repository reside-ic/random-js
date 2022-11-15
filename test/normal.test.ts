import {normal, randomNormal} from "../src/normal";
import {RngStateBuiltin} from "../src/state-builtin";

import {approxEqual, mean, repeat, sd, variance} from "./helpers";
import "./matchers";

describe("normal random numbers", () => {
    // TODO: need a seedable generator really, even if it's not great
    // - should go with the pgs one that I worked up.
    const state = new RngStateBuiltin();
    it("generates std distribution with expected mean and variance", () => {
        const n = 100000;
        const res = repeat<number>(() => randomNormal(state), n);
        expect(mean(res)).toApproxEqual(0, 1e-2);
        expect(sd(res)).toApproxEqual(1, 1e-2);
    });

    it("generates with expected mean and variance", () => {
        const n = 200000;
        const res = repeat<number>(() => normal(state, 2, 5), n);
        expect(mean(res)).toApproxEqual(2, 1e-2);
        expect(sd(res)).toApproxEqual(5, 1e-2);
    });
});
