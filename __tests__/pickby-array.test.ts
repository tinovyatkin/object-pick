import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pickBy } from "../src/index.ts";

describe("pickBy with array", () => {
  it("picks items by function", () => {
    assert.deepStrictEqual(
      pickBy(
        [1, "slon", 2, "slon", 3, "foo"],
        (val, idx, acc) => typeof val === "string" && idx < 4 && !acc.includes(val),
      ),
      ["slon"],
    );
  });
});
