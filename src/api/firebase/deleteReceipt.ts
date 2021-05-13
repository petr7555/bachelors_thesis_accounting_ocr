import { firestoreInstance, storageInstance } from '../../global/firebase';
import { RECEIPTS_FIRESTORE, USERS_FIRESTORE } from '../../global/constants';
import { FirebaseReceipt } from '../../components/ReceiptsList/ReceiptsList';
import { LOG } from '../../logger';

const deleteReceipt = async (userId: string, receipt: FirebaseReceipt) => {
  try {
    // delete images that are inside receipt
    storageInstance
      .refFromURL(receipt.urlOriginal)
      .delete()
      .then(() => LOG.info('Receipt original photo deleted!'));

    storageInstance
      .refFromURL(receipt.urlProcessed)
      .delete()
      .then(() => LOG.info('Receipt processed photo deleted!'));

    // delete the receipt itself
    firestoreInstance
      .collection(USERS_FIRESTORE)
      .doc(userId)
      .collection(RECEIPTS_FIRESTORE)
      .doc(receipt.id)
      .delete()
      .then(() => LOG.info('Receipt deleted!'));
  } catch (error) {
    LOG.error(error);
  }
};

export default deleteReceipt;
