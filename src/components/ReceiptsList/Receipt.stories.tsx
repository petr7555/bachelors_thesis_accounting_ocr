import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Receipt from './Receipt';
import { FirebaseReceipt } from './ReceiptsList';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const item: Item = {
  id: '789',
  name: '☕️ Espresso Macchiato',
  quantity: 1,
  price: 0.59,
  totalPrice: 0.59,
};

// to ensure always the same date for snapshot tests
const timestampMock = {
  // months start at 0
  toDate: () => new Date(2021, 4, 1, 8, 30, 15),
} as FirebaseFirestoreTypes.Timestamp;

const receipt: FirebaseReceipt = {
  id: '456',
  urlOriginal:
    'https://storage.googleapis.com/images_bachelorsthesisaccountingocr/lidl_receipt.jpeg',
  urlProcessed:
    'https://storage.googleapis.com/images_bachelorsthesisaccountingocr/processed_lidl_receipt.jpeg',
  added: timestampMock,
  transactionDate: timestampMock,
  merchantName: 'Lidl',
  merchantPhoneNumber: '+353 (0)89 420 0000',
  merchantAddress: 'ABE-Hutcheon Street',
  total: 1.83,
  subtotal: 0,
  tax: 0,
  tip: 0,
  currency: '£',
  items: [item],
};

const ReceiptWithProps = () => <Receipt userId="123" receipt={receipt} />;

export const Basic = () => <MockedNavigator component={ReceiptWithProps} />;

storiesOf('Receipt', module).add('Basic', Basic);

export default {
  title: 'Receipt',
};
