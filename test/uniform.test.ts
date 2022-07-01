import {RngStateBuiltin} from "../src/generator";
import {randomUniform, uniform} from "../src/uniform";

import {mean, repeat, variance} from "./helpers";

describe("Generate uniform random numbers from expected distribution", () => {
    it("Generates acceptably", () => {
        const state = new RngStateBuiltin();
        const u = repeat<number>(() => randomUniform(state), 100000);
        expect(mean(u)).toBeCloseTo(0.5);
        expect(variance(u)).toBeCloseTo(1 / 12, 3);
    });

    it("Can scale", () => {
        const state = new RngStateBuiltin();
        const u = repeat<number>(() => uniform(state, 2, 4), 100000);
        expect(mean(u)).toBeCloseTo(3);
        expect(variance(u)).toBeCloseTo(1 / 3, 2);
        expect(Math.min(...u)).toBeGreaterThanOrEqual(2);
        expect(Math.max(...u)).toBeLessThanOrEqual(4);
    })
});
