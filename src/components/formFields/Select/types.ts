export type TOption = { text: string }
export type TOptionsListBinds = {
  unfocusItems?: ()=> void,
  focusNext?: ()=> void,
  focusPrevious?: ()=> void,
  toggleSelectedOfFocused?: ()=> void,
}
