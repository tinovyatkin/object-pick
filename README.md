# object-pickby

[![codecov](https://codecov.io/gh/tinovyatkin/object-pick/branch/master/graph/badge.svg)](https://codecov.io/gh/tinovyatkin/object-pick)

Tiny TypeScript alternative to `only`, `lodash.pick`, and `lodash.pickBy`.
Built for ES2019+ environments.

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

This package targets Node.js >= 12.4 / ES2019+ environments.

## License

MIT
