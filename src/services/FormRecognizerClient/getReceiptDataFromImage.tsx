import { FormRecognizerClient } from './FormRecognizerClient';
import convertReceiptResponseToReceiptData, {
  ReceiptData,
} from './convertReceiptResponseToReceiptData';
import { MyImage } from '../../components/CameraScreen/CameraScreen';

export const getReceiptDataFromImage = async (
  image: MyImage,
): Promise<ReceiptData | undefined> => {
  const endpoint = 'westeurope.api.cognitive.microsoft.com';
  const apiKey = 'f100cd7fa2ed413697fb5f2f0a87524f';

  const client = new FormRecognizerClient(endpoint, apiKey);
  const poller = await client.beginRecognizeContent(image);
  if (poller) {
    const response = await poller.pollUntilDone();
    console.log(JSON.stringify(response, null, 2));
    return convertReceiptResponseToReceiptData(response);
  }
};
