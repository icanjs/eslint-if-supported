# eslint-if-supported
Run ESLint, standard, or semistandard only if on a supported node version

This package is useful if you want to include eslint in your test cycle, but also want to support testing against node versions before 4.0, which are unsupported by ESLint.

Suppose you have an npm `test` script of `"npm run eslint && npm run mocha"`.  Without this package, if you were testing the following node versions, only one test could pass because ESLint isn't supported on all versions of node:
```
Node.js: 0.10  --> FAIL
Node.js: 0.12  --> FAIL
Node.js node   --> PASS
Node.js iojs   --> FAIL
```

With this package, all of the tests could potentially pass (assuming, you know, the tests themselves actually pass).
```
Node.js: 0.10  --> PASS, but eslint was skipped
Node.js: 0.12  --> PASS, but eslint was skipped
Node.js node   --> PASS
Node.js iojs   --> PASS, but eslint was skipped
```

## Installation
```
npm install eslint-if-supported --save-dev
```

Either eslint, standard, or semistandard need to be installed (or some other eslint-based package). Make sure you've done at least one of the following in your project:
```
npm install eslint --save-dev
npm install standard --save-dev
npm install semistandard --save-dev
```

## Usage
If you have a package.json like this:

```
scripts: {
  "eslint": "semistandard --fix",
  "mocha": "mocha test/ --compilers js:babel-core/register --recursive",
  "test": "npm run eslint && npm run mocha"
}
```

Just update it to look like this:

```
scripts: {
  "eslint": "eslint-if-supported semistandard --fix",
  "mocha": "mocha test/ --compilers js:babel-core/register --recursive",
  "test": "npm run eslint && npm run mocha"
}
```

You basically just need to prefix `eslint-if-supported ` to your `eslint` npm script.