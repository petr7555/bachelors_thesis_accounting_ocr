const parsePriceString = (price: string) => {
  const regexp = /^([$€]\s*)?([,.\d]+)(\s*[$€])?$/;
  return price.match(regexp);
};

export const getCurrencyFromString = (price: string | undefined) => {
  if (!price) {
    return undefined;
  }
  const matched = parsePriceString(price);
  if (!matched) {
    return undefined;
  }
  return (matched[1] || matched[3]).trim();
};

export const getAmountFromString = (price: string | undefined) => {
  if (!price) {
    return undefined;
  }
  const matched = parsePriceString(price);
  if (!matched) {
    return undefined;
  }
  const matchedValue = matched[2];
  const withoutCommas = matchedValue.replace(/,/g, '');
  return parseFloat(withoutCommas);
};
