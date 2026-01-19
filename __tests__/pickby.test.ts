import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pickBy } from "../src/index.ts";

describe("pickBy with objects", () => {
  it("returns the same object if predicate is not a function", () => {
    const obj = { foo: "boo" };
    //@ts-ignore
    assert.deepStrictEqual(pickBy(obj, "ola-la"), obj);
  });

  it("picks properties by function", () => {
    const obj = {
      slon1: "1",
      slon2: 2,
      boo: "foo",
    };
    assert.deepStrictEqual(
      pickBy(obj, (val, key) => key.includes("slon") && Number.isInteger(val as any)),
      { slon2: 2 },
    );
  });

  it("works with symbols", () => {
    const obj = {
      [Symbol.for("aa")]: "z",
      [Symbol.for("bbb")]: 2,
      boo: "foo",
    };
    assert.deepStrictEqual(
      pickBy(obj, (val, key) => Number.isInteger(val as any) && typeof key === "symbol"),
      { [Symbol.for("bbb")]: 2 },
    );
  });
});
