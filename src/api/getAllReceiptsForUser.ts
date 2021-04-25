import { firestoreInstance } from '../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from './constants';

const getAllReceiptsForUser = (userId: string) =>
  firestoreInstance
    .collection(USERS_FIRESTORE)
    .doc(userId)
    .collection(RECEIPTS_FIRESTORE);

export default getAllReceiptsForUser;
