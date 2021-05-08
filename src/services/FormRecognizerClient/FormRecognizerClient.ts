import base64ToArrayBuffer from 'base64-arraybuffer';
import axios from 'axios';
import { Alert } from 'react-native';
import { MyImage } from '../../components/Camera/Camera';

export class Poller {
  private readonly pollUrl: string;
  private readonly apiKey: string;
  private readonly pollInterval: number;

  constructor(pollUrl: string, apiKey: string, pollInterval: number = 2500) {
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
        console.log(`Status: ${status}`);
        if (status === 'succeeded' || status === 'failed') {
          return response.data;
        }
        await this.sleep(this.pollInterval);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export class FormRecognizerClient {
  endpoint: string;
  apiKey: string;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async beginRecognizeContent(image: MyImage): Promise<Poller | undefined> {
    try {
      if (image.data) {
        const binaryImageData = base64ToArrayBuffer.decode(image.data);
        const response = await axios.post(this.endpoint, binaryImageData, {
          headers: {
            'Content-Type': image.mime,
            'Ocp-Apim-Subscription-Key': this.apiKey,
          },
        });
        return new Poller(response.headers['operation-location'], this.apiKey);
      }
      Alert.alert('Image does not contain base64 data.');
    } catch (error) {
      console.error(error);
    }
  }
}

export type AnalyzeReceiptStatus =
  | 'notStarted'
  | 'running'
  | 'failed'
  | 'succeeded';

type FieldBasics = {
  text: string;
  boundingBox: [number, number, number, number, number, number, number, number];
  page: number;
  confidence: number;
};

type Item = {
  type: 'object';
  valueObject: {
    Name?: {
      type: 'string';
      valueString?: string;
    } & FieldBasics;
    Quantity?: {
      type: 'number';
      valueNumber?: number;
    } & FieldBasics;
    Price?: {
      type: 'number';
      valueNumber?: number;
    } & FieldBasics;
    TotalPrice?: {
      type: 'number';
      valueNumber?: number;
    } & FieldBasics;
  };
};

export type Fields = {
  ReceiptType?: {
    type: 'string';
    valueString?: string;
    confidence: number;
  };
  MerchantName?: {
    type: 'string';
    valueString?: string;
  } & FieldBasics;
  MerchantPhoneNumber?: {
    type: 'phoneNumber';
    valuePhoneNumber?: string;
  } & FieldBasics;
  MerchantAddress?: {
    type: 'string';
    valueString?: string;
  } & FieldBasics;
  TransactionDate?: {
    type: 'date';
    valueDate?: string;
  } & FieldBasics;
  TransactionTime?: {
    type: 'time';
    valueTime?: string;
  } & FieldBasics;
  Total?: {
    type: 'number';
    valueNumber?: number;
  } & FieldBasics;
  Subtotal?: {
    type: 'number';
    valueNumber?: number;
  } & FieldBasics;
  Tax?: {
    type: 'number';
    valueNumber?: number;
  } & FieldBasics;
  Tip?: {
    type: 'number';
    valueNumber?: number;
  } & FieldBasics;
  Items?: {
    type: 'array';
    valueArray?: Item[];
  };
};

export type ReceiptResponse = {
  status: AnalyzeReceiptStatus;
  createdDateTime: string;
  lastUpdatedDateTime: string;
  analyzeResult: {
    version: string;
    readResults: [
      {
        page: 1;
        angle: number;
        width: number;
        height: number;
        unit: 'pixel';
        language?: string;
      },
    ];
    documentResults: [
      {
        docType: string;
        pageRange: [number, number];
        fields: Fields;
      },
    ];
  };
};
