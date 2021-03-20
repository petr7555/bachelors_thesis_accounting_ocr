import { Item } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const updateItems = async (
  userId: string,
  receiptId: string,
  items: Item[],
) => {
  console.log(items);
  try {
    await firestoreInstance
      .collection(USERS)
      .doc(userId)
      .collection(RECEIPTS)
      .doc(receiptId)
      .update({ items });
    console.log('Items updated!');
  } catch (error) {
    console.error(error);
  }
};

export default updateItems;
