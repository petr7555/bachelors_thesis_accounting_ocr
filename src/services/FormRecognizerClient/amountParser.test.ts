import { getCurrencyFromString, getAmountFromString } from './amountParser';

it('extracts dollars from the beginning', () => {
  expect(getCurrencyFromString('$35.00')).toEqual('$');
});

it('extracts euros from the beginning', () => {
  expect(getCurrencyFromString('€35.00')).toEqual('€');
});

it('extracts dollars from the end', () => {
  expect(getCurrencyFromString('35.00$')).toEqual('$');
});

it('extracts euros from the end', () => {
  expect(getCurrencyFromString('35.00€')).toEqual('€');
});

it('extracts currency with space from the beginning', () => {
  expect(getCurrencyFromString('$  35.00')).toEqual('$');
});

it('extracts currency with space from the end', () => {
  expect(getCurrencyFromString('35.00  $')).toEqual('$');
});

it('extracts currency from long number', () => {
  expect(getCurrencyFromString('$ 35,000,123.45')).toEqual('$');
});

it('returns undefined currency if the price string is invalid', () => {
  expect(getCurrencyFromString('$ 35 a 000')).toEqual(undefined);
});

it('extracts price from short number', () => {
  expect(getAmountFromString('$35')).toEqual(35);
});

it('extracts price from number with decimal', () => {
  expect(getAmountFromString('$ 35.123')).toEqual(35.123);
});

it('extracts price from long number', () => {
  expect(getAmountFromString('$ 35,000,123')).toEqual(35000123);
});

it('extracts price from long number with decimal', () => {
  expect(getAmountFromString('$ 35,000,123.45')).toEqual(35000123.45);
});

it('returns undefined price if the price string is invalid', () => {
  expect(getAmountFromString('$ 35 a 000')).toEqual(undefined);
});
