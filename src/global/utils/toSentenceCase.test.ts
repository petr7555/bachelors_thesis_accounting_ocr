import toSentenceCase from './toSentenceCase';

it('converts one word from camelCase to Sentence Case', () => {
  expect(toSentenceCase('banana')).toEqual('Banana');
});

it('converts three words from camelCase to Sentence Case', () => {
  expect(toSentenceCase('bananaAndApple')).toEqual('Banana And Apple');
});
