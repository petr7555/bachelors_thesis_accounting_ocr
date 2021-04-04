import { v4 as uuidv4 } from 'uuid';
import { Item } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';

const getDefaultItem = (): Item => ({
  id: uuidv4(),
  name: '',
  quantity: 1,
  price: 0,
  totalPrice: 0,
});

export default getDefaultItem;
