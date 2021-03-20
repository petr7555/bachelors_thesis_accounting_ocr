import { ReceiptResponse } from './FormRecognizerClient';
import { getAmountFromString, getCurrencyFromString } from './amountParser';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { getTodaysDateAtNoon } from '../../global/utils';
import { v4 as uuidv4 } from 'uuid';

type ReceiptDataBase = {
  merchantName: string;
  merchantPhoneNumber: string;
  merchantAddress: string;
  total: number;
  subtotal: number;
  tax: number;
  tip: number;
  currency: string;
  items: Item[];
};

export type ReceiptData = ReceiptDataBase & {
  transactionDate: Date;
};

export type FirebaseReceiptData = ReceiptDataBase & {
  transactionDate: FirebaseFirestoreTypes.Timestamp;
};

export type ReceiptDataMember = keyof ReceiptData;

export type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
};

export default function convertReceiptResponseToReceiptData(
  receiptResponse: ReceiptResponse,
): ReceiptData {
  const result: ReceiptData = {
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

  const fields = receiptResponse.analyzeResult.documentResults[0].fields;

  result.merchantName =
    fields.MerchantName?.valueString ||
    fields.MerchantName?.text ||
    result.merchantName;

  result.merchantPhoneNumber =
    fields.MerchantPhoneNumber?.valuePhoneNumber ||
    fields.MerchantPhoneNumber?.text ||
    result.merchantPhoneNumber;

  result.merchantAddress =
    fields.MerchantAddress?.valueString ||
    fields.MerchantAddress?.text ||
    result.merchantAddress;

  const transactionDate =
    fields.TransactionDate?.valueDate || fields.TransactionDate?.text;

  result.transactionDate = transactionDate
    ? new Date(transactionDate.toString())
    : result.transactionDate;

  result.total =
    fields.Total?.valueNumber ||
    getAmountFromString(fields.Total?.text) ||
    result.total;

  result.subtotal =
    fields.Subtotal?.valueNumber ||
    getAmountFromString(fields.Subtotal?.text) ||
    result.subtotal;

  result.tax =
    fields.Tax?.valueNumber ||
    getAmountFromString(fields.Tax?.text) ||
    result.tax;

  result.tip =
    fields.Tip?.valueNumber ||
    getAmountFromString(fields.Tip?.text) ||
    result.tip;

  if (fields.Items?.valueArray) {
    for (const item of fields.Items.valueArray) {
      const resultItem: Item = {
        id: uuidv4(),
        name: '',
        quantity: 0,
        price: 0,
        totalPrice: 0,
      };

      resultItem.name =
        item.valueObject.Name?.valueString ||
        item.valueObject.Name?.text ||
        resultItem.name;

      resultItem.quantity =
        item.valueObject.Quantity?.valueNumber || resultItem.quantity;

      resultItem.price =
        item.valueObject.Price?.valueNumber ||
        getAmountFromString(item.valueObject.Price?.text) ||
        resultItem.price;

      resultItem.totalPrice =
        item.valueObject.TotalPrice?.valueNumber ||
        getAmountFromString(item.valueObject.TotalPrice?.text) ||
        resultItem.totalPrice;

      result.items.push(resultItem);
    }
  }

  // get currency either of whole receipt or based on first item that has the currency
  result.currency =
    getCurrencyFromString(fields.Total?.text) || result.currency;

  if (!result.currency) {
    if (fields.Items?.valueArray) {
      for (const item of fields.Items.valueArray) {
        const itemCurrency =
          getCurrencyFromString(item.valueObject.TotalPrice?.text) ||
          getCurrencyFromString(item.valueObject.Price?.text);
        if (itemCurrency) {
          result.currency = itemCurrency;
          break;
        }
      }
    }
  }

  return result;
}
