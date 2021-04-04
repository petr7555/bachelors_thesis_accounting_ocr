import validateNumber from './validateNumber';

const errorMessage = 'Must be a number';

it('returns error message when argument contains letter at the end', () => {
  expect(validateNumber('123a')).toEqual(errorMessage);
});

it('returns error message when argument contains letter at the beginning', () => {
  expect(validateNumber('a123')).toEqual(errorMessage);
});

it('returns error message when argument contains letter in the middle', () => {
  expect(validateNumber('1a23')).toEqual(errorMessage);
});

it('returns error message when argument contains space in the middle', () => {
  expect(validateNumber('1 234')).toEqual(errorMessage);
});

it('returns error message when argument contains two decimal points', () => {
  expect(validateNumber('123.4.5')).toEqual(errorMessage);
});

it('returns error message when argument contains comma', () => {
  expect(validateNumber('123,456')).toEqual(errorMessage);
});

it('returns undefined when argument is integer', () => {
  expect(validateNumber('123')).toEqual(undefined);
});

it('returns undefined when argument is decimal number', () => {
  expect(validateNumber('123.45')).toEqual(undefined);
});

it('returns undefined when argument contains spaces at the end', () => {
  expect(validateNumber('123   ')).toEqual(undefined);
});

it('returns undefined when argument contains spaces at the beginning', () => {
  expect(validateNumber('   123')).toEqual(undefined);
});

it('returns undefined when argument starts with decimal point', () => {
  expect(validateNumber('.123')).toEqual(undefined);
});

it('returns undefined when argument starts with zero before decimal point', () => {
  expect(validateNumber('0.123')).toEqual(undefined);
});

it('returns undefined when argument starts with multiple zeros before decimal point', () => {
  expect(validateNumber('0000.123')).toEqual(undefined);
});

it('returns undefined when argument is Infinity', () => {
  expect(validateNumber('Infinity')).toEqual(undefined);
});

it('returns undefined when argument is negative integer', () => {
  expect(validateNumber('-123')).toEqual(undefined);
});

it('returns undefined when argument is negative decimal number', () => {
  expect(validateNumber('-123.45')).toEqual(undefined);
});

it('returns undefined when argument is negative and starts with decimal point', () => {
  expect(validateNumber('-.123')).toEqual(undefined);
});
