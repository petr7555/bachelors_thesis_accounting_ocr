export const getTodaysDateAtNoon = () => {
  return new Date(new Date().setHours(12, 0, 0, 0));
};

export const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const validateNumber = (input: string) =>
  isNaN(Number(input)) ? 'Must be a number' : undefined;
