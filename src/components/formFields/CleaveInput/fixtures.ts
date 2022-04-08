export const cpfMaskConfig = {
  numericOnly: true,
  delimiters: [".", ".", "-"],
  blocks: [3, 3, 3, 2],
};

export const phoneMaskConfig = {
  numericOnly: true,
  blocks: [0, 2, 5, 4],
  delimiters: ["(", ") ", "-"],
};

export const birthDateMaskConfig = {
  numericOnly: true,
};

export const monthDateMaskConfig = {
  numericOnly: true,
  date: true,
  delimiter: "/",
  datePattern: ["d", "m"],
};

export const cepMaskConfig = {
  numericOnly: true,
  delimiters: ["-"],
  blocks: [5, 3],
};

export const currencyMaskConfig = {
  prefix: "R$ ",
  numeral: true,
  delimiter: ".",
  noImmediatePrefix: true,
  numeralDecimalMark: ",",
  rawValueTrimPrefix: true,
};
