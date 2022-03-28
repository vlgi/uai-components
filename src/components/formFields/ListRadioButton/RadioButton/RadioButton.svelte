<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
} from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TRadioStyleType = "filled" | "notFilled";

  const dispatch = createEventDispatcher();

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the radio element
   * @type {string}
   */
  export let name = "radio-item";

  export let id = name;

  /**
   * The radioStyleType text for this element
   * @type {string}
   */
  export let radioStyleType: TRadioStyleType = "notFilled";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * The function that will be used for extra validation on this field.
   * It is expected to return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (
    value: string
  )=> undefined | string | boolean = () => true;

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * If received on props, defines if the radio is default checked.
   * @type {boolean}
   */
  export let checked = false;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  let value = "";
  export let required = false;

  let invalid = forceInvalid;
  // const helper = false;
  let eMsg = "";
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } = isInsideContext && getContext<TFormContext>("FormContext");

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
      invalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      invalid = !isValid;
      eMsg = answer;
    }
  }

  function validation() {
    if (forceInvalid) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (required && !value) {
      isValid = false;
      invalid = !isValid;
      eMsg = "Este campo é obrigatorio";
    } else {
      checkStatus(validationFn(value));
    }
  }

  function setValue(ev: HTMLInputElement) {
    dispatch("checkItem", ev);
    inputElement = ev;
    const x = ev.value;
    value = x;
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        isValid,
        required,
        wrapperElement,
        validation,
      );
    }
    if (checked) setValue(inputElement);
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="radio-item">
  <input
    {...$$restProps}
    type="radio"
    {name}
    {id}
    class="radio-input radio-style-type-{radioStyleType}"
    {checked}
    bind:this={inputElement}
    on:click={() => {
      setValue(inputElement);
    }}
  />

  <label for={id} class="radio-label">{label !== undefined ? label : ""}</label>
</div>

<style lang="scss">
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --border-color: var(--szot-border-color, var(--theme-primary-txt));
    --radio-color: var(--szot-radio-color, var(--border-color));
    --radio-label-color: var(--szot-radio-label, var(--theme-primary-txt));

    display: inline-block;
    position: relative;
    padding: 0 0.375rem;
    margin: var(--radio-margin);

    .radio-input {
      display: none;
    }

    .radio-label {
      color: var(--radio-label-color);
      font-weight: normal;
    }

    .radio-label:before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 0.1875rem;
      margin: 0 0.3125rem 0 0;
      width: var(--radio-size);
      height: var(--radio-size);
      border-radius: calc(var(--radio-size) / 2);
      border: 0.125rem solid var(--radio-color);
      background-color: transparent;
    }

    .radio-input:checked + .radio-label:after {
      width: calc(var(--radio-size) - 0.5rem);
      height: calc(var(--radio-size) - 0.5rem);
      border-radius: calc(var(--radio-size) / 2);
      position: absolute;
      top: 0.4375rem;
      left: 0.625rem;
      content: " ";
      display: block;
      background: var(--radio-color);
    }

    .radio-style-type-filled:checked + .radio-label:before {
      background-color: var(--radio-color);
    }
  }
</style>
