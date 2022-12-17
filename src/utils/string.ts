export const plural = (number: number, one: string, two: string, five: string): string => {
  let n = Math.abs(number);

  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
};

export const prepareText = (text: string, maxLength = 20): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
