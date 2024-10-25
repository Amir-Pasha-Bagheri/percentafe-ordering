import Decimal from 'decimal.js';

export default function sumArray(array: number[]): number {
  let sum = new Decimal(0);

  array.forEach((item) => {
    sum = sum.plus(item);
  });

  return sum.toNumber();
}
