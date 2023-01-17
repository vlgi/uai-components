export function checkIfItemIsInArray<T>(
  item: T,
  arr: T[],
): { isInIt: boolean; index: number } {
  let isInIt = false;
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(item) === JSON.stringify(arr[i])) {
      [isInIt, index] = [true, i];
      break;
    }
  }
  return { isInIt, index };
}
