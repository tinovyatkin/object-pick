import { pick } from '../src';

describe('pick works with array', () => {
  it('returns empty array for out of range indexes', () => {
    expect(pick([1, 2, 3, 4], [10, 11])).toEqual([]);
  });

  it('works with positive indexes', () => {
    expect(pick([1, 2, 3, 4], [0, 2])).toEqual([1, 3]);
  });

  it('works with negative indexes', () => {
    expect(pick([1, 2, 3, 4], [1, -2])).toEqual([2, 3]);
  });

  it('does not works with bad indexes', () => {
    // @ts-expect-error
    expect(() => pick([1, 2, 3, 4], [1, 'boo'])).toThrow(TypeError);
  });
});
