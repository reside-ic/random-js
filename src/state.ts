/**
 * Basic random number state class, to be passed to distribution
 * functions (e.g., {@link normal}. The base class does not implement
 * any draws though, so use a specialisation such as {@link
 * RngStateBuiltin} or create a less terrible one.
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
}
