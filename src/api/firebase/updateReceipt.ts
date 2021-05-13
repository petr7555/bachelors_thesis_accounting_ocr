import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';
import { LOG } from '../../services/Logger/logger';

const updateReceipt = async (
  userId: string,
  receiptId: string,
  receiptData: ReceiptData,
) => {
  try {
    return firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receiptId)
      .update(receiptData)
      .then(() => LOG.info('Receipt updated!'));
  } catch (error) {
    LOG.error(error);
  }
};

export default updateReceipt;
