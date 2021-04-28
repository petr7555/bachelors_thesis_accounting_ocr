import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { PYTHON_API } from '../global/constants';
import axios from 'axios';

const addItemCategories = async (receiptData: ReceiptData) => {
  const endpoint = `${PYTHON_API}/category`;
  try {
    const { data } = await axios.post(endpoint, {
      sentences: receiptData.items.map((item) => item.name),
    });

    for (let i = 0; i < receiptData.items.length; i++) {
      console.log(
        `Classified ${receiptData.items[i].name} as ${data.categories[i].category} ${data.categories[i].emoji}`,
      );
      receiptData.items[i].name = `${data.emoji} ${receiptData.items[i].name}`;
    }
  } catch (error) {
    console.error(error);
  }
  return receiptData;
};

export default addItemCategories;
