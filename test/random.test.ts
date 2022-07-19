import { Random } from "../src/random";
import { RngStateObserved } from "../src/state-observed";

import { binomial } from "../src/binomial";
import { exponential, randomExponential } from "../src/exponential";
import { normal, randomNormal } from "../src/normal";
import { poisson } from "../src/poisson";
import { randomUniform, uniform } from "../src/uniform";

import { repeat } from "./helpers";

describe("draws from the object are the same as free functions", () => {
    const state = new RngStateObserved();
    const random = new Random(state);
    const replay = state.replay();

    it("produces the same binomial draws", () => {
        expect(repeat(() => random.binomial(4, 0.3), 10)).toEqual(
            repeat(() => binomial(replay, 4, 0.3), 10));
    });

    it("produces the same exponential draws", () => {
        expect(repeat(() => random.exponential(0.7), 10)).toEqual(
            repeat(() => exponential(replay, 0.7), 10));
        expect(repeat(() => random.randomExponential(), 10)).toEqual(
            repeat(() => randomExponential(replay), 10));
    });

    it("produces the same normal draws", () => {
        expect(repeat(() => random.normal(-5, 0.2), 10)).toEqual(
            repeat(() => normal(replay, -5, 0.2), 10));
        expect(repeat(() => random.randomNormal(), 10)).toEqual(
            repeat(() => randomNormal(replay), 10));
    });

    it("produces the same poisson draws", () => {
        expect(repeat(() => random.poisson(2.8), 10)).toEqual(
            repeat(() => poisson(replay, 2.8), 10));
    });

    it("produces the same uniform draws", () => {
        expect(repeat(() => random.uniform(-2.1, 3.5), 10)).toEqual(
            repeat(() => uniform(replay, -2.1, 3.5), 10));
        expect(repeat(() => random.randomUniform(), 10)).toEqual(
            repeat(() => randomUniform(replay), 10));
    });
});
