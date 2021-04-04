import getTodaysDateAtNoon from './getTodaysDateAtNoon';

beforeAll(() => {
  // @ts-ignore
  jest.useFakeTimers('modern');
  // @ts-ignore
  jest.setSystemTime(new Date(2021, 4, 1, 8, 30, 15));
});

it('returns today at noon', () => {
  console.log(new Date().getDate());
  expect(getTodaysDateAtNoon()).toEqual(new Date(2021, 4, 1, 12, 0, 0));
});
