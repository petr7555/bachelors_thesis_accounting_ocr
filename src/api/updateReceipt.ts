import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const updateReceipt = async (
  userId: string,
  receiptId: string,
  receiptData: ReceiptData,
) => {
  try {
    await firestoreInstance
      .collection(USERS)
      .doc(userId)
      .collection(RECEIPTS)
      .doc(receiptId)
      .update(receiptData);
    console.log('Receipt updated!');
  } catch (error) {
    console.error(error);
  }
};

export default updateReceipt;
