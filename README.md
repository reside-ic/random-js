## Random number distributions in JavaScript

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
[![build-and-test](https://github.com/reside-ic/random-js/actions/workflows/ci.yml/badge.svg)](https://github.com/reside-ic/random-js/actions/workflows/ci.yml)
[![codecov.io](https://codecov.io/github/reside-ic/random-js/coverage.svg?branch=main)](https://codecov.io/github/reside-ic/random-js?branch=main)

Random number distributions in JavaScript

Random numbers are slippery things, particularly if you want to use them. This package provides a slightly different take on random number generation to many other similar javascript packages:

**We focus on access to distributions where the expectation is that subsequent calls may use different parameters**. Many packages focus on efficient generation of numbers from a single distribution (e.g., a binomial distribution with fixed `n` and `p`) but we assume that each call to generate binomial may have a different `n` and `p` and so don't try and be clever about caching.

**We include different underlying generators, and a simple interface that can adapt to new generators**. We provide a abstract `RngState` class and several different concrete versions of this.

The distribution support is curently poor (binomial, exponential, normal, Poisson and uniform) but will expand this as we need them. We try and reference the underlying papers clearly so that these algorithms are as clear as possible.

## Licence

MIT © Imperial College of Science, Technology and Medicine

Please note that this project is released with a [Contributor Code of Conduct](CONDUCT.md). By participating in this project you agree to abide by its terms.
