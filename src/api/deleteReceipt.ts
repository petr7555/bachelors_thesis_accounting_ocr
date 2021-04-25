import { firestoreInstance } from '../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from './constants';

const deleteReceipt = async (userId: string, receiptId: string) => {
  try {
    await firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receiptId)
      .delete();
    console.log('Receipt deleted!');
  } catch (error) {
    console.error(error);
  }
};

export default deleteReceipt;
