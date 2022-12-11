import { writable } from 'svelte/store';

// lists
export const dli = writable(-1); // dragging list index
export const dlEl = writable(null); // dragging list html element (.list div)
export const tli = writable(-1); // target list index
export const tlEl = writable(null); // target list html element (.lane div)

// cards
export const dci = writable(-1); // dragging card index
export const dcli = writable(-1); // dragging card list index
export const dcEl = writable(null); // dragging card html element (.card div)
export const tci = writable(-1); // target card index
export const tcli = writable(-1) // target card list index
export const tcEl = writable(null); // dragging card html element (.card-space div)

// mouse
export const pos = writable({ x: 0, y: 0 }); // mouse position
export const dir = writable("right"); // dragging   direction
export const relPos = writable({ x: 0, y: 0 }); // relative element mouse position

