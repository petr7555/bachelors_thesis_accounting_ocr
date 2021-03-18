import { firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const getReceiptForUser = (userId: string, receiptId: string) =>
  firestoreInstance
    .collection(USERS)
    .doc(userId)
    .collection(RECEIPTS)
    .doc(receiptId);

export default getReceiptForUser;
