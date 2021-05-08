import * as React from 'react';
import { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authInstance } from '../../global/firebase';
import getAllReceiptsForUser from '../../api/firebase/getAllReceiptsForUser';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import RNFS from 'react-native-fs';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseReceipt } from '../ReceiptsList/ReceiptsList';
import { useToast } from 'react-native-fast-toast';
import ToastIcon from '../ToastIcon/ToastIcon';
import { requestStorageWritePermission } from '../../global/permissions';
import { RESULTS } from 'react-native-permissions';
import moment from 'moment';
import { Alert } from 'react-native';
import { ButtonProps } from 'react-native-elements';

const ExportButton = ({ containerStyle, ...props }: ButtonProps) => {
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
    try {
      const storagePermissionResult = await requestStorageWritePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        const directory = `${
          RNFS.DownloadDirectoryPath
        }/receipts_export_${moment().format('YYYY-MM-DD-hh-mm-ss')}`;

        await RNFS.mkdir(directory);

        const allDataPromise = RNFS.mkdir(directory).then(() =>
          RNFS.writeFile(
            `${directory}/data.json`,
            JSON.stringify(receipts, null, 2),
            'utf8',
          ),
        );

        const items = receipts.flatMap((receipt) =>
          receipt.items.map((item) => item.name),
        );

        const itemsPromise = RNFS.mkdir(directory).then(() =>
          RNFS.writeFile(
            `${directory}/items.json`,
            JSON.stringify(items, null, 2),
            'utf8',
          ),
        );

        const urlsOriginal = receipts.map((receipt) => receipt.urlOriginal);
        const urlsProcessed = receipts.map((receipt) => receipt.urlProcessed);

        await RNFS.mkdir(directory);

        const originalImagesDirectory = `${directory}/original`;

        const urlsOriginalPromises = RNFS.mkdir(originalImagesDirectory).then(
          () =>
            urlsOriginal.map((url, index) =>
              RNFS.downloadFile({
                fromUrl: url,
                toFile: `${originalImagesDirectory}/${index}.jpg`,
              }),
            ),
        );

        const processedImagesDirectory = `${directory}/processed`;

        const urlsProcessedPromises = RNFS.mkdir(processedImagesDirectory).then(
          () =>
            urlsProcessed.map((url, index) =>
              RNFS.downloadFile({
                fromUrl: url,
                toFile: `${processedImagesDirectory}/${index}.jpg`,
              }),
            ),
        );

        await allDataPromise;
        await itemsPromise;
        await urlsOriginalPromises;
        await urlsProcessedPromises;

        showExportedToast(directory);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Receipts export failed');
    }
  };

  return (
    <PrimaryButton
      onPress={exportReceipts}
      title="Export receipts"
      containerStyle={containerStyle}
      {...props}
    />
  );
};

export default ExportButton;
