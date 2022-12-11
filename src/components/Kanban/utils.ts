export function switchElsPositionByIndex(
  arr: any[],
  first: number,
  second: number
): any[] {
  let temp = [...arr];
  temp[first] = arr[second];
  temp[second] = arr[first];
  return temp;
}

export function changeElPositionByIndex(
  arr: any[],
  first: number,
  second: number
): any[] {
  const temp = [...arr]
  const element = temp.splice(first, 1)[0];
  temp.splice(second, 0, element);
  return arr;
}

export function getElementXAxisCenter(el: Element): number {
  const offsetEl = el && el.getBoundingClientRect();
  const xAxisElCenter = offsetEl.left + offsetEl.width / 2;
  return xAxisElCenter;
}

export function checkElementsPosition(first: Element, second: Element): boolean {
  if (!(first && second)) return false;
  const firstXCenter = getElementXAxisCenter(first);
  const secondXCenter = getElementXAxisCenter(second);
  if (firstXCenter < secondXCenter || firstXCenter > secondXCenter) return true;
  return false;
}

export function getRelativePosition(mx: number, my: number, el: Element): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  return { x: mx - rect.left, y: my - rect.top }
}

export function getMousePosition(ev): { x: number; y: number } {
  let pos = { x: 0, y: 0 };
  pos.x = ev.clientX;
  pos.y = ev.clientY;
  return pos;
}

export function changeElementPosition(pos, node, relative): void {
  if (pos && node && relative) {
    node.style.left = `${pos.x - relative.x}px`;
    node.style.top = `${pos.y + relative.y}px`;
  }
}

let oldx = 0;
let dir = "";
export function getMouseDirection(ev) {
  if (ev.pageX < oldx) {
    dir = "left";
  } else if (ev.pageX > oldx) {
    dir = "right";
  }
  oldx = ev.pageX;
  return dir;
}
