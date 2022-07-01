import {RngStateBuiltin} from "../src/state";

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

    it("Cannot be jumped", () => {
        expect(() => state.jump())
            .toThrow("This generator cannot be jumped");
    });

    it("Cannot be long-jumped", () => {
        expect(() => state.longJump())
            .toThrow("This generator cannot be long-jumped");
    });
});
