import type { TRecordCollection } from "./record-collection/record-collection";
import SortEngine from "./SortEngine";

test("should order 'asc', 'desc' by one string column", () => {
  const data = [
    { k1: "ghij-1" },
    { k1: "cdef-5" },
    { k1: "abcd-7" },
    { k1: "fghi-2" },
    { k1: "efgh-3" },
    { k1: "defg-4" },
    { k1: "bcde-6" },
  ];
  const sort = new SortEngine(data);

  // order asc
  sort.sortOptions = [
    { key: "k1", order: "asc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: "abcd-7" },
    { k1: "bcde-6" },
    { k1: "cdef-5" },
    { k1: "defg-4" },
    { k1: "efgh-3" },
    { k1: "fghi-2" },
    { k1: "ghij-1" },
  ]);

  // order desc
  sort.sortOptions = [
    { key: "k1", order: "desc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: "ghij-1" },
    { k1: "fghi-2" },
    { k1: "efgh-3" },
    { k1: "defg-4" },
    { k1: "cdef-5" },
    { k1: "bcde-6" },
    { k1: "abcd-7" },
  ]);
});

test("should order 'asc', 'desc' by one date column", () => {
  const data = [
    { k1: new Date("2021-12-28") },
    { k1: new Date("2021-12-31") },
    { k1: new Date("2021-12-29") },
    { k1: new Date("2021-12-30") },
  ];
  const sort = new SortEngine(data);

  // order asc
  sort.sortOptions = [
    { key: "k1", order: "asc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: new Date("2021-12-28") },
    { k1: new Date("2021-12-29") },
    { k1: new Date("2021-12-30") },
    { k1: new Date("2021-12-31") },
  ]);

  // order desc
  sort.sortOptions = [
    { key: "k1", order: "desc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: new Date("2021-12-31") },
    { k1: new Date("2021-12-30") },
    { k1: new Date("2021-12-29") },
    { k1: new Date("2021-12-28") },
  ]);
});

test("should order 'asc', 'desc' by one number column", () => {
  const data = [
    { k1: 2.4 },
    { k1: 1.2 },
    { k1: 20000000 },
    { k1: 1 },
    { k1: 1.4 },
  ];
  const sort = new SortEngine(data);

  // order asc
  sort.sortOptions = [
    { key: "k1", order: "asc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: 1 },
    { k1: 1.2 },
    { k1: 1.4 },
    { k1: 2.4 },
    { k1: 20000000 },
  ]);

  // order desc
  sort.sortOptions = [
    { key: "k1", order: "desc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: 20000000 },
    { k1: 2.4 },
    { k1: 1.4 },
    { k1: 1.2 },
    { k1: 1 },
  ]);
});

test("should order 'asc', 'desc' by one boolean column", () => {
  const data = [
    { k1: false },
    { k1: true },
    { k1: true },
    { k1: false },
    { k1: false },
    { k1: true },
    { k1: false },
  ];
  const sort = new SortEngine(data);

  // order asc
  sort.sortOptions = [
    { key: "k1", order: "asc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: false },
    { k1: false },
    { k1: false },
    { k1: false },
    { k1: true },
    { k1: true },
    { k1: true },
  ]);

  // order desc
  sort.sortOptions = [
    { key: "k1", order: "desc" },
  ];
  expect(sort.getSorted()).toEqual([
    { k1: true },
    { k1: true },
    { k1: true },
    { k1: false },
    { k1: false },
    { k1: false },
    { k1: false },
  ]);
});

test("should order by multiple columns with the defined priority", () => {
  const data = [
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
      k5: { teste: 1 },
    },
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-30"),
      k5: { teste: 1 },
    },
    {
      k1: "abcd",
      k2: 123,
      k3: true,
      k4: new Date("2021-12-31"),
      k5: { teste: 1 },
    },
  ];
  const sort = new SortEngine(data);

  // order
  sort.sortOptions = [
    { key: "k1", order: "asc" },
    { key: "k2", order: "asc" },
    { key: "k3", order: "desc" },
  ];
  expect(sort.getSorted()).toEqual([
    {
      k1: "abcd",
      k2: 123,
      k3: true,
      k4: new Date("2021-12-31"),
      k5: { teste: 1 },
    },
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
      k5: { teste: 1 },
    },
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-30"),
      k5: { teste: 1 },
    },
  ]);
});

describe("sort configs", () => {
  const data = [
    {
      k1: ["abcd"],
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
      k5: { test: 1 },
    },
    {
      k1: ["abcd"],
      k2: 234,
      k3: false,
      k4: new Date("2021-12-30"),
      k5: { test: 1 },
    },
    {
      k1: ["abcd"],
      k2: 123,
      k3: true,
      k4: new Date("2021-12-31"),
      k5: { test: 1 },
    },
  ];

  test("should throw error on set sort with invalid types", () => {
    const sort = new SortEngine(data);

    expect(() => {
      sort.sortOptions = [
        { key: "k1", order: "asc" },
        { key: "k2", order: "asc" },
        { key: "k3", order: "desc" },
        { key: "k5", order: "desc" },
      ];
    }).toThrow("invalid column types for sort: k1; k5;");
  });

  test("should get and set valid sort options", () => {
    const sort = new SortEngine(data);

    sort.sortOptions = [
      { key: "k2", order: "asc" },
      { key: "k3", order: "desc" },
    ];

    expect(sort.sortOptions).toEqual([
      { key: "k2", order: "asc" },
      { key: "k3", order: "desc" },
    ]);
  });

  test("should not alter data passed as param", () => {
    const dataCopied = (JSON.parse(JSON.stringify(data)) as TRecordCollection);
    const sort = new SortEngine(dataCopied);

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));

    sort.sortOptions = [
      { key: "k2", order: "asc" },
      { key: "k3", order: "desc" },
    ];

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));

    sort.getSorted();

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));
  });
});
