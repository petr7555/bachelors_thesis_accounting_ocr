import { Image } from 'react-native-image-crop-picker';
import base64ToArrayBuffer from 'base64-arraybuffer';
import axios from 'axios';
import { Alert } from 'react-native';

type AnalyzeReceiptStatus = 'notStarted' | 'running' | 'failed' | 'succeeded';

class Poller {
  private readonly pollUrl: string;
  private readonly apiKey: string;
  private readonly pollInterval: number;

  constructor(pollUrl: string, apiKey: string, pollInterval: number = 1000) {
    this.pollUrl = pollUrl;
    this.apiKey = apiKey;
    this.pollInterval = pollInterval;
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async pollUntilDone() {
    try {
      while (true) {
        const response = await axios.get(this.pollUrl, {
          headers: {
            'Ocp-Apim-Subscription-Key': this.apiKey,
          },
        });
        const status: AnalyzeReceiptStatus = response.data.status;
        console.log(status);
        if (status === 'succeeded' || status === 'failed') {
          return response.data;
        }
        await this.sleep(this.pollInterval);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

class FormRecognizerClient {
  endpoint: string;
  apiKey: string;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async beginRecognizeContent(image: Image) {
    try {
      if (image.data) {
        const base64Data = base64ToArrayBuffer.decode(image.data);
        const requestUrl = `https://${this.endpoint}/formrecognizer/v2.0/prebuilt/receipt/analyze`;
        const response = await axios.post(requestUrl, base64Data, {
          headers: {
            'Content-Type': image.mime,
            'Ocp-Apim-Subscription-Key': this.apiKey,
          },
        });
        return new Poller(response.headers['operation-location'], this.apiKey);
      }
      Alert.alert('Image does not contain base64 data.');
    } catch (e) {
      console.error(e);
    }
  }
}

export const getFormDataFromImage = async (image: Image) => {
  const endpoint = 'westeurope.api.cognitive.microsoft.com';
  const apiKey = 'f100cd7fa2ed413697fb5f2f0a87524f';

  const client = new FormRecognizerClient(endpoint, apiKey);
  const poller = await client.beginRecognizeContent(image);
  const receipts = await poller.pollUntilDone();
  console.log(JSON.stringify(receipts, null, 2));
  return receipts;
};
