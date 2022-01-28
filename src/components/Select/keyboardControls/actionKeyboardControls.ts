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
        dispatchEvent(node, "actionToggleFocused");
      } else if (!dropdownOpen) {
        dispatchEvent<boolean>(node, "actionToggleDropdown", true);
      }
      break;

    case "ArrowDown":
      dispatchEvent(node, "actionFocusNext");
      if (!multiple && !dropdownOpen) dispatchEvent(node, "actionToggleFocused");
      break;
    case "ArrowUp":
      dispatchEvent<boolean>(node, "actionFocusPrevious");
      if (!multiple && !dropdownOpen) dispatchEvent(node, "actionToggleFocused");
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
    if (!node.contains(newFocus)) {
      node.dispatchEvent(new CustomEvent("actionToggleDropdown", { detail: false }));
    }
  }

  node.addEventListener("keydown", handleKeyboard);
  node.addEventListener("focusout", handleBlur);

  return {
    update(_params: TKeyboardControlsParams) {
      multiple = _params.multiple;
      dropdownOpen = _params.dropdownOpen;
    },
    destroy() {
      node.removeEventListener("keydown", handleKeyboard);
      node.removeEventListener("focusout", handleBlur);
    },
  };
}
