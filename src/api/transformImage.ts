import { Image } from 'react-native-image-crop-picker';
import axios from 'axios';
import { getFilename } from '../global/utils';

type ResponseData = {
  image: string;
  mime: string;
};

const transformImage = async (
  image: Image,
): Promise<ResponseData | undefined> => {
  try {
    const endpoint = 'http://10.0.2.2/process-image';

    const photo = {
      uri: image.path,
      type: image.mime,
      name: getFilename(image),
    };

    const formData = new FormData();
    formData.append('image', photo);

    console.log(image.mime);
    const { data } = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default transformImage;
