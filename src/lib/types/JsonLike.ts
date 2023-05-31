type Keys = string | number | symbol;
type JsonKeys = string | number;
type JsonValues = string | boolean | number | undefined | null;
type ValueOrRecordOrArray<K extends Keys, T> =
  | T
  | Array<ValueOrRecordOrArray<K, T>>
  | {
      [P in K]: ValueOrRecordOrArray<K, T>;
    };
export type JsonLike = ValueOrRecordOrArray<JsonKeys, JsonValues>;
export type ObjectLike = ValueOrRecordOrArray<Keys, JsonValues>;
