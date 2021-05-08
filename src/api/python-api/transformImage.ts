import axios from 'axios';
import getFilename from '../../global/utils/getFilename';
import { MyImage } from '../../components/Camera/Camera';
import { PYTHON_API } from '../../global/constants';

type ResponseData = {
  // image as base64 string starting '/9j/4AAQS...'
  image: string;
  mime: string;
};

const transformImage = async (
  image: MyImage,
): Promise<ResponseData | undefined> => {
  try {
    const endpoint = `${PYTHON_API}/process-image`;

    const photo = {
      uri: image.path,
      type: image.mime,
      name: getFilename(image),
    };

    const formData = new FormData();
    formData.append('image', photo);

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
