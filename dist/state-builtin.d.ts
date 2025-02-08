import { RngState } from './state';
/**
 * Random number generator based on the `Math.random()` builtin, which
 * does not give good quality random numbers, but at least is
 * available everywhere. This generator cannot be seeded.
 */
export declare class RngStateBuiltin extends RngState {
    constructor();
    random(): number;
}
