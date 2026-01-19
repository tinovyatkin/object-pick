import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pick } from "../src/index.ts";

describe("pick works with array", () => {
  it("returns empty array for out of range indexes", () => {
    assert.deepStrictEqual(pick([1, 2, 3, 4], [10, 11]), []);
  });

  it("works with positive indexes", () => {
    assert.deepStrictEqual(pick([1, 2, 3, 4], [0, 2]), [1, 3]);
  });

  it("works with negative indexes", () => {
    assert.deepStrictEqual(pick([1, 2, 3, 4], [1, -2]), [2, 3]);
  });

  it("does not works with bad indexes", () => {
    // @ts-expect-error
    assert.throws(() => pick([1, 2, 3, 4], [1, "boo"]), TypeError);
  });
});
