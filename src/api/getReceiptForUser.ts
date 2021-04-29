import { firestoreInstance } from '../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../global/constants';

const getReceiptForUser = (userId: string, receiptId: string) =>
  firestoreInstance
    .collection(USERS_FIRESTORE)
    .doc(userId)
    .collection(RECEIPTS_FIRESTORE)
    .doc(receiptId);

export default getReceiptForUser;
