export abstract class RngState {
    public abstract state: BigUint64Array;
    public abstract jumpConstants(): BigUint64Array;
    public abstract longJumpConstants(): BigUint64Array;
    public abstract next(): bigint;
    public jump() {
        rngJumpState(this, this.jumpConstants());
    }
    public longJump() {
        rngJumpState(this, this.longJumpConstants());
    }
}

export function randomReal(state: RngState) {
    return intToReal(state.next());
}

function rngJumpState(state: RngState, coef: BigUint64Array) {
    const n = coef.length;
    const work = new BigUint64Array(n);
    const bits = 64;
    for (let  i = 0; i < n; ++i) {
        for (let b = 0; b < bits; b++) {
            if (coef[i] & 1n << BigInt(b)) {
                for (let j = 0; j < n; ++j) {
                    work[j] ^= state.state[j];
                }
            }
            state.next();
        }
    }
    for (let i = 0; i < n; ++i) {
        state.state[i] = work[i];
    }
}

const TWOPOW32_INV_DOUBLE = 2.3283064365386963e-10;
const TWOPOW53_INV_DOUBLE = 1.1102230246251565e-16;
function intToReal(x: bigint) {
    return Number(x >> 11n) * TWOPOW53_INV_DOUBLE + (TWOPOW53_INV_DOUBLE / 2.0);
}
