import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ReceiptItem from './ReceiptItem';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { action } from '@storybook/addon-actions';

const item: Item = {
  id: '123',
  name: '🍦 Ice cream',
  quantity: 1,
  price: 10,
  totalPrice: 10,
};
export const Basic = () => (
  <ReceiptItem
    item={item}
    deleteItem={(id) => Promise.resolve(action(`deleteItem ${id}`)())}
    updateItem={(id) => Promise.resolve(action(`updateItem ${id}`)())}
  />
);

storiesOf('ReceiptItem', module).add('Basic', Basic);

export default {
  title: 'ReceiptItem',
};
