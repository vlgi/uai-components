<script lang="ts">
import {
  getContext, hasContext, setContext,
} from "svelte";
import Cleave from "cleave.js";
import type { CleaveOptions } from "cleave.js/options";
import Input from "../Input/Input.svelte";
import type { TFormContext, TAddFieldToContext } from "../../Form/types";

/** choose an icon from the list */
export let icon: string|null = null;

type TpositionIcon = "left" | "right";
/** if there is an icon define if it goes to the left or to the right */
export let iconPosition: TpositionIcon = "right";

type Tborders = "bottom" | "outline";
/** choose border type */
export let border: Tborders = "outline";

type TborderStyle = "primary" | "secondary" | "dark" | "light";

/** choose default theme colors */
export let inputStyle: TborderStyle = "primary";

/** write a helpertext if needed */
export let helperText = "";

/** Enter a message in case it is invalid */
export let errorMsg = "";

/**
 * Pass the function to validation.
 * Return true/undefined if valid,
 * or a string to show the error, or false to show the "errorMsg" props.
*/
export let validationFn: (value: string)=> undefined|string|boolean = () => true;

/** if you want to force invalid, change it to true */
export let forceInvalid = false;

/** shows if the component is valid (readonly) */
export let isValid = true;

/** Enter label text */
export let label = "";

/**
 * The input element (readonly)
 * @type {HTMLInputElement}
 * */
export let inputElement: HTMLInputElement|null = null;

/**
 * required
 * @type {string}
 */
export let name: string;
export let type = "text";
export let value = "";
export let internalInputValue = "";
export let disabled = false;
export let readonly = false;
export let required = false;
// export let id = "input";

// Other attributes for the HTML input element
export let inputAttributes: Record<string, string> = {};

/* =============== Masking variables =============== */

/**
 * The [CleaveOptions](https://github.com/nosir/cleave.js/blob/master/doc/options.md) used for the mask.
 * @type {object}
 */
export let cleaveOptions: CleaveOptions = {};

let cleave: Cleave;
let lockValueChange = false;

/* ================== Overriding the context ================== */

let addedToContext = false;

// Get the original context
const isInsideContext = hasContext("FormContext");
const {
  setFieldValue,
  addFieldToContext,
  removeFieldFromContext,
  fireSubmit,
} = isInsideContext && getContext<TFormContext>("FormContext");

// Create an overriding add context function
const addFieldToContextOverride: TAddFieldToContext = (
  _fieldName: string,
  _value: unknown,
  _isValid: boolean,
  _isRequired: boolean,
  _htmlElement: HTMLElement,
  _validation: ()=> void,
) => {
  addFieldToContext(
    _fieldName,
    _value,
    _isValid,
    _isRequired,
    _htmlElement,
    _validation,
  );
  addedToContext = true;
};

// Override the context with our proxy
if (isInsideContext) {
  setContext<TFormContext>("FormContext", {
    setFieldValue: () => undefined,
    addFieldToContext: addFieldToContextOverride,
    removeFieldFromContext,
    fireSubmit,
  });
}

/* ============== Cleave management ============== */

type TCleaveEvent = {
  target: {
    rawValue: string,
    value: string,
    name: string,
  }
}

function instantiateCleave() {
  cleave = new Cleave(inputElement, {
    ...cleaveOptions,
    onValueChanged: ({ target }: TCleaveEvent) => {
      const { rawValue, value: maskedValue } = target;
      lockValueChange = true;
      value = rawValue;
      internalInputValue = maskedValue;
    },
  });
}

function destroyCleave() {
  if (cleave) {
    cleave.destroy();
    cleave = undefined;
  }
}

// Update masking when changing configuration
// Also instantiate when inputElement is available
$: if (cleaveOptions && inputElement) {
  destroyCleave();
  instantiateCleave();
}

// Keep value consistent when updating
$: if (cleave) {
  if (lockValueChange) {
    lockValueChange = false;
  } else {
    cleave.setRawValue(`${value}`);
  }
}

// Update form state correctly
$: if (addedToContext) setFieldValue(name, value, isValid);

</script>

<Input
  on:change
  on:input
  {name}
  bind:value={internalInputValue}
  bind:inputElement
  bind:isValid
  {inputAttributes}
  {border}
  {disabled}
  {errorMsg}
  {helperText}
  {icon}
  {iconPosition}
  {inputStyle}
  {label}
  {readonly}
  {required}
  {type}
  validationFn={() => validationFn(value)}
  {forceInvalid}
  {...$$restProps}
  />
