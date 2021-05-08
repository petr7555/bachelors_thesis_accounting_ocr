import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';

const updateItems = async (
  userId: string,
  receiptId: string,
  items: Item[],
) => {
  try {
    return firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receiptId)
      .update({ items })
      .then(() => console.log('Items updated!'));
  } catch (error) {
    console.error(error);
  }
};

export default updateItems;
