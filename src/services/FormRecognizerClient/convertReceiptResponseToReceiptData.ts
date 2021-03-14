import { ReceiptResponse } from './FormRecognizerClient';
import { getAmountFromString, getCurrencyFromString } from './amountParser';

export type ReceiptData = {
  merchantName: string;
  merchantPhoneNumber: string;
  merchantAddress: string;
  transactionDate: string;
  transactionTime: string;
  total: number;
  subtotal: number;
  tax: number;
  tip: number;
  currency: string;
  items: Item[];
};

export type ReceiptDataMember = keyof ReceiptData;

type Item = {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  currency: string;
};

export default function convertReceiptResponseToReceiptData(
  receiptResponse: ReceiptResponse,
): ReceiptData {
  const result: ReceiptData = {
    merchantName: '',
    merchantPhoneNumber: '',
    merchantAddress: '',
    transactionDate: '',
    transactionTime: '',
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

  result.transactionDate =
    fields.TransactionDate?.valueDate ||
    fields.TransactionDate?.text ||
    result.transactionDate;

  result.transactionTime =
    fields.TransactionTime?.valueTime ||
    fields.TransactionTime?.text ||
    result.transactionTime;

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

  result.currency =
    getCurrencyFromString(fields.Total?.text) || result.currency;

  if (fields.Items?.valueArray) {
    for (const item of fields.Items.valueArray) {
      const resultItem: Item = {
        name: '',
        quantity: 0,
        price: 0,
        totalPrice: 0,
        currency: '',
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

      resultItem.currency =
        getCurrencyFromString(item.valueObject.TotalPrice?.text) ||
        getCurrencyFromString(item.valueObject.Price?.text) ||
        resultItem.currency;

      result.items.push(resultItem);
    }
  }

  return result;
}
