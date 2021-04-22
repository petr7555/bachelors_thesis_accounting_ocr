import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Receipt from './Receipt';
import { FirebaseReceipt } from './ReceiptsList';
import { firestore } from '../../global/firebase';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import MockedNavigator from '../../../tests/mocks/MockedNavigator';

//TODO add real data from Verca

const item: Item = {
  id: '789',
  name: '🍦 Ice cream',
  quantity: 1,
  price: 10,
  totalPrice: 10,
};

const receipt: FirebaseReceipt = {
  id: '456',
  urlOriginal: '',
  urlProcessed: '',
  added: firestore.Timestamp.now(),
  transactionDate: firestore.Timestamp.now(),
  merchantName: 'Lidl',
  merchantPhoneNumber: '602 123 456',
  merchantAddress: 'Brno, Czech Republic',
  total: 121,
  subtotal: 100,
  tax: 21,
  tip: 0,
  currency: 'CZK',
  items: [item],
};

const ReceiptWithProps = () => <Receipt userId="123" receipt={receipt} />;

export const Basic = () => <MockedNavigator component={ReceiptWithProps} />;

storiesOf('ReceiptItem', module).add('Basic', Basic);

export default {
  title: 'ReceiptItem',
};
