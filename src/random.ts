import {RngState} from "./state";

import {binomial} from "./binomial";
import {exponential, randomExponential} from "./exponential";
import {normal, randomNormal} from "./normal";
import {randomUniform, uniform} from "./uniform";

export class Random {
    public readonly state: RngState;

    constructor(state: RngState) {
        this.state = state;
    }

    public clone() {
        return new Random(this.state.clone());
    }

    public randomExponential() {
        return randomExponential(this.state);
    }

    public randomNormal() {
        return randomNormal(this.state);
    }

    public randomUniform() {
        return randomUniform(this.state);
    }

    public binomial(n: number, p: number) {
        return binomial(this.state, n, p);
    }

    public exponential(rate: number) {
        return exponential(this.state, rate);
    }

    public normal(mean: number, sd: number) {
        return normal(this.state, mean, sd);
    }

    public uniform(min: number, max: number) {
        return uniform(this.state, min, max);
    }

}
