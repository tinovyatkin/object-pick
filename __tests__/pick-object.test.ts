import { pick } from '../src';

describe('pick with object', () => {
  it('return the same object in while non existent props supplied', () => {
    const obj = {
      foo: 'bar',
      bar: 'foo',
    };
    // @ts-expect-error
    expect(pick(obj)).toBe(obj);
    // @ts-expect-error
    expect(pick(null, ['ss'])).toBeNull();
    // @ts-expect-error
    expect(pick(undefined, ['dd'])).toBeUndefined();
    // @ts-expect-error
    expect(pick('nonobject', ['algo'])).toBe('nonobject');
    // @ts-expect-error
    expect(pick(obj, 'non-array')).toBe(obj);
  });

  it('returns empty object if no properties found', () => {
    expect(
      // @ts-expect-error
      pick(
        {
          foo: 'bar',
          bar: 'foo',
        },
        ['zoo'],
      ),
    ).toEqual({});
    expect(pick({ book: 1 }, [])).toEqual({});
  });

  it('returns new object with given properties', () => {
    expect(
      pick({ boo: 'bar', foo: 'eee', [Symbol.for('eee')]: 'aaaa' }, [
        'boo',
        'foo',
      ]),
    ).toEqual({ boo: 'bar', foo: 'eee' });
  });

  it('works with symbols', () => {
    expect(
      pick({ boo: 'bar', foo: 'eee', [Symbol.for('eee')]: 'aaaa' }, [
        'boo',
        Symbol.for('eee'),
      ]),
    ).toEqual({ boo: 'bar', [Symbol.for('eee')]: 'aaaa' });
  });

  it('shortcut when requesting just one string property', () => {
    expect(pick({ boo: 'bar', foo: 'eee' }, ['boo'])).toEqual({ boo: 'bar' });
  });
});
