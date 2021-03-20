import { Fields, ReceiptResponse } from './FormRecognizerClient';
import convertReceiptResponseToReceiptData, {
  ReceiptData,
} from './convertReceiptResponseToReceiptData';
import { getTodaysDateAtNoon } from '../../global/utils';
import uuid from 'uuid';

jest.mock('uuid', () => {
  const v4 = jest.fn();
  return {
    v4,
  };
});

beforeEach(() => {
  let value = 0;
  uuid.v4.mockImplementation(() => `${value++}`);
});

const getTestResponseWithFields = (fields: Fields): ReceiptResponse => {
  return {
    status: 'succeeded',
    createdDateTime: '2021-03-14T11:34:28Z',
    lastUpdatedDateTime: '2021-03-14T11:34:30Z',
    analyzeResult: {
      version: '2.0.0',
      readResults: [
        {
          page: 1,
          angle: 0,
          width: 960,
          height: 1280,
          unit: 'pixel',
          language: 'en',
        },
      ],
      documentResults: [
        {
          docType: 'prebuilt:receipt',
          pageRange: [1, 1],
          fields,
        },
      ],
    },
  };
};

it('converts response that does not contain any fields and uses default values instead', () => {
  const emptyResponse: ReceiptResponse = {
    status: 'succeeded',
    createdDateTime: '2021-03-14T11:34:28Z',
    lastUpdatedDateTime: '2021-03-14T11:34:30Z',
    analyzeResult: {
      version: '2.0.0',
      readResults: [
        {
          page: 1,
          angle: 0,
          width: 960,
          height: 1280,
          unit: 'pixel',
          language: 'en',
        },
      ],
      documentResults: [
        {
          docType: 'prebuilt:receipt',
          pageRange: [1, 1],
          fields: {},
        },
      ],
    },
  };

  const expected: ReceiptData = {
    merchantName: '',
    merchantPhoneNumber: '',
    merchantAddress: '',
    transactionDate: getTodaysDateAtNoon(),
    total: 0,
    subtotal: 0,
    tax: 0,
    tip: 0,
    currency: '',
    items: [],
  };

  expect(convertReceiptResponseToReceiptData(emptyResponse)).toEqual(expected);
});

it('converts response with fields', () => {
  const response: ReceiptResponse = {
    status: 'succeeded',
    createdDateTime: '2021-03-14T11:38:23Z',
    lastUpdatedDateTime: '2021-03-14T11:38:27Z',
    analyzeResult: {
      version: '2.0.0',
      readResults: [
        {
          page: 1,
          angle: 0,
          width: 389,
          height: 1024,
          unit: 'pixel',
          language: 'en',
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
              confidence: 0.977,
            },
            MerchantAddress: {
              type: 'string',
              valueString: '67 Merchants Row Suite 301 Rutland VT 05701',
              text: '67 Merchants Row Suite 301 Rutland VT 05701',
              boundingBox: [124, 64, 263, 64, 263, 117, 124, 117],
              page: 1,
              confidence: 0.674,
            },
            MerchantPhoneNumber: {
              type: 'phoneNumber',
              valuePhoneNumber: '+18025494617',
              text: '802-549-4617',
              boundingBox: [141, 120, 249, 120, 249, 136, 141, 136],
              page: 1,
              confidence: 0.99,
            },
            TransactionDate: {
              type: 'date',
              valueDate: '2020-02-10',
              text: '2/10/2020',
              boundingBox: [86, 150, 164, 150, 164, 167, 86, 167],
              page: 1,
              confidence: 0.984,
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
                      boundingBox: [22, 271, 30, 271, 30, 283, 22, 283],
                      page: 1,
                      confidence: 0.781,
                    },
                    Name: {
                      type: 'string',
                      valueString: 'back extender - 1 pack (S#',
                      text: 'back extender - 1 pack (S#',
                      boundingBox: [75, 270, 260, 270, 260, 287, 75, 287],
                      page: 1,
                      confidence: 0.725,
                    },
                    TotalPrice: {
                      type: 'number',
                      valueNumber: 6,
                      text: '$6.00',
                      boundingBox: [
                        327,
                        270.5,
                        365.2,
                        271,
                        365,
                        285,
                        326.8,
                        284.5,
                      ],
                      page: 1,
                      confidence: 0.793,
                    },
                    Price: {
                      type: 'number',
                      text: '$6.00,',
                      boundingBox: [75, 322, 119, 322, 119, 337, 75, 337],
                      page: 1,
                      confidence: 0.637,
                    },
                  },
                },
                {
                  type: 'object',
                  valueObject: {
                    Name: {
                      type: 'string',
                      valueString: 'HIONS, I# 541524,',
                      text: 'HIONS, I# 541524,',
                      boundingBox: [74, 441, 207, 441, 207, 456, 74, 456],
                      page: 1,
                      confidence: 0.377,
                    },
                    Price: {
                      type: 'number',
                      text: '$11.00,',
                      boundingBox: [
                        74,
                        457.5,
                        127.1,
                        458,
                        127,
                        473,
                        73.9,
                        472.5,
                      ],
                      page: 1,
                      confidence: 0.701,
                    },
                    TotalPrice: {
                      type: 'number',
                      valueNumber: 9,
                      text: '$9.00',
                      boundingBox: [
                        326.8,
                        475.5,
                        365,
                        475,
                        365.2,
                        489,
                        327,
                        489.5,
                      ],
                      page: 1,
                      confidence: 0.778,
                    },
                  },
                },
              ],
            },
            Subtotal: {
              type: 'number',
              valueNumber: 35,
              text: '$35.00',
              boundingBox: [313, 557, 366, 557, 366, 572, 313, 572],
              page: 1,
              confidence: 0.99,
            },
            Tax: {
              type: 'number',
              valueNumber: 1.93,
              text: '$1.93',
              boundingBox: [321.8, 575.5, 366, 575, 366.2, 592, 322, 592.5],
              page: 1,
              confidence: 0.99,
            },
            Total: {
              type: 'number',
              valueNumber: 36.93,
              text: '$36.93',
              boundingBox: [314, 604.5, 365.1, 605, 365, 620, 313.9, 619.5],
              page: 1,
              confidence: 0.825,
            },
          },
        },
      ],
    },
  };

  const expected = {
    merchantName: '',
    merchantPhoneNumber: '+18025494617',
    merchantAddress: '67 Merchants Row Suite 301 Rutland VT 05701',
    transactionDate: new Date('2020-02-10'),
    total: 36.93,
    subtotal: 35,
    tax: 1.93,
    tip: 0,
    currency: '$',
    items: [
      {
        id: '0',
        name: 'back extender - 1 pack (S#',
        quantity: 1,
        price: 6,
        totalPrice: 6,
        currency: '$',
      },
      {
        id: '1',
        name: 'HIONS, I# 541524,',
        quantity: 0,
        price: 11,
        totalPrice: 9,
        currency: '$',
      },
    ],
  };

  expect(convertReceiptResponseToReceiptData(response)).toEqual(expected);
});

it('uses MerchantName valueString if available', () => {
  const valueString = 'Contoso';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantName: {
      type: 'string',
      valueString,
      text: 'Contoso - text',
      boundingBox: [150.1, 97.9, 452.2, 120.4, 439.1, 296.5, 137, 274],
      page: 1,
      confidence: 0.669,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantName',
    valueString,
  );
});

it('uses MerchantName text if valueString not available', () => {
  const text = 'Contoso - text';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantName: {
      type: 'string',
      text,
      boundingBox: [150.1, 97.9, 452.2, 120.4, 439.1, 296.5, 137, 274],
      page: 1,
      confidence: 0.669,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantName',
    text,
  );
});

it('uses MerchantAddress valueString if available', () => {
  const valueString = '123 Main Street Redmond, WA 98052';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantAddress: {
      type: 'string',
      valueString,
      text: '123 Main Street Redmond, WA 98052 - text',
      boundingBox: [132.8, 293, 321.8, 295.1, 321, 369.1, 132, 367],
      page: 1,
      confidence: 0.994,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantAddress',
    valueString,
  );
});

it('uses MerchantAddress text if valueString not available', () => {
  const text = '123 Main Street Redmond, WA 98052 - text';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantAddress: {
      type: 'string',
      text,
      boundingBox: [132.8, 293, 321.8, 295.1, 321, 369.1, 132, 367],
      page: 1,
      confidence: 0.994,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantAddress',
    text,
  );
});

it('uses MerchantPhoneNumber valuePhoneNumber if available', () => {
  const valuePhoneNumber = '+18025494617';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantPhoneNumber: {
      type: 'phoneNumber',
      valuePhoneNumber,
      text: '802-549-4617',
      boundingBox: [141, 120, 249, 120, 249, 136, 141, 136],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantPhoneNumber',
    valuePhoneNumber,
  );
});

it('uses MerchantPhoneNumber text if valuePhoneNumber not available', () => {
  const text = '802-549-4617';
  const response: ReceiptResponse = getTestResponseWithFields({
    MerchantPhoneNumber: {
      type: 'phoneNumber',
      text,
      boundingBox: [141, 120, 249, 120, 249, 136, 141, 136],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'merchantPhoneNumber',
    text,
  );
});

it('uses TransactionDate valueDate if available', () => {
  const valueDate = '2019-06-10';
  const response: ReceiptResponse = getTestResponseWithFields({
    TransactionDate: {
      type: 'date',
      valueDate,
      text: '6/10/2019',
      boundingBox: [128, 520, 210, 521, 210, 551, 128, 550],
      page: 1,
      confidence: 0.995,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'transactionDate',
    new Date(valueDate),
  );
});

it('uses TransactionDate text if valueDate not available', () => {
  const text = '6/10/2019';
  const response: ReceiptResponse = getTestResponseWithFields({
    TransactionDate: {
      type: 'date',
      text,
      boundingBox: [128, 520, 210, 521, 210, 551, 128, 550],
      page: 1,
      confidence: 0.995,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'transactionDate',
    new Date(text),
  );
});

it('uses Total valueNumber if available', () => {
  const valueNumber = 36.93;
  const response: ReceiptResponse = getTestResponseWithFields({
    Total: {
      type: 'number',
      valueNumber: 36.93,
      text: '$36.93',
      boundingBox: [314, 604.5, 365.1, 605, 365, 620, 313.9, 619.5],
      page: 1,
      confidence: 0.825,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'total',
    valueNumber,
  );
});

it('parses Total text if valueNumber not available', () => {
  const text = '$36.93';
  const response: ReceiptResponse = getTestResponseWithFields({
    Total: {
      type: 'number',
      text,
      boundingBox: [314, 604.5, 365.1, 605, 365, 620, 313.9, 619.5],
      page: 1,
      confidence: 0.825,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'total',
    36.93,
  );
});

it('uses Subtotal valueNumber if available', () => {
  const valueNumber = 35.25;
  const response: ReceiptResponse = getTestResponseWithFields({
    Subtotal: {
      type: 'number',
      valueNumber,
      text: '$35.25',
      boundingBox: [313, 557, 366, 557, 366, 572, 313, 572],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'subtotal',
    valueNumber,
  );
});

it('parses Subtotal text if valueNumber not available', () => {
  const text = '$35.25';
  const response: ReceiptResponse = getTestResponseWithFields({
    Subtotal: {
      type: 'number',
      text,
      boundingBox: [313, 557, 366, 557, 366, 572, 313, 572],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'subtotal',
    35.25,
  );
});

it('uses Tax valueNumber if available', () => {
  const valueNumber = 1.93;
  const response: ReceiptResponse = getTestResponseWithFields({
    Tax: {
      type: 'number',
      valueNumber,
      text: '$1.93',
      boundingBox: [321.8, 575.5, 366, 575, 366.2, 592, 322, 592.5],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'tax',
    valueNumber,
  );
});

it('parses Tax text if valueNumber not available', () => {
  const text = '$1.93';
  const response: ReceiptResponse = getTestResponseWithFields({
    Tax: {
      type: 'number',
      text,
      boundingBox: [321.8, 575.5, 366, 575, 366.2, 592, 322, 592.5],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'tax',
    1.93,
  );
});

it('uses Tip valueNumber if available', () => {
  const valueNumber = 1.93;
  const response: ReceiptResponse = getTestResponseWithFields({
    Tip: {
      type: 'number',
      valueNumber,
      text: '$1.93',
      boundingBox: [321.8, 575.5, 366, 575, 366.2, 592, 322, 592.5],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'tip',
    valueNumber,
  );
});

it('parses Tip text if valueNumber not available', () => {
  const text = '$1.93';
  const response: ReceiptResponse = getTestResponseWithFields({
    Tip: {
      type: 'number',
      text,
      boundingBox: [321.8, 575.5, 366, 575, 366.2, 592, 322, 592.5],
      page: 1,
      confidence: 0.99,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'tip',
    1.93,
  );
});

it("parses receipt's currency from Total", () => {
  const response: ReceiptResponse = getTestResponseWithFields({
    Total: {
      type: 'number',
      valueNumber: 36.93,
      text: '$36.93',
      boundingBox: [314, 604.5, 365.1, 605, 365, 620, 313.9, 619.5],
      page: 1,
      confidence: 0.825,
    },
  });

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'currency',
    '$',
  );
});

it("uses default values of Item's fields", () => {
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {},
        },
      ],
    },
  });

  const expected = [
    {
      id: '0',
      currency: '',
      name: '',
      price: 0,
      quantity: 0,
      totalPrice: 0,
    },
  ];

  expect(convertReceiptResponseToReceiptData(response)).toHaveProperty(
    'items',
    expected,
  );
});

it('uses Name valueString if available', () => {
  const valueString = 'Surface Pro 6';
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Name: {
              type: 'string',
              valueString: 'Surface Pro 6',
              text: 'Surface Pro 6 - text',
              boundingBox: [154, 664, 289, 664, 289, 691, 154, 691],
              page: 1,
              confidence: 0.956,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'name',
    valueString,
  );
});

it('uses Name text when valueString not available', () => {
  const text = 'Surface Pro 6 - text';
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Name: {
              type: 'string',
              text,
              boundingBox: [154, 664, 289, 664, 289, 691, 154, 691],
              page: 1,
              confidence: 0.956,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'name',
    text,
  );
});

it('uses Quantity valueNumber if available', () => {
  const valueNumber = 1;
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Quantity: {
              type: 'number',
              valueNumber,
              text: '1 - text',
              boundingBox: [140, 664, 149, 664, 149, 691, 140, 691],
              page: 1,
              confidence: 0.922,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'quantity',
    valueNumber,
  );
});

it('uses default value is Quantity valueNumber not available', () => {
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Quantity: {
              type: 'number',
              text: '1 - text',
              boundingBox: [140, 664, 149, 664, 149, 691, 140, 691],
              page: 1,
              confidence: 0.922,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'quantity',
    0,
  );
});

it('uses Price valueNumber if available', () => {
  const valueNumber = 6;
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Price: {
              type: 'number',
              valueNumber,
              text: '$6.00,',
              boundingBox: [75, 322, 119, 322, 119, 337, 75, 337],
              page: 1,
              confidence: 0.637,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'price',
    valueNumber,
  );
});

it('parses Price text if valueNumber not available', () => {
  const text = '$6.00';
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Price: {
              type: 'number',
              text,
              boundingBox: [75, 322, 119, 322, 119, 337, 75, 337],
              page: 1,
              confidence: 0.637,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'price',
    6,
  );
});

it('uses TotalPrice valueNumber if available', () => {
  const valueNumber = 999;
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            TotalPrice: {
              type: 'number',
              valueNumber,
              text: '$999.00',
              boundingBox: [398, 762.7, 482, 764.5, 481.4, 791.8, 397.4, 790],
              page: 1,
              confidence: 0.984,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'totalPrice',
    valueNumber,
  );
});

it('parses TotalPrice text if valueNumber not available', () => {
  const text = '$999.00';
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            TotalPrice: {
              type: 'number',
              text,
              boundingBox: [398, 762.7, 482, 764.5, 481.4, 791.8, 397.4, 790],
              page: 1,
              confidence: 0.984,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'totalPrice',
    999,
  );
});

it("parses item's currency from TotalPrice", () => {
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            TotalPrice: {
              type: 'number',
              valueNumber: 999,
              text: '$999.00',
              boundingBox: [398, 762.7, 482, 764.5, 481.4, 791.8, 397.4, 790],
              page: 1,
              confidence: 0.984,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'currency',
    '$',
  );
});

it('parses currency from Price', () => {
  const response: ReceiptResponse = getTestResponseWithFields({
    Items: {
      type: 'array',
      valueArray: [
        {
          type: 'object',
          valueObject: {
            Price: {
              type: 'number',
              text: '$6.00,',
              boundingBox: [75, 322, 119, 322, 119, 337, 75, 337],
              page: 1,
              confidence: 0.637,
            },
          },
        },
      ],
    },
  });

  expect(convertReceiptResponseToReceiptData(response).items[0]).toHaveProperty(
    'currency',
    '$',
  );
});
