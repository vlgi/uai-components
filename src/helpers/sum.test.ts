import sum from "./sum";

test("adds 1 + 2 to equal 3", () => {
  const ret: number = sum(1, 2);
  expect(ret).toBe(3);
});

test("async test", async () => {
  const lazySum = (a: number, b: number) => new Promise((resolve) => {
    setTimeout(() => resolve(sum(a, b)), 1);
  });
  const ret = await lazySum(1, 2);
  expect(ret).toBe(3);
});
