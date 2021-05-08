import { firestoreInstance, storageInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';
import { FirebaseReceipt } from '../../components/ReceiptsList/ReceiptsList';

const deleteReceipt = async (userId: string, receipt: FirebaseReceipt) => {
  try {
    // delete images that are inside receipt
    storageInstance
      .refFromURL(receipt.urlOriginal)
      .delete()
      .then(() => console.log('Receipt original photo deleted!'));

    storageInstance
      .refFromURL(receipt.urlProcessed)
      .delete()
      .then(() => console.log('Receipt processed photo deleted!'));

    // delete the receipt itself
    firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receipt.id)
      .delete()
      .then(() => console.log('Receipt deleted!'));
  } catch (error) {
    console.error(error);
  }
};

export default deleteReceipt;
