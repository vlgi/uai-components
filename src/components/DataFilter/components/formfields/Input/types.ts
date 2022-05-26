export type TMask = "number"
  | "money"
  | "percentage"
  | Record<string, unknown>
  | ((v: string)=> string);
