import { writable } from "svelte/store";
import type { TCardUser } from "./data/types";
import { logged as log } from "./data/empty-data";

// lists
export const dlEl = writable(null); // dragging list html element (.list div)
export const dli = writable(-1); // dragging list index
export const tlEl = writable(null); // target list html element (.lane div)
export const tli = writable(-1); // target list index
export const dlh = writable("auto"); // dragging list height

// cards
export const dcEl = writable(null); // dragging card html element (.card div)
export const dci = writable(-1); // dragging card index
export const dcli = writable(-1); // dragging card list index
export const dch = writable("100%"); // dragging card height
export const dcw = writable("100%"); // dragging card width
export const tcEl = writable(null); // dragging card html element (.card-space div)
export const tci = writable(-1); // target card index
export const tcli = writable(-1); // target card list index

// multiple cards select
const selecteds: [number, number][] = [[-1, -1]];
export const selectedCards = writable(selecteds); // target card list index

// global
const users: TCardUser[] = [];
const emptyLoggedUserCopy = { ...log };
export const allUsers = writable(users); // all possible users
export const logged = writable(emptyLoggedUserCopy); // logged user

// mouse
export const dir = writable({ x: "right", y: "up" }); // mouse direction
export const pos = writable({ x: 0, y: 0 }); // mouse position
export const relPos = writable({ x: 0, y: 0 }); // relative element mouse position
