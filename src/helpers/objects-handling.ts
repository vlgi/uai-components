export function compareObjects<T>(obj1: T, obj2: T): boolean {
  const obj1String = JSON.stringify(obj1, Object.keys(obj1).sort());
  const obj2String = JSON.stringify(obj2, Object.keys(obj2).sort());
  return obj1String === obj2String;
}
