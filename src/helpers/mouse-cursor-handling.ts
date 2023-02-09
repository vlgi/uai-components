import type { TPosition } from "./types";

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

export function removeDuplicates(arr: unknown[]): unknown[] {
  const uniqueArray = arr.filter((value, index) => {
    const strValue = JSON.stringify(value);
    return index === arr.findIndex((obj) => JSON.stringify(obj) === strValue);
  });
  return uniqueArray;
}
