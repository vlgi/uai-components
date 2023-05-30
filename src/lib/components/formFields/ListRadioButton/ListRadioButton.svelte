<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy, createEventDispatcher,
  } from "svelte";
  import RadioButton from "./RadioButton/RadioButton.svelte";
  import type { TFormContext } from "../../Form/types";

  type TRadioProps = {
    value: string;
    label?: string;
  };

  type TRadioStyleType = "filled" | "notFilled" | "badge-pill";
  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";
  type TDirection = "column" | "row";

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

  /**
   * The value for the checked item. Defines which radio button starts checked
   * by receiving its value
   */
  export let value = "";
  export let required = false;

  /**
   * Set the position of the X icon in the styled badge
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the badge
   */
  export let badgeStyle: TBadgeStyle = "dark";

  /**
   * Set if the badges will be displayed in a row or a column
   */
  export let direction: TDirection = "column";

  /**
   * Variable that set if the uncheck of radio button checked is enabled
   * @type {boolean}
   */
  export let enableUncheck = false;

  let eMsg = "";
  let wrapperElement: HTMLElement;

  const dispatcher = createEventDispatcher<{
    click: TRadioProps
  }>();

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

  // function to form context force input value
  function forceValue(_value: unknown) {
    value = _value as string;
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (wrapperElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  $: if (value) validation();

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        isValid,
        required,
        wrapperElement,
        validation,
        forceValue,
      );
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="list-radio-box" bind:this={wrapperElement}>
  <span class="radio-title" class:invalid={!isValid}>{listName}</span>
  <ul class="list-radio {direction}" class:invalid={!isValid}>
    {#each radioOptions as radio, i}
      <li>
        <RadioButton
          {name}
          {radioStyleType}
          {iconPosition}
          {badgeStyle}
          {enableUncheck}
          id="{name}-{i}"
          bind:group={value}
          value={radio.value}
          label={radio.label}
          on:click={() => dispatcher("click", radio)}
        />
      </li>
    {/each}
  </ul>
  <p class="error" class:error-show={!isValid}>
    {eMsg}
  </p>
</div>

<style lang="scss">
  @use "$styles/mixins" as m;
  .list-radio-box {
    --radio-label-color: var(--szot-radio-label-color, var(--theme-dark-txt));
    box-sizing: border-box;

    .radio-title {
      @include m.text-color(var(--radio-label-color));
    }
    .list-radio {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      &.row {
        flex-direction: row;
      }

      &.column {
        flex-direction: column;
      }
    }
    .invalid {
      --szot-radio-color: var(--theme-error);
      --szot-radio-label-color: var(--theme-error);
      --szot-radio-badge-pill-icon-color: var(--theme-error);
      --szot-radio-badge-pill-label-color: var(--theme-error);
      --szot-radio-badge-pill-border-color: var(--theme-error);
      --szot-radio-badge-pill-selected-icon-color: var(--theme-error);
      --szot-radio-badge-pill-selected-label-color: var(--theme-error);
      --szot-radio-badge-pill-selected-border-color: var(--theme-error);
      @include m.text-color(var(--theme-error));
    }

    .error {
      @include m.form-field-error-text();
      display: none;
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
    }
    .error-show {
      display: inherit;
      @include m.text-color(var(--theme-error));
      @include m.form-field-error-text();
    }
  }
</style>
