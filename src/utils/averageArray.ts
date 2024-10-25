import sumArray from './sumArray';

export default function averageArray(array: number[]): number {
  const sum = sumArray(array);

  return sum / array.length;
}
