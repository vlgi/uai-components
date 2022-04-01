<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import RadioButton from "./RadioButton/RadioButton.svelte";
  import type { TFormContext } from "../../Form/types";

  type TRadioProps = {
    value: string;
    label?: string;
  };

  type TRadioStyleType = "filled" | "notFilled";

  export let name = "radio-list";
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName = "";
  /**
   * The radioStyleType property for this element
   * @type {string}
   */
  export let radioStyleType: TRadioStyleType = "notFilled";

  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let radioOptions: TRadioProps[] = [];

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (
    value: string
  ) => undefined | string | boolean = () => true; //eslint-disable-line

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  export let value = "";
  export let required = false;

  let eMsg = "";
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue, addFieldToContext, removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
    } else if (answer === false) {
      isValid = false;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      eMsg = answer;
    }
  }

  function validation() {
    isValid = true;
    if (forceInvalid) {
      isValid = false;
      eMsg = errorMsg;
    } else if (required) {
      isValid = value !== "" && value !== null && value !== undefined;
      eMsg = "Selecione uma opção";
    } else {
      checkStatus(validationFn(value));
    }
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (wrapperElement && isInsideContext) {
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
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="list-radio-box">
  <span class="radio-title" class:invalid={!isValid}>{listName}</span>
  <ul class="list-radio" class:invalid={!isValid}>
    {#each radioOptions as radio, i}
      <li>
        <RadioButton
          {name}
          {radioStyleType}
          id="{name}-{i}"
          bind:group={value}
          value={radio.value}
          label={radio.label}
        />
      </li>
    {/each}
    <p class="error" class:error-show={!isValid}>
      {eMsg}
    </p>
  </ul>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;
  .list-radio-box {
    --radio-label-color: var(--szot-radio-label, var(--theme-primary-txt));
    box-sizing: border-box;

    .radio-title {
      color: var(--radio-label-color);
    }
    .list-radio {
      list-style: none;
    }
    .invalid {
      --szot-radio-color: var(--theme-error);
      --szot-radio-label: var(--theme-error);
      color: var(--theme-error);
    }

    .error {
      @include m.form-field-error-text();
      display: none;
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
    }
    .error-show {
      display: inherit;
      @include m.form-field-error-text();
    }
  }
</style>
