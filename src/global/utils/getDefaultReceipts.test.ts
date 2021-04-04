import getTodaysDateAtNoon from './getTodaysDateAtNoon';
import getDefaultReceipt from './getDefaultReceipts';

it('returns default shape of a receipt data', () => {
  const expected = {
    merchantName: '',
    merchantPhoneNumber: '',
    merchantAddress: '',
    transactionDate: getTodaysDateAtNoon(),
    total: 0,
    subtotal: 0,
    tax: 0,
    tip: 0,
    currency: '',
    items: [],
  };

  expect(getDefaultReceipt()).toEqual(expected);
});
