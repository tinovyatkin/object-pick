# object-pick [![codecov](https://codecov.io/gh/tinovyatkin/object-pick/branch/master/graph/badge.svg)](https://codecov.io/gh/tinovyatkin/object-pick)

It's similar to 7 years old TJ's `only` or `lodash.pick` and `lodash.pickBy` but written for today's world with TypeScript and `Object.fromEntries` supporting environments:

- https://node.green/#ES2019-features--Object-fromEntries (Node >= 12.4)
- https://caniuse.com/#search=fromEntries
- https://polyfill.io/v3/polyfill.min.js?features=Object.getOwnPropertyDescriptors,Object.fromEntries
- core-js polyfilled with Babel

Contrary of all above it also works with arrays and Symbols:

```ts
import { pick, pickBy } from 'object-pick';

it('works with symbols', () => {
  expect(
    pick({ boo: 'bar', foo: 'eee', [Symbol.for('eee')]: 'aaaa' }, [
      'boo',
      Symbol.for('eee'),
    ]),
  ).toEqual({ boo: 'bar', [Symbol.for('eee')]: 'aaaa' });
});

it('works with array and negative indexes', () => {
  expect(pick([1, 2, 3, 4], [1, -2])).toEqual([2, 3]);
});

it('picks items by function, providing accumulated array to predicate', () => {
  expect(
    pickBy(
      [1, 'slon', 2, 'slon', 3, 'foo'],
      (val, idx, acc) =>
        typeof val === 'string' && idx < 4 && !acc.includes(val),
    ),
  ).toEqual(['slon']);
});
```

# License: MIT
