import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';
import { LOG } from '../../logger';

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
      .then(() => LOG.info('Items updated!'));
  } catch (error) {
    LOG.error(error);
  }
};

export default updateItems;
