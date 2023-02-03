import Fuse from "fuse.js";
import type { TCardAttachment, TPosition } from "./data/types";

// switch arr elements positions by index
export function switchElsPositionByIndex<T>(
  arr: T[],
  first: number,
  second: number,
): T[] {
  const temp = [...arr];
  temp[first] = arr[second];
  temp[second] = arr[first];
  return temp;
}

// reorder array element positions by current index and target index
export function changeElPositionByIndex<T>(
  arr: T[],
  currPos: number, // current index
  targetPos: number, // target index
): T[] {
  const temp = [...arr];
  const element = temp.splice(currPos, 1)[0];
  temp.splice(targetPos, 0, element);
  return temp;
}

// get mouse relative position of an element
export function getRelativePosition(mx: number, my: number, el: Element): TPosition {
  const rect = el.getBoundingClientRect();
  return { x: mx - rect.left, y: my - rect.top };
}

// returns mouse position
export function getMousePosition(e: MouseEvent): TPosition {
  const pos = { x: 0, y: 0 };
  pos.x = e.clientX;
  pos.y = e.clientY;
  return pos;
}

// change html element position
export function changeElementPosition(
  pos: TPosition, node: HTMLElement, relative: TPosition,
): void {
  if (pos && node && relative) {
    node.style.left = `${pos.x - relative.x}px`;
    node.style.top = `${pos.y + relative.y}px`;
  }
}

let [oldX, oldY] = [0, 0];
let [xDir, yDir] = ["", ""];
export function getMouseDirection(e: MouseEvent): { x: string, y: string } {
  if (e.pageX < oldX) xDir = "left";
  if (e.pageX > oldX) xDir = "right";
  if (e.pageY < oldY) yDir = "up";
  if (e.pageY > oldY) yDir = "down";
  [oldX, oldY] = [e.pageX, e.pageY];
  return { x: xDir, y: yDir };
}

// return the first letter of the first and last names
export function returnInitialsNames(name: string): string {
  const splitted = name.split(" ");
  const first = splitted[0].charAt(0);
  const last = splitted[splitted.length - 1].charAt(0);
  return first + last;
}

export function compareObjects<T>(obj1: T, obj2: T): boolean {
  const obj1String = JSON.stringify(obj1, Object.keys(obj1).sort());
  const obj2String = JSON.stringify(obj2, Object.keys(obj2).sort());
  return obj1String === obj2String;
}

export function checkIfItemIsInArray<T>(
  item: T,
  arr: T[],
): { isInIt: boolean; index: number } {
  let isInIt = false;
  let index = -1;
  index = arr.findIndex((x: T) => compareObjects(x, item));
  if (index !== -1) isInIt = true;
  return { isInIt, index };
}

export function getFilenameFromUrl(url: string): string {
  return url.substring(url.lastIndexOf("/") + 1);
}

export function getCover(atts: TCardAttachment[]): string {
  if (!atts) return "";
  for (let index = 0; index < atts.length; index++) {
    if (atts[index].isCover) return atts[index].url;
  }
  return "";
}

export function isImage(url: string): boolean {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export function dateObjToHtmlString(date: Date): string {
  if (!date) return "";
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  const nDate = new Date(date.getTime() - tzoffset).toISOString();
  return nDate.slice(0, 16);
}

export function removeDuplicates(arr: unknown[]): unknown[] {
  const uniqueArray = arr.filter((value, index) => {
    const strValue = JSON.stringify(value);
    return index === arr.findIndex((obj) => JSON.stringify(obj) === strValue);
  });
  return uniqueArray;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}

export function fuzzySearch<T>(
  list: T[],
  pattern: string,
  keys: string[],
  threshold = 0.3,
): unknown[] {
  const all = JSON.parse(JSON.stringify(list)) as T[];
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold,
    useExtendedSearch: true,
    keys: [...keys],
  };
  const fuse = new Fuse(all, options);
  return fuse.search(pattern);
}

export function throttle
  <T extends(...args: unknown[])=> unknown>(fn: T, waitTime: number): T {
  let timer = null;
  let lastExec = null;

  function returnFn(...args): void {
    if (!lastExec) {
      fn.apply(args);
      lastExec = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if ((Date.now() - lastExec) >= waitTime) {
          fn.apply(args);
          lastExec = Date.now();
        }
      }, waitTime - (Date.now() - lastExec));
    }
  }
  return returnFn as T;
}
