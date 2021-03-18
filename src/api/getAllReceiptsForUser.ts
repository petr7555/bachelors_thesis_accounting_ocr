import { firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const getAllReceiptsForUser = (userId: string) =>
  firestoreInstance.collection(USERS).doc(userId).collection(RECEIPTS);

export default getAllReceiptsForUser;
