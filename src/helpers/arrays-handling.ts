function compareObjects<T extends Record<string, unknown>>(obj1: T, obj2: T) {
  const obj1String = JSON.stringify(obj1, Object.keys(obj1).sort());
  const obj2String = JSON.stringify(obj2, Object.keys(obj2).sort());
  return obj1String === obj2String;
}

export function checkIfItemIsInArray<T extends Record<string, unknown>>(
  item: T,
  arr: T[],
): { isInIt: boolean; index: number } {
  let isInIt = false;
  let index = -1;
  index = arr.findIndex((x: T) => compareObjects(x, item));
  if (index !== -1) isInIt = true;
  return { isInIt, index };
}
