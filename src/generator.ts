export interface RngState {
    random(): number;
    // These won't always be supported, and indeed are not in the
    // builtin version.
    setSeed(seed: any): void;
    jump(): void;
    longJump(): void;
}

export class RngStateBuiltin implements RngState{
    constructor() {
    }
    public random() {
        return Math.random();
    }
    public setSeed() {
        throw Error("This generator cannot be seeded (really!)");
    }
    public jump() {
        throw Error("This generator cannot be jumped");
    }
    public longJump() {
        throw Error("This generator cannot be long-jumped");
    }
}
