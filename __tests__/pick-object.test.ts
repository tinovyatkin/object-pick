//@ts-nocheck

import { pick } from '../src';

describe('pick with object', () => {
  it('return the same object in while non existent props supplied', () => {
    const obj = {
      foo: 'bar',
      bar: 'foo',
    };
    expect(pick(obj)).toBe(obj);
    expect(pick(null, ['ss'])).toBeNull();
    expect(pick(undefined, ['dd'])).toBeUndefined();
    expect(pick('nonobject', ['algo'])).toBe('nonobject');
    expect(pick(obj, 'non-array')).toBe(obj);
  });

  it('returns empty object if no properties found', () => {
    expect(
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
