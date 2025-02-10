import { describe, it, expect } from "vitest";
import { RngStateObserved } from "../src/state-observed";

import { randomNormal } from "../src/normal";

describe("Can observe random state", () => {
    it("Keeps track of the numbers as they're drawn", () => {
        const s = new RngStateObserved();
        expect(s.length()).toBe(0);
        expect(s.values()).toEqual([]);
        s.random();
        expect(s.length()).toBe(1);
        randomNormal(s);
        expect(s.length()).toBe(3);
        expect(s.values().length).toBe(3);
    });

    it("Can be replayed", () => {
        const s1 = new RngStateObserved();
        const s2 = s1.replay();
        expect(s2.length()).toBe(0);

        const r = [];
        const n = 5;
        for (let i = 0; i < 5; ++i) {
            r.push(randomNormal(s1));
        }

        expect(s1.length()).toBe(n * 2);
        expect(s2.length()).toBe(n * 2);
        expect(randomNormal(s2)).toBe(r[0]);
        expect(s2.length()).toBe(n * 2 - 2);
        for (let i = 1; i < r.length; ++i) {
            expect(randomNormal(s2)).toBe(r[i]);
        }
        expect(() => s2.random()).toThrow("Exhausted stream");
    });

    it("Can observe a specialised rng state", () => {
        const s1 = new RngStateObserved();
        const u1 = s1.random();
        const s2 = new RngStateObserved(s1);
        const s3 = new RngStateObserved(s1.replay());
        expect(s1.length()).toBe(1);
        expect(s2.length()).toBe(0);
        const u2 = s1.random();
        const u3 = s2.random();
        expect(s1.values()).toEqual([u1, u2, u3]);
        expect(s2.values()).toEqual([u3]);
        expect(s3.random()).toBe(u1);
        expect(s3.random()).toBe(u2);
        expect(s3.random()).toBe(u3);
    });
});
