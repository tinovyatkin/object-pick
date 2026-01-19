# object-pickby

[![codecov](https://codecov.io/gh/tinovyatkin/object-pick/branch/master/graph/badge.svg)](https://codecov.io/gh/tinovyatkin/object-pick)

Tiny TypeScript alternative to `only`, `lodash.pick`, and `lodash.pickBy`.
Built for ES2019+ environments and implemented on top of `Object.fromEntries`.

## Installation

```sh
npm install object-pickby
```

## Usage

`pick` works with plain objects, arrays (including negative indices), and symbol
keys. `pickBy` supports both objects and arrays; the predicate receives the
accumulator as the third argument.

```ts
import { pick, pickBy } from "object-pickby";

it("works with symbols", () => {
  expect(
    pick({ boo: "bar", foo: "eee", [Symbol.for("eee")]: "aaaa" }, ["boo", Symbol.for("eee")]),
  ).toEqual({ boo: "bar", [Symbol.for("eee")]: "aaaa" });
});

it("works with array and negative indexes", () => {
  expect(pick([1, 2, 3, 4], [1, -2])).toEqual([2, 3]);
});

it("picks items by function, providing accumulated array to predicate", () => {
  expect(
    pickBy(
      [1, "slon", 2, "slon", 3, "foo"],
      (val, idx, acc) => typeof val === "string" && idx < 4 && !acc.includes(val),
    ),
  ).toEqual(["slon"]);
});
```

## Compatibility

This package relies on `Object.fromEntries`:

- <https://node.green/#ES2019-features--Object-fromEntries> (Node.js >= 12.4)
- <https://caniuse.com/#search=fromEntries>

If you need to support older environments, polyfill `Object.fromEntries` (for
example via `core-js`) in your build pipeline.

## License

MIT
