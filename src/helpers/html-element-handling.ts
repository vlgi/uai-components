import type { TPosition } from "./types";

// change html element position
export function changeElementPosition(
  pos: TPosition, node: HTMLElement, relative: TPosition,
): void {
  if (pos && node && relative) {
    node.style.left = `${pos.x - relative.x}px`;
    node.style.top = `${pos.y + relative.y}px`;
  }
}
