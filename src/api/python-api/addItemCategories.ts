import { ReceiptData } from '../../services/FormRecognizerClient/convertReceiptResponseToReceiptData';
import { PYTHON_API } from '../../global/constants';
import axios from 'axios';
import { LOG } from '../../services/Logger/logger';

const addItemCategories = async (receiptData: ReceiptData) => {
  const endpoint = `${PYTHON_API}/category`;
  try {
    const { data } = await axios.post(endpoint, {
      sentences: receiptData.items.map((item) => item.name),
    });

    for (let i = 0; i < receiptData.items.length; i++) {
      const itemName = receiptData.items[i].name;
      const category = data.categories[i].category;
      const emoji = data.categories[i].emoji;

      LOG.info(`Classified ${itemName} as ${category} ${emoji}`);
      receiptData.items[i].name = `${emoji} ${itemName}`;
    }
  } catch (error) {
    LOG.error(error);
  }
  return receiptData;
};

export default addItemCategories;
