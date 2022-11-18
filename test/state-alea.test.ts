import { RngStateAlea, masher } from "../src/state-alea";
import "./matchers";

const aleaReference = require("alea");

describe("can generate random numbers", () => {
    it("generates known case", () => {
        // just generate two numbers and show they're different and
        // that they don't change; this should always just hold.
        const s = new RngStateAlea(42);
        const u1 = s.random();
        const u2 = s.random();
        expect(u1).toBe(0.6848634963389486);
        expect(u2).toBe(0.5463244677521288);
    });

    it("generates different values when initialised without args", () => {
        const s1 = new RngStateAlea();
        const s2 = new RngStateAlea();
        expect(s1.random()).not.toEqual(s2.random());
    });

    it("requires at most one of seed and state to initialise", () => {
        expect(() => new RngStateAlea(42, [1, 2, 3, 4]))
            .toThrow("Can't provide both initial seed and state");
    });

    it("requires that state is correct length", () => {
        expect(() => new RngStateAlea(null, [1, 2, 3]))
            .toThrow("Expected state to have length 4 (but was 3)");
    });

    it("can extract state from generator and seed a new one", () => {
        const s1 = new RngStateAlea(42);
        const x1 = s1.getState();
        const s2 = new RngStateAlea(null, x1);
        expect(s1.getState()).toEqual(s2.getState());
        expect(s1.random()).toBe(s2.random());
    });

    it("can prevent negative values in seed coefficient", () => {
        const s = new RngStateAlea(0.9398027063099774);
        const state = s.getState();
        expect(state[0]).toBeGreaterThan(0);
        expect(state[1]).toBeGreaterThan(0);
        expect(state[2]).toBeGreaterThan(0);
    });

    it("generates numbers with the correct distribution", () => {
        const s = new RngStateAlea(42);
        const n = 1000000;
        let x = 0;
        let x2 = 0;
        for (let i = 0; i < n; ++i) {
            const u = s.random();
            x += u;
            x2 += u * u;
        }
        const mean = x / n; // E[x]
        const variance = x2 / n - mean * mean; // E(x^2) - E(x)^2
        expect(mean).toApproxEqual(0.5, 1e-3);
        expect(variance).toApproxEqual(1 / 12, 1e-2);
    });

    it("agrees with reference implementation", () => {
        const ref = aleaReference([42]);
        const state = new RngStateAlea(42);
        expect(state.getState()).toEqual(ref.exportState());
        expect(state.random()).toEqual(ref.next());
        expect(state.random()).toEqual(ref.next());
        expect(state.random()).toEqual(ref.next());
        expect(state.getState()).toEqual(ref.exportState());
    });
});

describe("does the mash", () => {
    it("does the monster mash", () => {
        const mash = masher();
        expect(mash("monster")).toBe(0.6911363429389894);
        expect(mash("monster")).toBe(0.5563453969080001);
        expect(mash("monster")).toBe(0.3086991817690432);
    });
});
