import FilterEngine, { EFilterType } from "./FilterEngine";
import type { TRecordCollection } from "./record-collection/record-collection";

describe("filter by string column", () => {
  const stringData = [
    { k1: "ghij-1" },
    { k1: "cdef-5" },
    { k1: "abcd-7" },
    { k1: null },
    { k1: "fghi-2" },
    { k1: undefined },
    { k1: "efgh-3" },
    { k1: "defg-4" },
    { k1: "bcde-6" },
  ];

  test("should filter by values", () => {
    const filter = new FilterEngine(stringData);

    filter.filterOptions = [
      {
        type: EFilterType.value,
        key: "k1",
        values: ["ghij-1", "fghi-2"],
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: "ghij-1" },
      { k1: "fghi-2" },
    ]);
  });

  test("should filter by regex", () => {
    const filter = new FilterEngine(stringData);

    filter.filterOptions = [
      {
        type: EFilterType.regex,
        key: "k1",
        value: "[ij]-\\d",
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: "ghij-1" },
      { k1: "fghi-2" },
    ]);
  });
});

describe("filter by Date column", () => {
  const dateData = [
    { k1: new Date("2021-12-28") },
    { k1: null },
    { k1: new Date("2021-12-29") },
    { k1: new Date("2021-12-30") },
    { k1: undefined },
    { k1: new Date("2021-12-31") },
  ];

  test("should filter by values", () => {
    const filter = new FilterEngine(dateData);

    filter.filterOptions = [
      {
        type: EFilterType.value,
        key: "k1",
        values: [new Date("2021-12-29"), new Date("2021-12-31")],
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: new Date("2021-12-29") },
      { k1: new Date("2021-12-31") },
    ]);
  });

  test("should filter by range", () => {
    const filter = new FilterEngine(dateData);

    filter.filterOptions = [
      {
        type: EFilterType.range,
        key: "k1",
        startValue: new Date("2021-12-29"),
        endValue: new Date("2021-12-31"),
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: new Date("2021-12-29") },
      { k1: new Date("2021-12-30") },
      { k1: new Date("2021-12-31") },
    ]);
  });
});

describe("filter by number column", () => {
  const numberData = [
    { k1: 2.4 },
    { k1: 1.2 },
    { k1: null },
    { k1: 20000000 },
    { k1: 1 },
    { k1: undefined },
    { k1: 1.4 },
  ];

  test("should filter by value", () => {
    const filter = new FilterEngine(numberData);

    filter.filterOptions = [
      {
        type: EFilterType.value,
        key: "k1",
        values: [2.4, 1.0],
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: 2.4 },
      { k1: 1 },
    ]);
  });

  test("should filter by range", () => {
    const filter = new FilterEngine(numberData);

    filter.filterOptions = [
      {
        type: EFilterType.range,
        key: "k1",
        startValue: 1.2,
        endValue: 1000,
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: 2.4 },
      { k1: 1.2 },
      { k1: 1.4 },
    ]);
  });
});

describe("filter by boolean column", () => {
  const booleanData = [
    { k1: false },
    { k1: true },
    { k1: undefined },
    { k1: true },
    { k1: false },
    { k1: null },
    { k1: false },
    { k1: true },
  ];

  test("should filter by value", () => {
    const filter = new FilterEngine(booleanData);

    filter.filterOptions = [
      {
        type: EFilterType.value,
        key: "k1",
        values: [true],
      },
    ];
    expect(filter.getFiltered()).toEqual([
      { k1: true },
      { k1: true },
      { k1: true },
    ]);
  });
});

describe("filter by multiple columns", () => {
  const data = [
    {
      k1: "abcd",
      k2: 123,
      k3: true,
      k4: new Date("2021-12-28"),
      k5: { test: 1 },
      k6: ["test"],
    },
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
      k5: { test: 1 },
      k6: ["test"],
    },
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-30"),
      k5: { test: 1 },
      k6: ["test"],
    },
  ];

  test("should filter by mix(value, range, regex)", () => {
    const filter = new FilterEngine(data);

    filter.filterOptions = [
      { type: EFilterType.regex, key: "k1", value: "ab" },
      { type: EFilterType.value, key: "k2", values: [123, 234] },
      {
        type: EFilterType.range,
        key: "k4",
        startValue: new Date("2021-12-29"),
        endValue: new Date("2021-12-31"),
      },
    ];

    expect(filter.getFiltered()).toEqual([
      {
        k1: "abcd",
        k2: 234,
        k3: false,
        k4: new Date("2021-12-31"),
        k5: { test: 1 },
        k6: ["test"],
      },
      {
        k1: "abcd",
        k2: 234,
        k3: false,
        k4: new Date("2021-12-30"),
        k5: { test: 1 },
        k6: ["test"],
      },
    ]);
  });
});

describe("filter by null and undefined values", () => {
  const data = [
    {
      k1: "abcd",
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
    },
    {
      k1: null,
      k2: null,
      k3: null,
      k4: null,
    },
    {
      k1: undefined,
      k2: undefined,
      k3: undefined,
      k4: undefined,
    },
  ];

  test("filter by null values", () => {
    const filter = new FilterEngine(data);

    filter.filterOptions = [
      { type: EFilterType.value, key: "k1", values: [null] },
      { type: EFilterType.value, key: "k2", values: [null] },
      { type: EFilterType.value, key: "k3", values: [null] },
      { type: EFilterType.value, key: "k4", values: [null] },
    ];
    expect(filter.getFiltered()).toEqual([{
      k1: null, k2: null, k3: null, k4: null,
    }]);

    // data column have especial cases, so let's test isolated
    filter.filterOptions = [
      { type: EFilterType.value, key: "k4", values: [null] },
    ];
    expect(filter.getFiltered()).toEqual([{
      k1: null, k2: null, k3: null, k4: null,
    }]);
  });

  test("filter by undefined values", () => {
    const filter = new FilterEngine(data);

    filter.filterOptions = [
      { type: EFilterType.value, key: "k1", values: [undefined] },
      { type: EFilterType.value, key: "k2", values: [undefined] },
      { type: EFilterType.value, key: "k3", values: [undefined] },
      { type: EFilterType.value, key: "k4", values: [undefined] },
    ];
    expect(filter.getFiltered()).toEqual([{
      k1: undefined, k2: undefined, k3: undefined, k4: undefined,
    }]);

    // data column have especial cases, so let's test isolated
    filter.filterOptions = [
      { type: EFilterType.value, key: "k4", values: [undefined] },
    ];
    expect(filter.getFiltered()).toEqual([{
      k1: undefined, k2: undefined, k3: undefined, k4: undefined,
    }]);
  });
});

describe("filter configs", () => {
  const data = [
    {
      k1: ["abcd"],
      k2: 234,
      k3: false,
      k4: new Date("2021-12-31"),
      k5: { test: 1 },
      k6: "abcd",
    },
    {
      k1: ["abcd"],
      k2: 234,
      k3: false,
      k4: new Date("2021-12-30"),
      k5: { test: 1 },
      k6: "abcd",
    },
    {
      k1: ["abcd"],
      k2: 123,
      k3: true,
      k4: new Date("2021-12-31"),
      k5: { test: 1 },
      k6: "abcd",
    },
    {
      k1: null,
      k2: null,
      k3: null,
      k4: null,
      k5: null,
      k6: null,
    },
  ];

  test("should throw error on set filter with invalid types", () => {
    const filter = new FilterEngine(data);

    expect(() => {
      filter.filterOptions = [
        { type: EFilterType.value, key: "k1", values: [] },
        { type: EFilterType.value, key: "k2", values: [] },
        { type: EFilterType.value, key: "k3", values: [] },
        { type: EFilterType.value, key: "k5", values: [] },
      ];
    }).toThrow("invalid column types for filter: k1; k5;");
  });

  test("should get and set valid filter options", () => {
    const filter = new FilterEngine(data);

    filter.filterOptions = [
      { type: EFilterType.value, key: "k2", values: [] },
      { type: EFilterType.value, key: "k3", values: [] },
    ];

    expect(filter.filterOptions).toEqual([
      { type: EFilterType.value, key: "k2", values: [] },
      { type: EFilterType.value, key: "k3", values: [] },
    ]);
  });

  test("should not alter data passed as param", () => {
    const dataCopied = (JSON.parse(JSON.stringify(data)) as TRecordCollection);
    const filter = new FilterEngine(dataCopied);

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));

    filter.filterOptions = [
      { type: EFilterType.value, key: "k2", values: [] },
      { type: EFilterType.value, key: "k3", values: [] },
    ];

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));

    filter.getFiltered();

    expect(JSON.stringify(dataCopied)).toEqual(JSON.stringify(data));
  });

  test("should throw error on set filter type to not allowed columns type", () => {
    const filter = new FilterEngine(data);

    expect(() => {
      filter.filterOptions = [
        { type: EFilterType.value, key: "k4", values: [] },
        // not filter column number by regex, only string
        { type: EFilterType.regex, key: "k2", value: "\\d" },
        // not filter column boolean by range
        {
          type: EFilterType.range,
          key: "k3",
          startValue: true,
          endValue: false,
        },
      ];
    }).toThrow("invalid use of filter type for the columns: k2; k3;");
  });

  test("should list unique options to filter by value", () => {
    const filter = new FilterEngine(data);

    // get by date column
    expect(filter.getColumnOptions("k4", EFilterType.value)).toEqual(
      expect.arrayContaining([
        new Date("2021-12-31"),
        new Date("2021-12-30"),
        null,
      ]),
    );

    // get by number column
    expect(filter.getColumnOptions("k2", EFilterType.value)).toEqual(
      expect.arrayContaining([
        234,
        123,
        null,
      ]),
    );

    // get by string column
    expect(filter.getColumnOptions("k6", EFilterType.value)).toEqual(
      expect.arrayContaining([
        "abcd",
        null,
      ]),
    );

    // get by boolean column
    expect(filter.getColumnOptions("k3", EFilterType.value)).toEqual(
      expect.arrayContaining([
        true,
        false,
        null,
      ]),
    );
  });

  test("should throw error at try get options list for invalid column or filter type", () => {
    const filter = new FilterEngine(data);

    expect(() => {
      filter.getColumnOptions("k1", EFilterType.value);
    }).toThrow("the column k1 can't be filtered");

    expect(() => {
      filter.getColumnOptions("k2", EFilterType.regex);
    }).toThrow("the column k2 can't be used with regex filter type");
  });
});
