import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from './constants';

const updateReceipt = async (
  userId: string,
  receiptId: string,
  receiptData: ReceiptData,
) => {
  try {
    await firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receiptId)
      .update(receiptData);
    console.log('Receipt updated!');
  } catch (error) {
    console.error(error);
  }
};

export default updateReceipt;
