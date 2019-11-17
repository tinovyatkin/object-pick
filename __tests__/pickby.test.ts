import { pickBy } from '../src';

describe('pickBy with objects', () => {
  it('returns the same object if predicate is not a function', () => {
    const obj = { foo: 'boo' };
    //@ts-ignore
    expect(pickBy(obj, 'ola-la')).toEqual(obj);
  });
  it('picks properties by function', () => {
    const obj = {
      slon1: '1',
      slon2: 2,
      boo: 'foo',
    };
    expect(
      pickBy(
        obj,
        (val, key) => key.includes('slon') && Number.isInteger(val as any),
      ),
    ).toEqual({ slon2: 2 });
  });

  it('works with symbols', () => {
    const obj = {
      [Symbol.for('aa')]: 'z',
      [Symbol.for('bbb')]: 2,
      boo: 'foo',
    };
    expect(
      pickBy(
        obj,
        (val, key) => Number.isInteger(val as any) && typeof key === 'symbol',
      ),
    ).toEqual({ [Symbol.for('bbb')]: 2 });
  });
});
