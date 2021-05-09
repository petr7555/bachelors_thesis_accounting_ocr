import combine from './combine';

it('combines items into unix path', () => {
  expect(combine('dir', 'file')).toBe('dir/file');
});
