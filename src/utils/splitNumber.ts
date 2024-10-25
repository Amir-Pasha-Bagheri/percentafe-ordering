export default function splitNumber(num: number | string): string {
  let integerPart = num.toString().split('.')[0];
  const decimalPart = num.toString().split('.')[1];

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}
