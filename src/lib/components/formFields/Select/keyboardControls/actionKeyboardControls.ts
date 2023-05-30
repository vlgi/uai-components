function isAlphanumeric(text: string): boolean {
  return text.length === 1
  && (
    (text[0].toUpperCase() >= "A" && text[0].toUpperCase() <= "Z")
    || (text[0].toUpperCase() >= "0" && text[0].toUpperCase() <= "9")
  );
}

function dispatchEvent<T>(node: HTMLElement, eventName: string, detail?: T) {
  node.dispatchEvent(new CustomEvent<T>(eventName, { detail }));
}

type TKeyboardControlsParams = {
  multiple: boolean,
  dropdownOpen: boolean,
}

export function keyboardControls(node: HTMLElement, params: TKeyboardControlsParams): unknown {
  let { multiple, dropdownOpen } = params;

  let touchedInside = false;

  /**
   * Handles when the user uses the keyboard.
   * @param {KeyboardEvent} ev The event emmited by the keyboard.
   */
  function handleKeyboard(ev: KeyboardEvent) {
    const { key, target } = ev;

    let shouldPreventPropagation = true;
    let shouldPreventDefault = true;

    switch (key) {
    case "Escape":
      dispatchEvent<boolean>(node, "actionToggleDropdown", false);
      break;

    case "Enter":
      if (dropdownOpen) {
        dispatchEvent(node, "actiontoggleSelectedOfFocused");
      } else if (!dropdownOpen) {
        dispatchEvent<boolean>(node, "actionToggleDropdown", true);
      }
      break;

    case "ArrowDown":
      dispatchEvent(node, "actionFocusNext");
      if (!multiple && !dropdownOpen) dispatchEvent(node, "actiontoggleSelectedOfFocused");
      break;
    case "ArrowUp":
      dispatchEvent<boolean>(node, "actionFocusPrevious");
      if (!multiple && !dropdownOpen) dispatchEvent(node, "actiontoggleSelectedOfFocused");
      break;
    default:
      if (isAlphanumeric(key)) {
        dispatchEvent<string>(node, "actionType", key);
        if ((target as HTMLElement).nodeName === "INPUT") {
          shouldPreventDefault = false;
        }
        break;
      }
      shouldPreventPropagation = false;
      shouldPreventDefault = false;
      break;
    }

    if (shouldPreventPropagation) {
      ev.stopPropagation();
    }
    if (shouldPreventDefault) {
      ev.preventDefault();
    }
  }

  /**
   * Handles when a blur event happens
   * @param {TOption} option The option that was clicked.
   */
  function handleBlur(ev: FocusEvent) {
    const newFocus = ev.relatedTarget as HTMLElement;
    // NOTE: Since for apps on iOS the blur may not come with a relatedTarget, this redundancy is
    // added to check wether the touch happened inside or outside. `touchedInside` will be true if
    // HTML element touched is contained within the outer Select element. The blur handler cannot be
    // removed because it deals with keyboard navigation.
    if (!node.contains(newFocus) && !touchedInside) {
      node.dispatchEvent(new CustomEvent("actionToggleDropdown", { detail: false }));
    }
  }

  /**
   * Listens to touches on the screen and decides wether or not it was inside the node (Select) and
   * if it should close the dropdown.
   *
   * @param ev The touch event that happened on the body of the app.
   */
  function handleTouchStart(ev: TouchEvent) {
    const touched = ev.target as HTMLElement;
    if (node.contains(touched)) {
      touchedInside = true;
    } else {
      touchedInside = false;
      node.dispatchEvent(new CustomEvent("actionToggleDropdown", { detail: false }));
    }
  }

  node.addEventListener("keydown", handleKeyboard);
  node.addEventListener("focusout", handleBlur);
  // Listens for clicks inside and outside the node.
  document.body.addEventListener("touchstart", handleTouchStart);

  return {
    update(_params: TKeyboardControlsParams) {
      multiple = _params.multiple;
      dropdownOpen = _params.dropdownOpen;
    },
    destroy() {
      node.removeEventListener("keydown", handleKeyboard);
      node.removeEventListener("focusout", handleBlur);
      document.body.removeEventListener("touchstart", handleTouchStart);
    },
  };
}
