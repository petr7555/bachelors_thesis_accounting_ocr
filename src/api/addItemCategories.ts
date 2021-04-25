import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import axios from 'axios';
import { PYTHON_API } from '../global/constants';

const addItemCategories = async (receiptData: ReceiptData) => {
  for (const item of receiptData.items) {
    const endpoint = `${PYTHON_API}/category`;
    try {
      const { data } = await axios.post(endpoint, {
        sentence: item.name,
      });
      console.log(`Classified ${item.name} as ${data.category} ${data.emoji}`);
      item.name = `${data.emoji} ${item.name}`;
    } catch (error) {
      console.error(error);
    }
  }
  return receiptData;
};

export default addItemCategories;
