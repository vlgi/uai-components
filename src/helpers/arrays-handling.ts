import { compareObjects } from "./objects-handling";

export function checkIfItemIsInArray<T>(
  item: T,
  arr: T[],
): { isInIt: boolean; index: number } {
  let isInIt = false;
  let index = -1;
  index = arr.findIndex((x: T) => compareObjects(x, item));
  if (index !== -1) isInIt = true;
  return { isInIt, index };
}

// switch arr elements positions by index
export function switchElsPositionByIndex<T>(
  arr: T[],
  first: number,
  second: number,
): T[] {
  const temp = [...arr];
  temp[first] = arr[second];
  temp[second] = arr[first];
  return temp;
}

// reorder array element positions by current index and target index
export function changeElPositionByIndex<T>(
  arr: T[],
  currPos: number, // current index
  targetPos: number, // target index
): T[] {
  const temp = [...arr];
  const element = temp.splice(currPos, 1)[0];
  temp.splice(targetPos, 0, element);
  return temp;
}

export function sortArrayOfTuples(
  arr: [number, number][],
  order: "asc" | "desc",
): [number, number][] {
  arr.sort((a, b) => {
    let x = a;
    let y = b;
    if (order === "desc") {
      x = b;
      y = a;
    }
    if (a[0] === b[0]) {
      return x[1] - y[1];
    }
    return x[0] - y[0];
  });
  return arr;
}
