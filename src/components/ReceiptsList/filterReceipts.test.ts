import { filterReceipts, FirebaseReceipt } from './ReceiptsList';
import getDefaultReceipt from '../../global/utils/getDefaultReceipts';
import { firestore } from '../../global/firebase';
import getDefaultItem from '../../global/utils/getDefaultItem';

const getDefaultFirebaseReceipt = (): FirebaseReceipt => ({
  ...getDefaultReceipt(),
  // @ts-ignore
  transactionDate: firestore.Timestamp.now(),
  id: '123',
  // @ts-ignore
  added: firestore.Timestamp.now(),
  urlOriginal: 'http://firebase.com/123',
  urlProcessed: 'http://firebase.com/processed_123',
});

it('returns all receipts when search is emptyResponse', () => {
  const receipt1 = getDefaultFirebaseReceipt();
  receipt1.merchantName = 'Lidl';

  const receipt2 = getDefaultFirebaseReceipt();
  receipt2.merchantName = 'Billa';

  const receipt3 = getDefaultFirebaseReceipt();
  receipt3.merchantName = 'The Lidl shop';

  const receipts = [receipt1, receipt2, receipt3];

  expect(filterReceipts(receipts, '')).toEqual([receipt1, receipt2, receipt3]);
});

it('returns receipts filtered by merchant name, case insensitive', () => {
  const receipt1 = getDefaultFirebaseReceipt();
  receipt1.merchantName = 'Lidl';

  const receipt2 = getDefaultFirebaseReceipt();
  receipt2.merchantName = 'Billa';

  const receipt3 = getDefaultFirebaseReceipt();
  receipt3.merchantName = 'The lidl shop';

  const receipts = [receipt1, receipt2, receipt3];

  expect(filterReceipts(receipts, 'LidL')).toEqual([receipt1, receipt3]);
});

it('returns receipts filtered by merchant address, case insensitive', () => {
  const receipt1 = getDefaultFirebaseReceipt();
  receipt1.merchantAddress = 'Dornych, Brno';

  const receipt2 = getDefaultFirebaseReceipt();
  receipt2.merchantAddress = 'Brno-south';

  const receipt3 = getDefaultFirebaseReceipt();
  receipt3.merchantAddress = 'Prague 5';

  const receipts = [receipt1, receipt2, receipt3];

  expect(filterReceipts(receipts, 'brNo')).toEqual([receipt1, receipt2]);
});

it('returns receipts filtered by item name, case insensitive', () => {
  const receipt1 = getDefaultFirebaseReceipt();
  const item1 = getDefaultItem();
  item1.name = 'PIZZA pepperoni';
  receipt1.items = [item1];

  const receipt2 = getDefaultFirebaseReceipt();
  receipt2.merchantAddress = 'Brno-south';
  const item2 = getDefaultItem();
  item2.name = 'carrot';
  const item3 = getDefaultItem();
  item3.name = 'very good pizza';
  receipt2.items = [item2, item3];

  const receipt3 = getDefaultFirebaseReceipt();
  receipt3.merchantAddress = 'Prague 5';

  const receipts = [receipt1, receipt2, receipt3];

  expect(filterReceipts(receipts, 'piZza')).toEqual([receipt1, receipt2]);
});
