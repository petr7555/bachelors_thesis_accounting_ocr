import getPathSeparator from './getPathSeparator.windows';

it('returns windows separator', () => {
  expect(getPathSeparator()).toBe('\\');
});
