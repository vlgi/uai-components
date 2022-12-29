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

let [oldx, oldy] = [0, 0];
let [xDir, yDir] = ["", ""];
export function getMouseDirection(ev): { x: string, y: string } {
  if (ev.pageX < oldx) xDir = "left";
  if (ev.pageX > oldx) xDir = "right";
  if (ev.pageY < oldy) yDir = "up";
  if (ev.pageY > oldy) yDir = "down";
  [oldx, oldy] = [ev.pageX, ev.pageY];
  return { x: xDir, y: yDir };
}

export function returnInitialsNames(words: string): string {
  const splitted = words.split(" ");
  const first = splitted[0].charAt(0);
  const last = splitted[splitted.length - 1].charAt(0);
  return first + last;

}


export function checkIfItemIsInArray(item, arr): { isInIt: boolean; index: number } {
  let isInIt = false;
  let index = -1;
  for (var i = 0; i < arr.length; i++) {
    if (JSON.stringify(item) == JSON.stringify(arr[i])) {
      [isInIt, index] = [true, i];
      break;
    }
  };
  return { isInIt, index };
}

export function getCaretCharacterOffsetWithin(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  } else if ((sel = doc.selection) && sel.type != "Control") {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

function createRange(node, chars, range?) {
  if (!range) {
    range = document.createRange()
    range.selectNode(node);
    range.setStart(node, 0);
  }

  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (node && chars.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; lp < node.childNodes.length; lp++) {
        range = createRange(node.childNodes[lp], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  }

  return range;
};

export function setCurrentCursorPosition(chars, node) {
  if (chars >= 0) {
    const selection = window.getSelection();
    const range = createRange(node, { count: chars });
    if (range) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};