import { pickBy } from '../src';

describe('pickBy with array', () => {
  it('picks items by function', () => {
    expect(
      pickBy(
        [1, 'slon', 2, 'slon', 3, 'foo'],
        (val, idx, acc) =>
          typeof val === 'string' && idx < 4 && !acc.includes(val),
      ),
    ).toEqual(['slon']);
  });
});
