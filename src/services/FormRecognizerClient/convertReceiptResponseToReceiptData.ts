import { ReceiptResponse } from './FormRecognizerClient';

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
  items: Item[];
};

type Item = {
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  // TODO currency
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

  result.total = fields.Total?.valueNumber || result.total;
  result.subtotal = fields.Subtotal?.valueNumber || result.subtotal;
  result.tax = fields.Tax?.valueNumber || result.tax;
  result.tip = fields.Tip?.valueNumber || result.tip;

  if (fields.Items?.valueArray) {
    for (const item of fields.Items.valueArray) {
      const resultItem: Item = {
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
        item.valueObject.Price?.valueNumber || resultItem.price;

      resultItem.totalPrice =
        item.valueObject.TotalPrice?.valueNumber || resultItem.totalPrice;

      result.items.push(resultItem);
    }
  }

  return result;
}
