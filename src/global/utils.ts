export const getTodaysDateAtNoon = () => {
  return new Date(new Date().setHours(12, 0, 0, 0));
};
