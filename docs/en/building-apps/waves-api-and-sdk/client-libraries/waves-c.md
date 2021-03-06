# WavesC

C library for working with Waves.

# Build

This package uses `cmake` 2.8+ for building and it depends on `openssl` dev package.

To build it on **linux** should install `openssl-dev` and just call cmake and make

```js
cmake .
make
```

On **macOS** you should [install openssl using brew](https://formulae.brew.sh/formula/openssl@1.1) and then pass the openssl path as cmake parameter:

```js
brew install openssl
cmake -DOPENSSL_ROOT_DIR=/usr/local/opt/openssl .
make
```

For a quick start, we took the [bcdev's waves\_vanity source code](https://github.com/bcdev-/waves_vanity)source code as a basis.

