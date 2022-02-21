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
export function pick<T extends Record<PropertyKey, unknown>, U extends keyof T>(
  object: T,
  props: readonly U[],
): Pick<T, U>;

export function pick<T extends unknown[]>(
  array: T,
  indexes: readonly number[],
): T;

export function pick(
  objectOrArray: Record<PropertyKey, unknown> | readonly unknown[],
  props: readonly PropertyKey[],
) {
  if (!objectOrArray) return objectOrArray;
  if (typeof props?.some !== 'function') return objectOrArray;

  if (objectOrArray instanceof Array) {
    return props
      .filter((i): i is number => {
        if (typeof i !== 'number' || !Number.isInteger(i))
          throw new TypeError(
            `While picking from an array we expect array of integer indexes to pick, but got ${String(
              i,
            )}`,
          );
        return Math.abs(i) <= objectOrArray.length;
      })
      .map(i => objectOrArray[i < 0 ? objectOrArray.length + i : i]);
  }

  if (typeof objectOrArray !== 'object') return objectOrArray;
  const entries: [string | symbol, unknown][] = Object.entries(objectOrArray);
  if (props.some(property => typeof property === 'symbol')) {
    const symbolProps: [symbol, unknown][] = Object.getOwnPropertySymbols(
      objectOrArray,
    ).map(symbol => [symbol, objectOrArray[symbol]]);
    entries.push(...symbolProps);
  }
  const properties = new Set(props);
  if (properties.size === 0) return {};
  return Object.fromEntries(
    entries.filter(([property]) => properties.has(property)),
  );
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
  if (!objectOrArray || typeof predicate !== 'function') return objectOrArray;

  if (objectOrArray instanceof Array) {
    return objectOrArray.reduce<typeof objectOrArray[number][]>(
      (accumulator, currentValue, currentIndex) => {
        if (predicate(currentValue, currentIndex, accumulator))
          accumulator.push(currentValue);
        return accumulator;
      },
      [],
    );
  }

  return Object.fromEntries(
    [
      ...Object.entries(objectOrArray),
      ...Object.getOwnPropertySymbols(objectOrArray).map(symbol => [
        symbol,
        objectOrArray[symbol],
      ]),
    ].filter(([key, value]) => predicate(value, key)),
  ) as Partial<typeof objectOrArray>;
}
