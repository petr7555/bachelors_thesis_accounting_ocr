import uuid from 'uuid';
import getDefaultItem from './getDefaultItem';

jest.mock('uuid', () => {
  const v4 = jest.fn();
  return {
    v4,
  };
});

beforeEach(() => {
  let value = 0;
  // @ts-ignore
  uuid.v4.mockImplementation(() => `${value++}`);
});

it('returns default shape of an item', () => {
  const expected = {
    id: '0',
    name: '',
    quantity: 1,
    price: 0,
    totalPrice: 0,
  };

  expect(getDefaultItem()).toEqual(expected);
});
