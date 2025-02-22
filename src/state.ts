/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Basic random number state class, to be passed to distribution
 * functions (e.g., {@link normal}. The base class does not implement
 * any draws though, so use a specialisation such as {@link
 * RngStateBuiltin} or create a less terrible one.
 *
 * We provide several concrete state clases that can be used:
 *
 * * {@link RngStateBuiltin}: Uses `Math.random()` and can't be
 *   seeded, saved, restored and has dubious statistical and
 *   predictibility properties
 *
 * * {@link RngStateAlea}: Uses the "Alea" algorithm, and can be
 *   seeded, saved, restored and has better statistical properties
 *   (but is still predictable)
 *
 * * {@link RngStateObserved}: Wraps any `RngState`-implementing class
 *   and allows observation of the draws, useful for testing.
 *
 * * {@link RngStateReplay}: Replays the state of any observed state
 */
export abstract class RngState {
    /** Generate a single random number on the interval [0, 1],
     * updating whatever internal state the generator uses.
     */
    public abstract random(): number;
    /** Set the seed of the generator; most generators should support
     * this but {@link RngStateBuiltin} does not, and a
     * cryptographically secure generator also may not.
     */
    public setSeed(seed: any) {
        throw Error("This generator cannot be seeded (really!)");
    }
    /** Get the entire internal state of a generator */
    public getState(): any {
        throw Error("This generator cannot return its state");
    }
    /** Replace the entire internal state of a generator */
    public setState(state: any) {
        throw Error("This generator set its state");
    }
}
