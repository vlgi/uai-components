<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy } from "svelte";
  import type { ComponentProps } from "svelte";
  import Button from "../Button/Button.svelte";
  import type { TFormContext } from "../../Form/types";

  /* eslint-disable*/
  interface $$Props extends ComponentProps<Button> {
    name: string;
    acceptedFileTypes: string;
  }
  /* eslint-enable*/

  // set the FileSelector name
  export let name = "file-selector";
  /**
   * Set the types of files accepted on input field
   * You can pass the desired file extension or the media_type
   * Use image/*, video/* or audio/* to wrap all types of a media
   *
   */
  export let acceptedFileTypes = ".pdf,image/*";
  // set the FileSelector requires
  export let required = true;

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (value: File) => undefined | string | boolean = () => true;

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  export let files: FileList | null = null;
  export let inputEl: HTMLInputElement | null = null;
  export let value: File = null;

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
    return _value != null;
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
  accept={acceptedFileTypes}
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
