/**
 * Add the child formfield to the context
 * @param fieldName the name of the field
 * @param value the initial value
 * @param isValid the initial value is valid
 * @param isRequired true if field is required
 * @param htmlElement the most external layer of the component, e.g.: a wrapper div
 */
export type TAddFieldToContext = (
  fieldName: string,
  value: unknown,
  isValid: boolean,
  isRequired: boolean,
  htmlElement: HTMLElement,
)=> void;

/**
 * Set the formfield value
 * @param fieldName the name of the field
 * @param value the value of the field, can be anything, an array, a string
 * @param isvalid true if the value is valid. e.g.: required field + value="", isvalid is false
 */
export type TSetFieldValue = (fieldName: string, value: unknown, isvalid: boolean)=> void;

/**
 * Remove the formfield from the form context.
 * Use when your formfield component be destroyed
 * @param fieldName the name of the field
 */
export type TRemoveFieldFromContext = (fieldName: string)=> void;

/**
 * Dispatch the form submit event.
 * Works like the submit button for defaut html form tag.
 */
export type TFireSubmit = ()=> void;

export type TFormContext = {
  setFieldValue: TSetFieldValue,
  addFieldToContext: TAddFieldToContext,
  removeFieldFromContext: TRemoveFieldFromContext,
  fireSubmit: TFireSubmit,
}
