export const sleep = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t));

export const tick = (): Promise<void> => sleep(0);

export function checkIfIsAnImageExt(url: string): boolean {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
