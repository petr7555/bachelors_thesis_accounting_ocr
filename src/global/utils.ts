import { Image } from 'react-native-image-crop-picker';

export const getTodaysDateAtNoon = () => {
  return new Date(new Date().setHours(12, 0, 0, 0));
};

export const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const validateNumber = (input: string) =>
  isNaN(Number(input)) ? 'Must be a number' : undefined;

export const rgbToHex = (rgb: string) => {
  const cleaned = rgb.split('(')[1].split(')')[0];
  const numbers = cleaned.split(',');
  const nums = numbers.map((num) => {
    num = parseInt(num, 10).toString(16);
    return num.length === 1 ? '0' + num : num;
  });
  return '#' + nums.join('');
};

export const getFilename = (image: Image) => {
  return image.path.split('/').slice(-1)[0];
};
