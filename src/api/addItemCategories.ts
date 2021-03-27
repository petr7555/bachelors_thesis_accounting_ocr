import { ReceiptData } from '../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import axios from 'axios';

const addItemCategories = async (receiptData: ReceiptData) => {
  for (const item of receiptData.items) {
    const endpoint = 'http://pythonapi.westeurope.azurecontainer.io/category';
    console.log(endpoint);
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
