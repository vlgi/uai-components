export type TData = string|boolean|number|Date|undefined|null
export enum EData {
  string,
  number,
  boolean,
  Date,
}
export type TRecord = Record<string, unknown>
export type TRecordCollection = TRecord[]
export type TCollectionMetadata = Record<string, EData>

function getColumnType(data: TRecordCollection, key: string): EData {
  const nonEmptyRecord = data.find((r) => r[key] !== undefined && r[key] !== null);
  if (!nonEmptyRecord) return null;

  const v = nonEmptyRecord[key];

  if (typeof v === "string") {
    return EData.string;
  } if (typeof v === "boolean") {
    return EData.boolean;
  } if (typeof v === "number") {
    return EData.number;
  } if (v instanceof Date) {
    return EData.Date;
  }

  return null;
}

export function getMetadata(data: TRecordCollection): TCollectionMetadata {
  const ret = {};

  Object.keys(data[0]).forEach((key) => {
    ret[key] = getColumnType(data, key);
  });

  return ret;
}
