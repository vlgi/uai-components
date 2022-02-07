export type TOption = { text: string }
export type TSelectAttributes = {
  name: string,
  id: string,
}
export type TOptionsListBinds = {
  unfocusItems?: ()=> void,
  focusNext?: ()=> void,
  focusPrevious?: ()=> void,
  toggleSelectedOfFocused?: ()=> void,
}
