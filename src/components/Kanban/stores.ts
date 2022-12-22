import { writable } from 'svelte/store';
import type { TCardUser, TCardLabel, TBoard } from "./data/types"

// lists
export const dlEl = writable(null); // dragging list html element (.list div)
export const dli = writable(-1); // dragging list index
export const tlEl = writable(null); // target list html element (.lane div)
export const tli = writable(-1); // target list index

// cards
export const dcEl = writable(null); // dragging card html element (.card div)
export const dci = writable(-1); // dragging card index
export const dcli = writable(-1); // dragging card list index
export const dch = writable("100%"); // dragging card height
export const dcw = writable("100%"); // dragging card width
export const tcEl = writable(null); // dragging card html element (.card-space div)
export const tci = writable(-1); // target card index
export const tcli = writable(-1) // target card list index

// global 
let users: TCardUser[] = [];
export const allUsers = writable(users) // all posible users
let labels: TCardLabel[] = [];
export const allLabels = writable(labels) // all posible labels

let boardData: TBoard = null;
export const board = writable(boardData) // all posible labels

// mouse
export const dir = writable({ x: "right", y: "up" }); // mouse direction
export const pos = writable({ x: 0, y: 0 }); // mouse position
export const relPos = writable({ x: 0, y: 0 }); // relative element mouse position

// board
export const lang = writable("en"); // kanban language



