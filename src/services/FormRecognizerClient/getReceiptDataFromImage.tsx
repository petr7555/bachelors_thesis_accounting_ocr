import { Image } from 'react-native-image-crop-picker';
import { FormRecognizerClient } from './FormRecognizerClient';

export const getReceiptDataFromImage = async (
  image: Image,
): Promise<ReceiptData | undefined> => {
  const endpoint = 'westeurope.api.cognitive.microsoft.com';
  const apiKey = 'f100cd7fa2ed413697fb5f2f0a87524f';

  const client = new FormRecognizerClient(endpoint, apiKey);
  const poller = await client.beginRecognizeContent(image);
  if (poller) {
    const response = await poller.pollUntilDone();
    console.log(JSON.stringify(response, null, 2));
    return response;
  }
};
