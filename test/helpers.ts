import {RngState} from "../src/state";

export function repeat<T>(f: () => T, n: number) {
    const ret = [];
    for (let i = 0; i < n; ++i) {
        ret.push(f());
    }
    return ret;
}

function add(a: number, b: number) {
    return a + b;
}

function sum(x: number[]) {
    return x.reduce(add, 0);
}

export function mean(x: number[]) {
    return sum(x) / x.length;
}

export function variance(x: number[]) {
    const mu = mean(x);
    return mean(x.map((el: number) => el * el)) - mu * mu;
}

export function sd(x: number[]) {
    return Math.sqrt(variance(x));
}

export function approxEqual(x: number, y: number, tolerance?: number) {
    if (tolerance === undefined) {
        tolerance = Math.sqrt(Number.EPSILON);
    }
    let xy = Math.abs(x - y);
    const xn = Math.abs(x);
    if (xn > tolerance) {
        xy /= xn;
    }
    return xy < tolerance;
}

export class mockRandomState extends RngState {
    private pos: number;
    private stream: number[];
    constructor(stream: number[]) {
        super();
        this.stream = stream;
        this.pos = 0;
    }
    public random() {
        return this.stream[this.pos++];
    }
}
