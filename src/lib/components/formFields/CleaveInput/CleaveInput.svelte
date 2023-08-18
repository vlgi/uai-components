<script lang="ts">
  import { getContext, hasContext, setContext, tick } from "svelte";
  import Cleave from "cleave.js";
  import type { CleaveOptions } from "cleave.js/options";
  import Input from "../Input/Input.svelte";
  import type { TFormContext, TAddFieldToContext } from "../../Form/types";

  /** choose an icon from the list */
  export let icon: string | null = null;

  type TpositionIcon = "left" | "right";
  /** if there is an icon define if it goes to the left or to the right */
  export let iconPosition: TpositionIcon = "right";

  type Tborders = "bottom" | "outline";
  /** choose border type */
  export let border: Tborders = "outline";

  type TborderStyle = "primary" | "secondary" | "dark" | "light";

  type TInputMode = "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";

  /** choose default theme colors */
  export let inputStyle: TborderStyle = "dark";

  /** write a helpertext if needed */
  export let helperText = "";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (value: string) => undefined | string | boolean = () => true;

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
  export let inputElement: HTMLInputElement | null = null;

  /**
   * required
   * @type {string}
   */
  export let name: string;

  /**
   * The type of input keyboard when focus component in a device with onscreen keyboard
   * @type {string}
   */
  export let inputmode: TInputMode = "text";
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
   * Required, if you not need an mask use default Input componente.
   * This componente doesn't work without a valid mask option.
   * @type {object}
   */
  export let cleaveOptions: CleaveOptions;

  let cleave: Cleave;

  /* ================== Overriding the context ================== */

  let addedToContext = false;
  let inputEnabled = true;

  // Get the original context
  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext, fireSubmit } =
    isInsideContext && getContext<TFormContext>("FormContext");

  function cleaveValidation(_value: string) {
    if (required && !_value) {
      return "Este campo é obrigatorio";
    }
    return validationFn(_value);
  }

  // function to form context force input value
  const forceValue = (_value: unknown) => {
    value = _value as string;
  };

  // Create an overriding add context function
  const addFieldToContextOverride: TAddFieldToContext = (
    _fieldName: string,
    _value: unknown,
    _isValid: boolean,
    _isRequired: boolean,
    _htmlElement: HTMLElement,
    _validation: () => void
  ) => {
    addFieldToContext(
      _fieldName,
      _value,
      _isValid,
      _isRequired,
      _htmlElement,
      _validation,
      forceValue
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
      rawValue: string;
      value: string;
      name: string;
    };
  };

  function instantiateCleave() {
    cleave = new Cleave(inputElement, {
      ...cleaveOptions,
      onValueChanged: ({ target }: TCleaveEvent) => {
        const { rawValue, value: maskedValue } = target;
        if (inputEnabled) {
          value = rawValue;
          internalInputValue = maskedValue;
          inputEnabled = false;
        }
      },
    });
  }

  function destroyCleave() {
    if (cleave) {
      cleave.destroy();
      cleave = undefined;
    }
  }

  function enableInput() {
    inputEnabled = true;
  }

  // Update masking when changing configuration
  // Also instantiate when inputElement is available
  $: if (cleaveOptions && inputElement) {
    // to guarantee that input event will be trigger first then cleave input instantiation
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    tick().then(() => {
      destroyCleave();
      instantiateCleave();
    });
  }

  $: if (cleave || addedToContext || value) {
    // Keep value consistent when updating
    if (cleave && value) {
      cleave.setRawValue(value);
    }

    // Update form state correctly
    if (addedToContext) {
      setFieldValue(name, value, isValid);
    }
  }
</script>

<Input
  on:change
  on:input
  on:input={enableInput}
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
  {inputmode}
  validationFn={() => cleaveValidation(value)}
  {forceInvalid}
  {...$$restProps}
/>
