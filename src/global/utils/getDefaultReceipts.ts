import getTodaysDateAtNoon from './getTodaysDateAtNoon';
import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';

const getDefaultReceipt = (): ReceiptData => ({
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
});

export default getDefaultReceipt;
