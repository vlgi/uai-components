import type { TPosition } from "./types";

export function getDropdownPosition(
  dropdownAlignment: TPosition,
  triggerRect: DOMRect,
  dropdownRect: DOMRect
): { top: number; left: number } {
  let pLeft: number;
  let pTop: number;

  // set position
  if (dropdownAlignment.includes("bottom")) {
    pTop = triggerRect.top + triggerRect.height;
  } else if (dropdownAlignment.includes("top")) {
    pTop = triggerRect.top - dropdownRect.height;
  } else if (dropdownAlignment.includes("left")) {
    pLeft = triggerRect.left - dropdownRect.width;
  } else if (dropdownAlignment.includes("right")) {
    pLeft = triggerRect.left + triggerRect.width;
  }

  // set alignment
  if (dropdownAlignment.includes("Right")) {
    pLeft = triggerRect.left + triggerRect.width - dropdownRect.width;
  } else if (dropdownAlignment.includes("Left")) {
    pLeft = triggerRect.left;
  } else if (dropdownAlignment.includes("Top")) {
    pTop = triggerRect.top;
  } else if (dropdownAlignment.includes("Bottom")) {
    pTop = triggerRect.top - dropdownRect.height + triggerRect.height;
  }

  return { left: pLeft, top: pTop };
}

/**
 * Given an element return for each element corner if is visible.
 * With visible we mean: resolving the scroll and nested elements, is still visible.
 * NOTE: we don't check if element have opacity!=0 or visibility!=hidden
 * NOTE2: if some element, even an transparent one, is above this element, this function will
 *        consider the it as not visible.
 */
export function checkElementVisibility(element: HTMLElement): {
  topLeft: boolean;
  bottomLeft: boolean;
  topRight: boolean;
  bottomRight: boolean;
} {
  const elRect = element.getBoundingClientRect();

  const topLeftCornerPosition = {
    top: elRect.top,
    left: elRect.left,
  };
  const bottomLeftCornerPosition = {
    top: elRect.top + elRect.height - 1,
    left: elRect.left,
  };
  const topRightCornerPosition = {
    top: elRect.top,
    left: elRect.left + elRect.width - 1,
  };
  const bottomRightCornerPosition = {
    top: elRect.top + elRect.height - 1,
    left: elRect.left + elRect.width - 1,
  };

  const isVisible = (position: { top: number; left: number }) =>
    document.elementFromPoint(position.left, position.top) === element;

  return {
    topLeft: isVisible(topLeftCornerPosition),
    bottomLeft: isVisible(bottomLeftCornerPosition),
    topRight: isVisible(topRightCornerPosition),
    bottomRight: isVisible(bottomRightCornerPosition),
  };
}

export function getBestValidAlignment(
  requiredAlignment: TPosition,
  validAlignment: TPosition[]
): TPosition {
  const positionsMap: TPosition[] = [
    "rightTop",
    "bottomLeft",
    "bottomRight",
    "leftTop",
    "leftBottom",
    "topRight",
    "topLeft",
    "rightBottom",
  ];
  const clockwise = positionsMap.concat(positionsMap);
  const antiClockwise = clockwise.slice().reverse();
  const currIdxClockwise = clockwise.findIndex((position) => position === requiredAlignment);
  const idxClockwise = clockwise.findIndex((position) => validAlignment.includes(position));
  const currIdxAntiClockwise = clockwise.findIndex((position) => position === requiredAlignment);
  const idxAntiClockwise = antiClockwise.findIndex((position) => validAlignment.includes(position));

  if (idxAntiClockwise - currIdxAntiClockwise < idxClockwise - currIdxClockwise) {
    return antiClockwise[idxAntiClockwise];
  }
  return clockwise[idxClockwise];
}

export function getValidDropdownAlignments(
  triggerElement: HTMLElement,
  dropdownRect: DOMRect
): TPosition[] {
  const triggerRect = triggerElement.getBoundingClientRect();
  const isVisibleOn = checkElementVisibility(triggerElement);
  const validAlignments: TPosition[] = [];
  let invalidAlignments: TPosition[] = [];

  // Valid alignment based on trigger position
  if (isVisibleOn.topLeft) {
    validAlignments.push("topLeft");
    validAlignments.push("leftTop");
  }
  if (isVisibleOn.bottomLeft) {
    validAlignments.push("bottomLeft");
    validAlignments.push("leftBottom");
  }
  if (isVisibleOn.topRight) {
    validAlignments.push("topRight");
    validAlignments.push("rightTop");
  }
  if (isVisibleOn.bottomRight) {
    validAlignments.push("bottomRight");
    validAlignments.push("rightBottom");
  }

  // Valid alignment based on dropdown future position
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  invalidAlignments = validAlignments.filter((alignment) => {
    const newPosition = getDropdownPosition(alignment, triggerRect, dropdownRect);
    return (
      newPosition.left < 0 ||
      newPosition.top < 0 ||
      newPosition.left + dropdownRect.width > vw ||
      newPosition.top + dropdownRect.height > vh
    );
  });

  return validAlignments.filter((x) => !invalidAlignments.includes(x));
}
