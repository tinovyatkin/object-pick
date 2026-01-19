import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pick } from "../src/index.ts";

describe("pick with object", () => {
  it("return the same object in while non existent props supplied", () => {
    const obj = {
      foo: "bar",
      bar: "foo",
    };
    // @ts-expect-error
    assert.strictEqual(pick(obj), obj);
    // @ts-expect-error
    assert.strictEqual(pick(null, ["ss"]), null);
    // @ts-expect-error
    assert.strictEqual(pick(undefined, ["dd"]), undefined);
    // @ts-expect-error
    assert.strictEqual(pick("nonobject", ["algo"]), "nonobject");
    // @ts-expect-error
    assert.strictEqual(pick(obj, "non-array"), obj);
  });

  it("returns empty object if no properties found", () => {
    assert.deepStrictEqual(
      // @ts-expect-error
      pick(
        {
          foo: "bar",
          bar: "foo",
        },
        ["zoo"],
      ),
      {},
    );
    assert.deepStrictEqual(pick({ book: 1 }, []), {});
  });

  it("returns new object with given properties", () => {
    assert.deepStrictEqual(
      pick({ boo: "bar", foo: "eee", [Symbol.for("eee")]: "aaaa" }, ["boo", "foo"]),
      { boo: "bar", foo: "eee" },
    );
  });

  it("works with symbols", () => {
    assert.deepStrictEqual(
      pick({ boo: "bar", foo: "eee", [Symbol.for("eee")]: "aaaa" }, ["boo", Symbol.for("eee")]),
      { boo: "bar", [Symbol.for("eee")]: "aaaa" },
    );
  });

  it("shortcut when requesting just one string property", () => {
    assert.deepStrictEqual(pick({ boo: "bar", foo: "eee" }, ["boo"]), {
      boo: "bar",
    });
  });
});
