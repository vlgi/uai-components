/** wait a js tick, for handler with js sync problems */
export function jsTick(): Promise<void> {
  return new Promise((r) => {
    setTimeout(r, 0);
  });
}
