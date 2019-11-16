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
export function pick<T extends any[], U extends number[]>(
  array: T,
  indexes: readonly number[],
): T;
export function pick<T extends object, U extends keyof T>(
  object: T,
  props: readonly U[],
): Pick<T, U>;
export function pick(
  object: object | any[],
  props: readonly string[] | readonly number[],
) {
  if (!object || !Array.isArray(props)) return object;

  if (Array.isArray(object)) {
    return props
      .filter(i => {
        if (!Number.isInteger(i))
          throw new TypeError(
            `While picking from an array we expect array of integer indexes to pick, but got ${i}`,
          );
        return Math.abs(i) <= object.length;
      })
      .map(i => object[i < 0 ? object.length + i : i]);
  }

  if (typeof object !== 'object') return object;
  const entries: [string | symbol, any][] = Object.entries(object);
  if (props.some(property => typeof property === 'symbol'))
    entries.push(
      ...(Object.getOwnPropertySymbols(object).map(symbol => [
        symbol,
        object[symbol],
      ]) as [symbol, any][]),
    );
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
export function pickBy<T extends object>(
  object: T,
  predicate: (value: any, key: string) => boolean,
): Partial<T>;
export function pickBy<U, T extends U[]>(
  array: T,
  predicate: (value: U, index: number, accumulator: U[]) => boolean,
): T;
export function pickBy(objectOrArray, predicate) {
  if (!objectOrArray || typeof predicate !== 'function') return objectOrArray;

  if (Array.isArray(objectOrArray)) {
    return objectOrArray.reduce((accumulator, currentValue, currentIndex) => {
      if (predicate(currentValue, currentIndex, accumulator))
        accumulator.push(currentValue);
      return accumulator;
    }, []);
  }

  return Object.fromEntries(
    [
      ...Object.entries(objectOrArray),
      ...Object.getOwnPropertySymbols(objectOrArray).map(symbol => [
        symbol,
        objectOrArray[symbol],
      ]),
    ].filter(([key, value]) => predicate(value, key)),
  );
}
