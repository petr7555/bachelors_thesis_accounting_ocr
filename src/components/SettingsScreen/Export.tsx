import * as React from 'react';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import getAllReceiptsForUser from '../../api/getAllReceiptsForUser';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import RNFS from 'react-native-fs';
import { ButtonProps } from 'react-native-elements/dist/buttons/Button';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseReceipt } from '../ReceiptsList/ReceiptsList';
import { useToast } from 'react-native-fast-toast';
import ToastIcon from '../ToastIcon/ToastIcon';
import { requestStorageWritePermission } from '../../global/permissions';
import { RESULTS } from 'react-native-permissions';
import moment from 'moment';

const Export = (props: ButtonProps | null) => {
  const [user] = useAuthState(authInstance);
  const [receipts = []] = useCollectionData<FirebaseReceipt>(
    getAllReceiptsForUser(user?.uid),
    {
      idField: 'id',
    },
  );

  const toast = useToast();
  const showExportedToast = useCallback(
    (path) => {
      toast?.show(
        `${receipts.length} receipts have been exported to ${path}.`,
        {
          type: 'success',
          successIcon: <ToastIcon name="checkmark" />,
          duration: 8000,
        },
      );
    },
    [receipts.length, toast],
  );

  const exportReceipts = async () => {
    const path = `${
      RNFS.DownloadDirectoryPath
    }/receipts_export_${moment().format('YYYY-MM-DD-hh-mm-ss')}.json`;

    const storagePermissionResult = await requestStorageWritePermission();
    if (storagePermissionResult === RESULTS.GRANTED) {
      RNFS.writeFile(path, JSON.stringify(receipts, null, 2), 'utf8')
        .then(() => {
          showExportedToast(path);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  return (
    <PrimaryButton
      onPress={exportReceipts}
      title="Export receipts"
      {...props}
    />
  );
};

export default Export;
