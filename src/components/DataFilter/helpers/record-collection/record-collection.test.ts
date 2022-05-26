import { EData, getMetadata } from "./record-collection";

describe("RecordCollection class", () => {
  test("should get collection metadata based on nonempty columns", () => {
    const data = [
      {
        k1: "string-value",
        k2: undefined,
        k3: null,
        k4: null,
        k5: null,
      },
      {
        k1: null,
        k2: 123,
        k3: false,
        k4: null,
        k5: undefined,
      },
      {
        k1: "string-value",
        k2: 123,
        k3: false,
        k4: new Date("2021-12-31"),
        k5: 1.3,
      },
    ];
    expect(getMetadata(data)).toEqual({
      k1: EData.string,
      k2: EData.number,
      k3: EData.boolean,
      k4: EData.Date,
      k5: EData.number,
    });
  });
});
