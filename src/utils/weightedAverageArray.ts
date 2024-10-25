import Decimal from 'decimal.js';
import sumArray from './sumArray';

export default function weightedAverageArray(
  array: { remain: number | string; price: number | string }[]
): number {
  const sumWithWeight = sumArray(
    array.map((item) => new Decimal(item.price).mul(item.remain).toNumber())
  );

  const sumOfWeight = sumArray(array.map((item) => Number(item.remain)));

  if (sumOfWeight) return sumWithWeight / sumOfWeight;
  return 0;
}
