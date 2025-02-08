var K0 = Object.defineProperty;
var L0 = (r, e, t) => e in r ? K0(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var x = (r, e, t) => L0(r, typeof e != "symbol" ? e + "" : e, t);
function X0(r, e, t) {
  if (e === 0 || t === 0)
    return 0;
  if (t === 1)
    return e;
  const o = t <= 0.5 ? t : 1 - t, i = e * o >= 10 ? $0(r, e, o) : Q0(r, e, o);
  return t <= 0.5 ? i : e - i;
}
function $0(r, e, t) {
  const o = Math.sqrt(e * t * (1 - t)), i = 1.15 + 2.53 * o, h = -0.0873 + 0.0248 * i + 0.01 * t, _ = e * t + 0.5, d = 0.92 - 4.2 / i, E = t / (1 - t), a = (2.83 + 5.1 / i) * o, s = Math.floor((e + 1) * t);
  let u;
  for (; ; ) {
    const v = r.random() - 0.5;
    let f = r.random();
    const w = 0.5 - Math.abs(v), c = Math.floor((2 * h / w + i) * v + _);
    if (w >= 0.07 && f <= d) {
      u = c;
      break;
    }
    if (c < 0 || c > e)
      continue;
    f = Math.log(f * a / (h / (w * w) + i));
    const I = (s + 0.5) * Math.log((s + 1) / (E * (e - s + 1))) + (e + 1) * Math.log((e - s + 1) / (e - c + 1)) + (c + 0.5) * Math.log(E * (e - c + 1) / (c + 1)) + O(s) + O(e - s) - O(c) - O(e - c);
    if (f <= I) {
      u = c;
      break;
    }
  }
  return u;
}
const H = [
  0.08106146679532733,
  0.04134069595540946,
  0.02767792568499805,
  0.02079067210376495,
  0.016644691189821703,
  0.013876128823071987,
  0.011896709945892425,
  0.010411265261971892,
  0.00925546218270945,
  0.008330563433359472
];
function O(r) {
  return r < H.length ? H[r] : J0(r);
}
function J0(r) {
  const e = (r + 1) * (r + 1);
  return (1 / 12 - (1 / 360 - 1 / 1260 / e) / e) / (r + 1);
}
function Q0(r, e, t) {
  let o = -1;
  do {
    const i = r.random();
    o = Y0(i, e, t);
  } while (o < 0);
  return o;
}
function Y0(r, e, t) {
  const o = 1 - t, i = t / o, h = i * (e + 1);
  let _ = Math.pow(o, e), d = 0;
  for (; r >= _; )
    r -= _, d++, _ *= h / d - i;
  return d;
}
function L(r) {
  return -Math.log(r.random());
}
function Z0(r, e) {
  return L(r) / e;
}
const tt = Math.PI, et = 2 * tt;
function X(r) {
  let e = 0, t = 0;
  do
    e = r.random(), t = r.random();
  while (e < Number.EPSILON);
  return Math.sqrt(-2 * Math.log(e)) * Math.cos(et * t);
}
function rt(r, e, t) {
  return e + X(r) * t;
}
var D = { exports: {} }, K;
function at() {
  return K || (K = 1, function(r) {
    var e = function() {
      var t = new DataView(new ArrayBuffer(8)), o = function(a, s, u) {
        var v = -0.16666666666666632, f = 0.00833333333332249, w = -1984126982985795e-19, c = 27557313707070068e-22, I = -25050760253406863e-24, z = 158969099521155e-24, S, F, g, k = 0;
        return t.setFloat64(0, a), k = t.getInt32(0), k &= 2147483647, k < 1044381696 && !(a | 0) ? a : (S = a * a, g = S * a, F = f + S * (w + S * (c + S * (I + S * z))), a + g * (v + S * F));
      }, i = function(a, s) {
        var u = 1, v = 0.0416666666666666, f = -0.001388888888887411, w = 2480158728947673e-20, c = -27557314351390663e-23, I = 2087572321298175e-24, z = -11359647557788195e-27, S, F, g, k, q, C = 0;
        return t.setFloat64(0, a), C = t.getInt32(0), C &= 2147483647, C < 1044381696 && !(a | 0) ? u : (g = a * a, k = g * (v + g * (f + g * (w + g * (c + g * (I + g * z))))), C < 1070805811 ? u - (0.5 * g - (g * k - a * s)) : (C > 1072234496 ? q = 0.28125 : (t.setFloat64(0, q), t.setUint32(0, C - 2097152), t.setUint32(4, 0), q = t.getFloat64(0)), F = 0.5 * g - q, S = u - q, S - (F - (g * k - a * s))));
      }, h = function(a) {
        var s, u, v = 0, f = 0, w = 0, c = 4503599627370496, I = 1;
        if (t.setFloat64(0, a), f = t.getInt32(0), f &= 2147483647, f < 1070596096)
          return o(Math.PI * a);
        switch (s = -a, u = Math.floor(s), u != s ? (s *= 0.5, s = 2 * (s - Math.floor(s)), v = s * 4 | 0) : f >= 1128267776 ? (s = w, v = 0) : (f < 1127219200 && (u = s + c), v = t.getInt32(4), v &= 1, s = v, v <<= 2), v) {
          case 0:
            s = o(Math.PI * s);
            break;
          case 1:
          case 2:
            s = i(Math.PI * (0.5 - s), w);
            break;
          case 3:
          case 4:
            s = o(Math.PI * (I - s));
            break;
          case 5:
          case 6:
            s = -i(Math.PI * (s - 1.5), w);
            break;
          default:
            s = o(Math.PI * (s - 2));
            break;
        }
        return -s;
      }, _ = function(a) {
        var s = 0.5, u = 1, v = 3.141592653589793, f = 0.07721566490153287, w = 0.3224670334241136, c = 0.06735230105312927, I = 0.020580808432516733, z = 0.007385550860814029, S = 0.0028905138367341563, F = 0.0011927076318336207, g = 5100697921535113e-19, k = 22086279071390839e-20, q = 10801156724758394e-20, C = 25214456545125733e-21, Q = 44864094961891516e-21, V = 1.4616321449683622, Y = -0.12148629053584961, Z = -3638676997039505e-33, t0 = 0.48383612272381005, e0 = -0.1475877229945939, r0 = 0.06462494023913339, a0 = -0.032788541075985965, n0 = 0.01797067508118204, s0 = -0.010314224129834144, o0 = 0.006100538702462913, i0 = -0.0036845201678113826, u0 = 0.0022596478090061247, l0 = -0.0014034646998923284, v0 = 881081882437654e-18, c0 = -5385953053567405e-19, h0 = 31563207090362595e-20, f0 = -31275416837512086e-20, g0 = 3355291926355191e-19, m0 = -0.07721566490153287, d0 = 0.6328270640250934, M0 = 1.4549225013723477, w0 = 0.9777175279633727, p0 = 0.22896372806469245, _0 = 0.013381091853678766, S0 = 2.4559779371304113, b0 = 2.128489763798934, x0 = 0.7692851504566728, I0 = 0.10422264559336913, k0 = 0.003217092422824239, E0 = -0.07721566490153287, C0 = 0.21498241596060885, F0 = 0.325778796408931, q0 = 0.14635047265246445, P0 = 0.02664227030336386, R0 = 0.0018402845140733772, A0 = 3194753265841009e-20, T0 = 1.3920053346762105, y0 = 0.7219355475671381, z0 = 0.17193386563280308, N0 = 0.01864591917156529, B0 = 7779424963818936e-19, O0 = 7326684307446256e-21, U0 = 0.4189385332046727, D0 = 0.08333333333333297, V0 = -0.0027777777772877554, W0 = 7936505586430196e-19, j0 = -59518755745034e-17, G0 = 8363399189962821e-19, H0 = -0.0016309293409657527, P = 0, R, n, l, W = 0, A, T, y, j, G, p, m, b = 0, N = 0, B = 0, M = 0;
        if (t.setFloat64(0, a), N = t.getInt32(0), B = t.getInt32(4), M = N & 2147483647, M >= 2146435072)
          return a * a;
        if (!(M | B))
          return u / P;
        if (M < 999292928)
          return N < 0 ? -Math.log(-a) : -Math.log(a);
        if (N < 0) {
          if (M >= 1127219200 || (R = h(a), R == P))
            return u / P;
          W = Math.log(v / Math.abs(R * a)), a = -a;
        }
        if (!(M - 1072693248 | B) || !(M - 1073741824 | B))
          p = 0;
        else if (M < 1073741824)
          switch (M <= 1072483532 ? (p = -Math.log(a), M >= 1072130372 ? (n = u - a, b = 0) : M >= 1070442081 ? (n = a - (V - u), b = 1) : (n = a, b = 2)) : (p = P, M >= 1073460419 ? (n = 2 - a, b = 0) : M >= 1072936132 ? (n = a - V, b = 1) : (n = a - u, b = 2)), b) {
            case 0:
              l = n * n, T = f + l * (c + l * (z + l * (F + l * (k + l * C)))), y = l * (w + l * (I + l * (S + l * (g + l * (q + l * Q))))), A = n * T + y, p += A - 0.5 * n;
              break;
            case 1:
              l = n * n, m = l * n, T = t0 + m * (a0 + m * (o0 + m * (l0 + m * h0))), y = e0 + m * (n0 + m * (i0 + m * (v0 + m * f0))), j = r0 + m * (s0 + m * (u0 + m * (c0 + m * g0))), A = l * T - (Z - m * (y + n * j)), p += Y + A;
              break;
            case 2:
              T = n * (m0 + n * (d0 + n * (M0 + n * (w0 + n * (p0 + n * _0))))), y = u + n * (S0 + n * (b0 + n * (x0 + n * (I0 + n * k0)))), p += -0.5 * n + T / y;
          }
        else if (M < 1075838976)
          switch (b = a | 0, R = P, n = a - b, A = n * (E0 + n * (C0 + n * (F0 + n * (q0 + n * (P0 + n * (R0 + n * A0)))))), G = u + n * (T0 + n * (y0 + n * (z0 + n * (N0 + n * (B0 + n * O0))))), p = s * n + A / G, l = u, b) {
            case 7:
              l *= n + 6;
            /* FALLTHRU */
            case 6:
              l *= n + 5;
            /* FALLTHRU */
            case 5:
              l *= n + 4;
            /* FALLTHRU */
            case 4:
              l *= n + 3;
            /* FALLTHRU */
            case 3:
              l *= n + 2, p += Math.log(l);
              break;
          }
        else M < 1133510656 ? (R = Math.log(a), l = u / a, n = l * l, m = U0 + l * (D0 + n * (V0 + n * (W0 + n * (j0 + n * (G0 + n * H0))))), p = (a - s) * (R - u) + m) : p = a * (Math.log(a) - u);
        return N < 0 && (p = W - p), p;
      }, d = function(a) {
        return _(a);
      }, E = function(a) {
        return Math.exp(_(a));
      };
      return {
        lngamma: d,
        gamma: E
      };
    }();
    r.exports = e;
  }(D)), D.exports;
}
var nt = at();
function st(r, e) {
  return e < 10 ? it(r, e) : ut(r, e);
}
const ot = 2 ** 31 - 1;
function it(r, e) {
  let t = 0;
  const o = Math.exp(-e);
  let i = 1;
  for (; ; ) {
    const h = r.random();
    if (i = i * h, i <= o && t <= ot)
      break;
    t++;
  }
  return t;
}
function ut(r, e) {
  let t = 0;
  const o = Math.log(e), i = 0.931 + 2.53 * Math.sqrt(e), h = -0.059 + 0.02483 * i, _ = 1.1239 + 1.1328 / (i - 3.4);
  for (; ; ) {
    let d = r.random();
    d -= 0.5;
    const E = r.random(), a = 0.5 - Math.abs(d), s = Math.floor((2 * h / a + i) * d + e + 0.43);
    if (a >= 0.07 && E <= 0.9277 - 3.6224 / (i - 2)) {
      t = s;
      break;
    }
    if (s < 0 || a < 0.013 && E > a)
      continue;
    const u = Math.log(E * _ / (h / (a * a) + i)), v = -e + s * o - nt.lngamma(s + 1);
    if (u <= v) {
      t = s;
      break;
    }
  }
  return t;
}
function $(r) {
  return r.random();
}
function lt(r, e, t) {
  return $(r) * (t - e) + e;
}
class dt {
  /** An initialised random number state
   */
  constructor(e) {
    /** The internal random number state, which is updated by calls to
     * any of the distribution functions.
     */
    x(this, "state");
    this.state = e;
  }
  /** Generate a standard exponential random number Exponential(1)
   * ({@link randomExponential})
   */
  randomExponential() {
    return L(this.state);
  }
  /** Generate a standard normal random number N(0, 1) ({@link
   * randomNormal})
   */
  randomNormal() {
    return X(this.state);
  }
  /** Generate a standard uniform random number U(0, 1) ({@link
   * randomUniform})
   */
  randomUniform() {
    return $(this.state);
  }
  /** Generate a binomially distributed random number ({@link binomial})
   * @param n number of trials
   * @param p per-traial probability of success
   */
  binomial(e, t) {
    return X0(this.state, e, t);
  }
  /** Generate an exponentially distributed random number
   * ({@link exponential})
   * @param rate The rate of the process
   */
  exponential(e) {
    return Z0(this.state, e);
  }
  /** Generate an normally distributed random number ({@link normal})
   * @param mean The mean of the distribution
   * @param sd The standard deviation of the distribution
   */
  normal(e, t) {
    return rt(this.state, e, t);
  }
  /** Generate a Poisson distributed random number ({@link poisson})
   * @param lambda The mean of the distribution
   */
  poisson(e) {
    return st(this.state, e);
  }
  /** Generate a uniformly distributed random number ({@link uniform})
   * @param min Minimum value of the distribution
   * @param max Max value of the distribution
   */
  uniform(e, t) {
    return lt(this.state, e, t);
  }
}
class U {
  /** Set the seed of the generator; most generators should support
   * this but {@link RngStateBuiltin} does not, and a
   * cryptographically secure generator also may not.
   */
  setSeed(e) {
    throw Error("This generator cannot be seeded (really!)");
  }
  /** Get the entire internal state of a generator */
  getState() {
    throw Error("This generator cannot return its state");
  }
  /** Replace the entire internal state of a generator */
  setState(e) {
    throw Error("This generator set its state");
  }
}
const vt = 4294967296, J = 23283064365386963e-26;
function ct() {
  let r = 4022871197;
  return (e) => {
    for (let t = 0; t < e.length; t++) {
      r += e.charCodeAt(t);
      let o = 0.02519603282416938 * r;
      r = o >>> 0, o -= r, o *= r, r = o >>> 0, o -= r, r += o * vt;
    }
    return (r >>> 0) * J;
  };
}
function ht(r) {
  const e = ct();
  let t = e(" "), o = e(" "), i = e(" ");
  const h = 1;
  return r.forEach((_) => {
    const d = _.toString();
    t -= e(d), t < 0 && (t += 1), o -= e(d), o < 0 && (o += 1), i -= e(d), i < 0 && (i += 1);
  }), [t, o, i, h];
}
class Mt extends U {
  /**
   * The generator can be started from a "seed" (some small piece of
   * data from which we'll derive a state) or from a state.
   *
   * @param seed An initial seed; any truthy value will do. If not
   * given (and if `state` is not given, then we seed using
   * `Math.random()`
   *
   * @param state A state extracted from a previously initialised
   * copy of an `RngStateAlea` generator; will be a length 4
   * array. If given, then seed must be `null`.
   */
  constructor(t = null, o) {
    super();
    // The compiler can't work out that these are definitely assigned,
    // but they are, via setState() (eventually).
    x(this, "s0");
    x(this, "s1");
    x(this, "s2");
    x(this, "c");
    const i = t !== null, h = o !== void 0;
    if (i && h)
      throw Error("Can't provide both initial seed and state");
    h ? this.setState(o) : this.setSeed(t);
  }
  random() {
    const t = 2091639 * this.s0 + this.c * J;
    return this.s0 = this.s1, this.s1 = this.s2, this.s2 = t - (this.c = t | 0);
  }
  setSeed(t) {
    const o = ht([t || Math.random()]);
    this.setState(o);
  }
  getState() {
    return [this.s0, this.s1, this.s2, this.c];
  }
  setState(t) {
    if (t.length !== 4)
      throw Error(`Expected state to have length 4 (but was ${t.length})`);
    this.s0 = t[0], this.s1 = t[1], this.s2 = t[2], this.c = t[3];
  }
}
class ft extends U {
  constructor() {
    super();
  }
  random() {
    return Math.random();
  }
}
class gt extends U {
  /** @param values The values that the state will return. */
  constructor(t) {
    super();
    x(this, "_i");
    x(this, "_values");
    this._i = 0, this._values = t;
  }
  random() {
    const t = this._values[this._i++];
    if (this._i > this._values.length)
      throw Error("Exhausted stream");
    return t;
  }
  /**
   * Number of draws left in the object before we run out of state to
   * replay
   */
  length() {
    return this._values.length - this._i;
  }
}
class wt extends U {
  /**
   * Optionally, a random number state - if not given we default
   * construct the the builtin state {@link RngStateBuiltin}.
   */
  constructor(t) {
    super();
    x(this, "_state");
    x(this, "_values");
    t === void 0 && (t = new ft()), this._state = t, this._values = [];
  }
  random() {
    const t = this._state.random();
    return this._values.push(t), t;
  }
  /**
   * Create a new {@link RngStateReplay} random number state that
   * will replay the values from this generator.
   */
  replay() {
    return new gt(this._values);
  }
  /**
   * The number of random number draws available to replay.
   */
  length() {
    return this._values.length;
  }
  /**
   * The array of values drawn by this generator
   */
  values() {
    return this._values;
  }
}
export {
  dt as Random,
  U as RngState,
  Mt as RngStateAlea,
  ft as RngStateBuiltin,
  wt as RngStateObserved,
  gt as RngStateReplay,
  X0 as binomial,
  Z0 as exponential,
  rt as normal,
  st as poisson,
  L as randomExponential,
  X as randomNormal,
  $ as randomUniform,
  lt as uniform
};
