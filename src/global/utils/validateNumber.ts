const validateNumber = (input: string) =>
  isNaN(Number(input)) ? 'Must be a number' : undefined;

export default validateNumber;
