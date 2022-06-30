import {RngState} from "./generator";

function rotl64(x: bigint, k: bigint) {
  return (x << k) | (x >> (64n - k));
}

const jumpConstants256 = new BigUint64Array([
    0x180ec6d33cfd0aban, 0xd5a61266f0c9392cn,
    0xa9582618e03fc9aan, 0x39abdc4529b1661cn ]);
const longJumpConstants256 = new BigUint64Array([
    0x76e15d3efefdcbbfn, 0xc5004e441c522fb3n,
    0x77710069854ee241n, 0x39109bb02acbe635n ]);

export class Xoshiro256starstar extends RngState {
    public state: BigUint64Array;
    constructor(seed: number) {
        super();
        this.state = new BigUint64Array(4);
    }
    public next() {
        const s = this.state;
        const result = rotl64(s[1] * 5n, 7n) * 9n;
        const t = s[1] << 17n;
        s[2] ^= s[0];
        s[3] ^= s[1];
        s[1] ^= s[2];
        s[0] ^= s[3];
        s[2] ^= t;
        s[3] = rotl64(s[3], 45n);
        return result;
    }
    public jumpConstants() {
        return jumpConstants256;
    }
    public longJumpConstants() {
        return jumpConstants256;
    }
}
