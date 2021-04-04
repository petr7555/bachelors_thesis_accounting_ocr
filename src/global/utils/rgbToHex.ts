const rgbToHex = (rgb: string) => {
  const cleaned = rgb.split('(')[1].split(')')[0];
  const numbers = cleaned.split(',');
  const nums = numbers.map((num) => {
    num = parseInt(num, 10).toString(16);
    return num.length === 1 ? '0' + num : num;
  });
  return '#' + nums.join('');
};

export default rgbToHex;
