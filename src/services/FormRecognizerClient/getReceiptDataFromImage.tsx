import { FormRecognizerClient } from './FormRecognizerClient';
import convertReceiptResponseToReceiptData, {
  ReceiptData,
} from './convertReceiptResponseToReceiptData';
import { MyImage } from '../../components/Camera/Camera';
import {
  FORM_RECOGNIZER_API_KEY,
  FORM_RECOGNIZER_ENDPOINT,
} from '../../global/constants';

export const getReceiptDataFromImage = async (
  image: MyImage,
): Promise<ReceiptData | undefined> => {
  const client = new FormRecognizerClient(
    FORM_RECOGNIZER_ENDPOINT,
    FORM_RECOGNIZER_API_KEY,
  );
  const poller = await client.beginRecognizeContent(image);
  if (poller) {
    const response = await poller.pollUntilDone();
    console.log(JSON.stringify(response, null, 2));
    return convertReceiptResponseToReceiptData(response);
  }
};
