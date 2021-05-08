import execIfOnline from './execIfOnline.windows';

it('always executes', () => {
  const fn = jest.fn();

  execIfOnline(fn);

  expect(fn).toHaveBeenCalled();
});
