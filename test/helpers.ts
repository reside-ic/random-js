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
