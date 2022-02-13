import type { TPosition } from "./types";

export function getDropdownPosition(
  _dropdownAlignment: TPosition,
  triggerRect: DOMRect,
  dropdownRect: DOMRect,
): { top: number, left: number } {
  let pLeft: number;
  let pTop: number;

  // set position
  if (_dropdownAlignment.includes("bottom")) {
    pTop = triggerRect.top + triggerRect.height;
  } else if (_dropdownAlignment.includes("top")) {
    pTop = triggerRect.top - dropdownRect.height;
  } else if (_dropdownAlignment.includes("left")) {
    pLeft = triggerRect.left - dropdownRect.width;
  } else if (_dropdownAlignment.includes("right")) {
    pLeft = triggerRect.left + triggerRect.width;
  }

  // set alignment
  if (_dropdownAlignment.includes("Right")) {
    pLeft = triggerRect.left + triggerRect.width - dropdownRect.width;
  } else if (_dropdownAlignment.includes("Left")) {
    pLeft = triggerRect.left;
  } else if (_dropdownAlignment.includes("Top")) {
    pTop = triggerRect.top;
  } else if (_dropdownAlignment.includes("Bottom")) {
    pTop = triggerRect.top - dropdownRect.height + triggerRect.height;
  }

  return { left: pLeft, top: pTop };
}
