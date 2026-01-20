import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pickBy } from "../src/index.ts";

describe("pickBy with objects", () => {
  it("returns the same object if predicate is not a function", () => {
    const obj = { foo: "boo" };
    //@ts-ignore
    assert.deepStrictEqual(pickBy(obj, "ola-la"), obj);
  });

  it("returns null/undefined when passed as object", () => {
    //@ts-ignore
    assert.strictEqual(
      pickBy(null, () => true),
      null,
    );
    //@ts-ignore
    assert.strictEqual(
      pickBy(undefined, () => true),
      undefined,
    );
  });

  it("handles object without symbols", () => {
    const obj = { a: 1, b: 2, c: 3 };
    assert.deepStrictEqual(
      pickBy(obj, (val) => (val as number) > 1),
      { b: 2, c: 3 },
    );
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
