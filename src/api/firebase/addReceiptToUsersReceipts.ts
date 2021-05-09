import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import {
  authInstance,
  firestore,
  firestoreInstance,
} from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';

const addReceiptToUsersReceipts = async (
  urlOriginal: string,
  urlProcessed: string,
  receiptData: ReceiptData,
): Promise<string | undefined> => {
  const user = authInstance.currentUser;
  if (user) {
    try {
      const result = await firestoreInstance
        .collection(USERS_FIRESTORE)
        .doc(user.uid)
        .collection(RECEIPTS_FIRESTORE)
        .add({
          urlOriginal,
          urlProcessed,
          // @ts-ignore
          added: firestore.Timestamp.now(),
          ...receiptData,
        });
      console.log('Receipt added!');
      return result.id;
    } catch (error) {
      console.error(error);
    }
  }
};

export default addReceiptToUsersReceipts;
