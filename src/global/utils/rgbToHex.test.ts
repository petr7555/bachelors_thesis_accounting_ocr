import rgbToHex from './rgbToHex';

it('converts black', () => {
  expect(rgbToHex('rgb(0,0,0)')).toEqual('#000000');
});

it('converts white', () => {
  expect(rgbToHex('rgb(255,255,255)')).toEqual('#ffffff');
});

it('converts orchid from rgb to hex', () => {
  expect(rgbToHex('rgb(218, 112, 214)')).toEqual('#da70d6');
});
