/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const falsy = [
  false,
  null,
  undefined,
  0,
  NaN,
  "",
  // document.all,
  BigInt(0),
  -0,
];

export function isFalsy(value: any): boolean {
  if (Array.isArray(value)) return !value.length;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return falsy.includes(value);
}
export function isTruthy(value: any): boolean {
  return !isFalsy(value);
}

const empty = [null, undefined];

export function isEmpty(value: any): boolean {
  return empty.includes(value);
}
