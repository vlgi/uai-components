export const sleep = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t));

export const tick = (): Promise<void> => sleep(0);
