import { ReceiptResponse } from './FormRecognizerClient';

const response: ReceiptResponse = {
  status: 'succeeded',
  createdDateTime: '2020-05-13T07:29:49Z',
  lastUpdatedDateTime: '2020-05-13T07:29:57Z',
  analyzeResult: {
    version: '2.1.0',
    readResults: [
      {
        page: 1,
        angle: 0.2816,
        width: 600,
        height: 1172,
        unit: 'pixel',
      },
    ],
    documentResults: [
      {
        docType: 'prebuilt:receipt',
        pageRange: [1, 1],
        fields: {
          ReceiptType: {
            type: 'string',
            valueString: 'Itemized',
            confidence: 0.878,
          },
          MerchantName: {
            type: 'string',
            valueString: 'Contoso',
            text: 'Contoso',
            boundingBox: [150.1, 97.9, 452.2, 120.4, 439.1, 296.5, 137, 274],
            page: 1,
            confidence: 0.669,
          },
          MerchantAddress: {
            type: 'string',
            valueString: '123 Main Street Redmond, WA 98052',
            text: '123 Main Street Redmond, WA 98052',
            boundingBox: [132.8, 293, 321.8, 295.1, 321, 369.1, 132, 367],
            page: 1,
            confidence: 0.994,
          },
          MerchantPhoneNumber: {
            type: 'phoneNumber',
            text: '123-456-7890',
            boundingBox: [129, 427, 263, 429, 262, 456, 128, 454],
            page: 1,
            confidence: 0.995,
          },
          TransactionDate: {
            type: 'date',
            valueDate: '2019-06-10',
            text: '6/10/2019',
            boundingBox: [128, 520, 210, 521, 210, 551, 128, 550],
            page: 1,
            confidence: 0.995,
          },
          TransactionTime: {
            type: 'time',
            valueTime: '13:59:00',
            text: '13:59',
            boundingBox: [216, 521, 269, 521, 269, 550, 216, 551],
            page: 1,
            confidence: 0.995,
          },
          Items: {
            type: 'array',
            valueArray: [
              {
                type: 'object',
                valueObject: {
                  Quantity: {
                    type: 'number',
                    valueNumber: 1,
                    text: '1',
                    boundingBox: [140, 664, 149, 664, 149, 691, 140, 691],
                    page: 1,
                    confidence: 0.922,
                  },
                  Name: {
                    type: 'string',
                    valueString: 'Surface Pro 6',
                    text: 'Surface Pro 6',
                    boundingBox: [154, 664, 289, 664, 289, 691, 154, 691],
                    page: 1,
                    confidence: 0.956,
                  },
                  TotalPrice: {
                    type: 'number',
                    valueNumber: 999,
                    text: '$999.00',
                    boundingBox: [
                      398,
                      762.7,
                      482,
                      764.5,
                      481.4,
                      791.8,
                      397.4,
                      790,
                    ],
                    page: 1,
                    confidence: 0.984,
                  },
                },
              },
            ],
          },
          Subtotal: {
            type: 'number',
            valueNumber: 1098.99,
            text: '1098.99',
            boundingBox: [407, 962, 483, 960, 484, 987, 408, 989],
            page: 1,
            confidence: 0.987,
          },
          Total: {
            type: 'number',
            valueNumber: 1203.39,
            text: '1203.39',
            boundingBox: [404, 1105, 479, 1112, 476, 1139, 402, 1132],
            page: 1,
            confidence: 0.959,
          },
          Tax: {
            type: 'number',
            valueNumber: 104.4,
            text: '$104.40',
            boundingBox: [415, 1010, 484, 1009, 483, 1036, 417, 1038],
            page: 1,
            confidence: 0.615,
          },
        },
      },
    ],
  },
};
