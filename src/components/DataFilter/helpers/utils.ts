export function sleep(n: number): Promise<void> {
  return new Promise((r) => {
    setTimeout(r, n);
  });
}

/** wait a js tick, for handler with js sync problems */
export function jsTick(): Promise<void> {
  return sleep(0);
}
