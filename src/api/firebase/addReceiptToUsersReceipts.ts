import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import {
  authInstance,
  firestore,
  firestoreInstance,
} from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';
import { LOG } from '../../services/Logger/logger';

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
      LOG.info('Receipt added!');
      return result.id;
    } catch (error) {
      LOG.error(error);
    }
  }
};

export default addReceiptToUsersReceipts;
