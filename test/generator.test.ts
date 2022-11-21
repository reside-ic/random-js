import {RngStateBuiltin} from "../src/state-builtin";

describe("Builtin generator", () => {
    const state = new RngStateBuiltin();
    it("Returns a real via random", () => {
        const u = state.random();
        expect(u).toBeGreaterThanOrEqual(0);
        expect(u).toBeLessThanOrEqual(1);
    });

    it("Cannot be seeded", () => {
        expect(() => state.setSeed(1))
            .toThrow("This generator cannot be seeded");
    });

    it("Cannot return state", () => {
        expect(() => state.getState())
            .toThrow("This generator cannot return its state");
    });

    it("Cannot set state", () => {
        expect(() => state.setState(null))
            .toThrow("This generator set its state");
    });
});
