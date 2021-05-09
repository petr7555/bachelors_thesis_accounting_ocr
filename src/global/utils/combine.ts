import getPathSeparator from './getPathSeparator';

const combine = (...items: string[]) => {
  return items.join(getPathSeparator());
};

export default combine;
