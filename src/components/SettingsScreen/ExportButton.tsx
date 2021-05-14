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
import combine from '../../global/utils/combine';
import { isWindows } from '../../global/utils/platform';
import { LOG } from '../../services/Logger/logger';

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
          // longer timeout on Windows because the path is long
          duration: isWindows ? 25000 : 8000,
        },
      );
    },
    [receipts.length, toast],
  );

  const exportReceipts = async () => {
    try {
      const storagePermissionResult = await requestStorageWritePermission();
      if (storagePermissionResult === RESULTS.GRANTED) {
        // on Windows, permissions do not allow to access Download directory
        const mainDir = isWindows
          ? RNFS.DocumentDirectoryPath
          : RNFS.DownloadDirectoryPath;
        const directory = combine(
          mainDir,
          `receipts_export_${moment().format('YYYY-MM-DD-hh-mm-ss')}`,
        );

        await RNFS.mkdir(directory);

        const allDataPromise = RNFS.writeFile(
          combine(directory, 'data.json'),
          JSON.stringify(receipts, null, 2),
          'utf8',
        );

        const items = receipts.flatMap((receipt) =>
          receipt.items.map((item) => item.name),
        );
        const itemsPromise = RNFS.writeFile(
          combine(directory, 'items.json'),
          JSON.stringify(items, null, 2),
          'utf8',
        );

        const downloadImages = async (urls: string[], outputDir: string) => {
          return RNFS.mkdir(outputDir).then(() =>
            urls.map((url, index) =>
              RNFS.downloadFile({
                fromUrl: url,
                toFile: combine(outputDir, `${index}.jpg`),
              }),
            ),
          );
        };

        const urlsOriginal = receipts.map((receipt) => receipt.urlOriginal);
        const urlsOriginalPromises = downloadImages(
          urlsOriginal,
          combine(directory, 'original'),
        );

        const urlsProcessed = receipts.map((receipt) => receipt.urlProcessed);
        const urlsProcessedPromises = downloadImages(
          urlsProcessed,
          combine(directory, 'processed'),
        );

        await allDataPromise;
        await itemsPromise;
        await urlsOriginalPromises;
        await urlsProcessedPromises;

        showExportedToast(directory);
      }
      throw Error('some error');
    } catch (error) {
      LOG.error(error);
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
