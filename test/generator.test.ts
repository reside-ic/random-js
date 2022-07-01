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
});
