import sumArray from './sumArray';

export default function averageArray(array: number[]): number {
  const sum = sumArray(array);

  if (array.length) return sum / array.length;
  return 0;
}
