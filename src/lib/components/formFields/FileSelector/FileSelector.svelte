<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy, type ComponentProps } from "svelte";
  import Button from "../Button/Button.svelte";
  import type { TFormContext } from "../../Form/types";

  /* eslint-disable*/
  interface $$Props extends ComponentProps<Button> {
    name: string;
    accept: string;
  }
  /* eslint-enable*/

  // set the FileSelector name
  export let name = "file-selector";
  // set the FileSelector files types accepted
  export let accept = ".pdf,image/*";
  // set the FileSelector requires
  let required = true;

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  let validationFn: (value: File) => undefined | string | boolean = () => true;

  /** if you want to force invalid, change it to true */
  let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  let isValid = true;

  let files: FileList;
  let inputEl: HTMLInputElement;
  let value: File;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } =
    isInsideContext && getContext<TFormContext>("FormContext");

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
    } else if (answer === false) {
      isValid = false;
    } else if (typeof answer === "string") {
      isValid = false;
    }
  }

  // function to form context force input value
  function forceValue(_value: File) {
    value = _value;
  }

  function validation() {
    isValid = true;
    value = files[0];
    if (forceInvalid) {
      isValid = false;
    } else if (required) {
      isValid = value instanceof File;
    } else {
      checkStatus(validationFn(value));
    }
  }

  function validateInput(_value: File) {
    if (_value != null) return true;
    return false;
  }

  $: if (inputEl) {
    if (files != null) {
      value = files[0];
    } else {
      value = null;
    }
    isValid = validateInput(value);
    if (isInsideContext) {
      setFieldValue(name, value, isValid);
    }
  }

  $: if (files != null) value = files[0];

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(name, value, isValid, required, inputEl, validation, forceValue);
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<input
  type="file"
  {name}
  {accept}
  {required}
  bind:files
  bind:this={inputEl}
/>
<Button
  {...$$restProps}
  type="button"
  on:click={() => inputEl.click()}
>
  <slot />
</Button>

<style lang="scss">
  input {
    display: none;
  }
</style>
