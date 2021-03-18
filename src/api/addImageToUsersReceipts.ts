import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { authInstance, firestore, firestoreInstance } from '../global/firebase';
import { RECEIPTS, USERS } from './constants';

const addImageToUsersReceipts = async (
  downloadURL: string,
  receiptData: ReceiptData,
): Promise<string | undefined> => {
  const user = authInstance.currentUser;
  if (user != null) {
    try {
      const result = await firestoreInstance
        .collection(USERS)
        .doc(user.uid)
        .collection(RECEIPTS)
        .add({
          url: downloadURL,
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

export default addImageToUsersReceipts;
