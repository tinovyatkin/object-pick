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

  it("shortcut when requesting just one symbol property", () => {
    const sym = Symbol.for("test");
    assert.deepStrictEqual(pick({ boo: "bar", [sym]: "symval" }, [sym]), {
      [sym]: "symval",
    });
  });

  it("shortcut returns empty object for non-existent single symbol", () => {
    const sym = Symbol.for("missing");
    // @ts-expect-error - testing with symbol not in object type
    assert.deepStrictEqual(pick({ boo: "bar" }, [sym]), {});
  });

  it("shortcut returns empty object for non-existent single string key", () => {
    // @ts-expect-error - testing with key not in object type
    assert.deepStrictEqual(pick({ boo: "bar" }, ["missing"]), {});
  });

  it("handles multi-key pick with some non-existent keys", () => {
    // @ts-expect-error - testing with keys not in object type
    assert.deepStrictEqual(pick({ a: 1, b: 2, c: 3 }, ["a", "missing", "c"]), {
      a: 1,
      c: 3,
    });
  });

  it("handles multi-key pick with only symbols", () => {
    const sym1 = Symbol.for("s1");
    const sym2 = Symbol.for("s2");
    assert.deepStrictEqual(pick({ [sym1]: "v1", [sym2]: "v2", str: "v3" }, [sym1, sym2]), {
      [sym1]: "v1",
      [sym2]: "v2",
    });
  });

  it("handles multi-key pick with non-existent symbols", () => {
    const sym1 = Symbol.for("exists");
    const sym2 = Symbol.for("missing");
    // @ts-expect-error - testing with symbol not in object type
    assert.deepStrictEqual(pick({ [sym1]: "v1", str: "v2" }, [sym1, sym2]), {
      [sym1]: "v1",
    });
  });
});
