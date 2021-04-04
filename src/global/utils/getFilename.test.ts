import { Image } from 'react-native-image-crop-picker';
import getFilename from './getFilename';

it('returns filename without extension', () => {
  const imageName = 'image';
  const image = getImageWithPath(`/some/path/to/${imageName}`);

  expect(getFilename(image)).toEqual(imageName);
});

it('returns filename with extension', () => {
  const imageName = 'image.png';
  const image = getImageWithPath(`/some/path/to/${imageName}`);

  expect(getFilename(image)).toEqual(imageName);
});

it('returns filename with two extensions', () => {
  const imageName = 'image.second.png';
  const image = getImageWithPath(`/some/path/to/${imageName}`);

  expect(getFilename(image)).toEqual(imageName);
});

it('returns filename of image with relative path', () => {
  const imageName = 'image.png';
  const image = getImageWithPath(`../../some/path/to/${imageName}`);

  expect(getFilename(image)).toEqual(imageName);
});

it('returns filename of image without path', () => {
  const imageName = 'image.png';
  const image = getImageWithPath(imageName);

  expect(getFilename(image)).toEqual(imageName);
});

const getImageWithPath = (path: string): Image => ({
  path,
  size: 0,
  width: 0,
  height: 0,
  mime: '',
});
