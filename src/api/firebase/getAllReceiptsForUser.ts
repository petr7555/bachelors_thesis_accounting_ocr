import { firestoreInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';

const getAllReceiptsForUser = (userId: string | undefined) =>
  firestoreInstance
    .collection(USERS_FIRESTORE)
    .doc(userId)
    .collection(RECEIPTS_FIRESTORE)
    .orderBy('added', 'desc');

export default getAllReceiptsForUser;
