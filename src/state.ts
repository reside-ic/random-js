export abstract class RngState {
    public abstract random(): number;
    public setSeed(seed: any) {
        throw Error("This generator cannot be seeded (really!)");
    }
    public jump() {
        throw Error("This generator cannot be jumped");
    }
    public longJump() {
        throw Error("This generator cannot be long-jumped");
    }
}

export class RngStateBuiltin extends RngState {
    constructor() {
        super();
    }
    public random() {
        return Math.random();
    }
}
