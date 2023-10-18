export type TOption = { text: string; [key: string]: string | number };
export type TOptionsListBinds = {
  unfocusItems?: () => void;
  focusNext?: () => void;
  focusPrevious?: () => void;
  toggleSelectedOfFocused?: () => void;
};
