import getPathSeparator from './getPathSeparator';

it('returns unix separator', () => {
  expect(getPathSeparator()).toBe('/');
});
