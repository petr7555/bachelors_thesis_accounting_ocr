import { firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const deleteReceipt = async (userId: string, receiptId: string) => {
  try {
    await firestoreInstance
      .collection(USERS)
      .doc(userId)
      .collection(RECEIPTS)
      .doc(receiptId)
      .delete();
    console.log('Receipt deleted!');
  } catch (error) {
    console.error(error);
  }
};

export default deleteReceipt;
