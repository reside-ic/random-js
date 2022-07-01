import {RngStateBuiltin} from "../src/state";
import {randomUniform, uniform} from "../src/uniform";

import {mean, repeat, variance} from "./helpers";
import "./matchers";

describe("Generate uniform random numbers from expected distribution", () => {
    it("Generates acceptably", () => {
        const state = new RngStateBuiltin();
        const u = repeat<number>(() => randomUniform(state), 100000);
        expect(mean(u)).toApproxEqual(0.5, 1e-2);
        expect(variance(u)).toApproxEqual(1 / 12, 1e-2);
    });

    it("Can scale", () => {
        const state = new RngStateBuiltin();
        const u = repeat<number>(() => uniform(state, 2, 4), 100000);
        expect(mean(u)).toApproxEqual(3, 1e-2);
        expect(variance(u)).toApproxEqual(1 / 3, 1e-2);
        expect(Math.min(...u)).toBeGreaterThanOrEqual(2);
        expect(Math.max(...u)).toBeLessThanOrEqual(4);
    })
});
