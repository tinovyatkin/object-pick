/**
 * Creates an object composed of the picked `object` properties.
 *
 * @category Object
 * @param object The source object.
 * @param [props] The property names to pick, specified
 *  individually or in arrays.
 * @returns Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * only(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
function isUnknownArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}

export function pick<T extends object, U extends keyof T>(
  object: T,
  props: readonly U[],
): Pick<T, U>;

export function pick<T extends unknown[]>(array: T, indexes: readonly number[]): T;

export function pick(
  objectOrArray: Record<PropertyKey, unknown> | readonly unknown[],
  props: readonly PropertyKey[],
) {
  if (!objectOrArray) return objectOrArray;
  if (!Array.isArray(props)) return objectOrArray;

  if (isUnknownArray(objectOrArray)) {
    const length = objectOrArray.length;
    const result: unknown[] = [];

    for (const index of props) {
      if (typeof index !== "number" || !Number.isInteger(index)) {
        throw new TypeError(
          `While picking from an array we expect array of integer indexes to pick, but got ${String(
            index,
          )}`,
        );
      }

      const normalizedIndex = index < 0 ? length + index : index;
      if (normalizedIndex >= 0 && normalizedIndex < length) {
        result.push(objectOrArray[normalizedIndex]);
      }
    }

    return result;
  }

  if (typeof objectOrArray !== "object") return objectOrArray;

  if (props.length === 0) return {};

  if (props.length === 1) {
    const key = props[0];
    if (typeof key === "symbol") {
      if (Object.prototype.propertyIsEnumerable.call(objectOrArray, key)) {
        return { [key]: objectOrArray[key] };
      }
      return {};
    }

    const stringKey = String(key);
    if (Object.prototype.propertyIsEnumerable.call(objectOrArray, stringKey)) {
      return { [stringKey]: objectOrArray[stringKey] };
    }
    return {};
  }

  const stringKeys = new Set<string>();
  const symbolKeys = new Set<symbol>();
  for (const key of props) {
    if (typeof key === "symbol") symbolKeys.add(key);
    else stringKeys.add(String(key));
  }

  const result: Record<PropertyKey, unknown> = {};

  for (const key of stringKeys) {
    if (Object.prototype.propertyIsEnumerable.call(objectOrArray, key)) {
      result[key] = objectOrArray[key];
    }
  }

  for (const key of symbolKeys) {
    if (Object.prototype.propertyIsEnumerable.call(objectOrArray, key)) {
      result[key] = objectOrArray[key];
    }
  }

  return result;
}

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @category Object
 * @param object The source object.
 * @param [predicate] The function invoked per property.
 * @returns Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pickBy(object, Number.isInteger.bind(Number));
 * // => { 'a': 1, 'c': 3 }
 */
export function pickBy<U, T extends Record<string, U>>(
  record: T,
  predicate: (value: U, key: string) => boolean,
): Partial<T>;
export function pickBy<T extends Record<PropertyKey, unknown>>(
  object: T,
  predicate: (value: unknown, key: PropertyKey) => boolean,
): Partial<T>;
export function pickBy<U, T extends readonly U[]>(
  array: T,
  predicate: (value: U, index: number, accumulator: U[]) => boolean,
): T;
export function pickBy(
  objectOrArray: Record<PropertyKey, unknown> | readonly unknown[],
  predicate: (...args) => boolean,
) {
  if (!objectOrArray || typeof predicate !== "function") return objectOrArray;

  if (isUnknownArray(objectOrArray)) {
    const result: unknown[] = [];
    for (let i = 0; i < objectOrArray.length; i++) {
      const value = objectOrArray[i];
      if (predicate(value, i, result)) result.push(value);
    }
    return result;
  }

  const result: Record<PropertyKey, unknown> = {};

  for (const key of Object.keys(objectOrArray)) {
    const value = objectOrArray[key];
    if (predicate(value, key)) result[key] = value;
  }

  const symbols = Object.getOwnPropertySymbols(objectOrArray);
  if (symbols.length > 0) {
    for (const symbol of symbols) {
      const value = objectOrArray[symbol];
      if (predicate(value, symbol)) result[symbol] = value;
    }
  }

  return result as Partial<typeof objectOrArray>;
}
