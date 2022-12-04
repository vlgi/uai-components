import Hammer from "hammerjs";

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
  return temp;
}

export function getElementXAxisCenter(el: HTMLElement): number {
  const offsetEl = el.getBoundingClientRect();
  const xAxisElCenter = offsetEl.left + offsetEl.width / 2;
  return xAxisElCenter;
}

export function checkElementsPosition(first: HTMLElement, second: HTMLElement): boolean {
  const firstXCenter = getElementXAxisCenter(first);
  const secondXCenter = getElementXAxisCenter(second);
  if (firstXCenter < secondXCenter || firstXCenter > secondXCenter) return true;
  return false;
}

export function getRelativePosition(mx: number, my: number, el: HTMLElement): number[] {
  const rect = el.getBoundingClientRect();
  return [
    mx - rect.left,
    my - rect.top
  ]
}

export function setElementPan(
  node: HTMLDivElement,
  diffX: number = 0,
  diffY: number = 0
): void {
  let hammertime: HammerManager; // global HammerManager
  hammertime = new Hammer(node);
  hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on("pan", (ev: HammerInput) => {
    if (
      window.innerWidth < ev.center.x ||
      window.innerHeight < ev.center.y ||
      ev.center.x < 0 ||
      ev.center.y < 0
    )
      return;
    const x = diffX > 0 ? diffX : 0;
    const y = diffY > 0 ? diffY : 0;
    node.style.left = `${ev.center.x - x}px`;
    node.style.top = `${ev.center.y + 5}px`;
  });
}