<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import { isEmpty } from "../../../helpers/truthy";
  import type { TFormContext } from "../../Form/types";

  /** write a helpertext if needed */
  export let helperText = "";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (
    value: number
  ) => undefined | string | boolean = () => true; //eslint-disable-line

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

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
   * Value of the range slider
   * @type {number}
   */
  export let value = 0;

  /**
   * @type {number}
   */
  export let step: number|string = 1;

  /**
   * Min value of the range slider
   * @type {number}
   */
  export let min = 0;

  /**
   * Max value of the range slider
   * @type {number}
   */
  export let max = 1;

  export let disabled = false;
  export let id = name;

  let wrapperElement: HTMLElement;
  let visuallyInvalid = forceInvalid;
  let eMsg = "";
  let helper = false;
  let inFocus = false;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    fireSubmit,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function focused() {
    inFocus = !inFocus;
    if (visuallyInvalid) {
      helper = false;
    } else {
      helper = !helper;
    }
  }

  function changed() {
    visuallyInvalid = false;
    helper = true;
  }

  function setValue(ev: InputEvent) {
    const x = (ev.target as HTMLInputElement).value;
    value = Number(x);
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    value = _value as number;
  }

  function submitOnEnter(ev: KeyboardEvent) {
    if (!isInsideContext) return;
    if (ev.key === "Enter") {
      // eslint-disable-next-line no-void
      void fireSubmit();
    }
  }

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
      visuallyInvalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = answer;
    }
  }

  function validation() {
    if (forceInvalid) {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = errorMsg;
    } else {
      checkStatus(validationFn(value));
    }
  }

  function handleWheelEvent(ev: WheelEvent) {
    if (!navigator.userAgent.includes("Firefox")) {
      if (ev.deltaY < 0) {
        value += 1;
      } else {
        value -= 1;
      }

      changed();
    }
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        isValid,
        true,
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

  $: if (forceInvalid) validation();

  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  $: if (!isEmpty(value)) {
    validation();
  }

  $: if (value > max) {
    value = max;

    console.log("Warning: use a value between max and min");
  }

  $: if (value < min) {
    value = min;

    console.log("Warning: use a value between max and min");
  }
</script>

<div
  class="content-container"
  style="
    --range-min: {min};
    --range-max: {max};
    --range-value: {value};
  "
  on:keypress={submitOnEnter}
>
  <div
    class="range-wrapper"
    class:not-half-filled={2 * (value - min) < (max - min)}
    bind:this={wrapperElement}
  >
    <input
      on:focus={focused}
      on:input={changed}
      on:input={setValue}
      on:blur={focused}
      on:blur={validation}
      on:wheel={handleWheelEvent}
      on:input
      on:change
      on:focus
      on:focusout
      on:keydown
      on:keyup
      on:keypress
      type="range"
      class="slider"
      {min}
      {max}
      {id}
      {name}
      {disabled}
      {step}
      bind:this={inputElement}
      bind:value
    />

    <!--
      not half filled add an offset to progress range to avoid gap between progress bar
      and thumb when the value is near min

      hidden do not display progress range when value is equal to min
    -->
    <div
      class="progress-range"
      class:hidden={value === min}
    />
  </div>
  <p class="helper" class:helper-show={helper}>
    {helperText}
  </p>
  <p
    class="error"
    class:error-show={visuallyInvalid}
    class:show={(helper && helperText?.length > 0) || visuallyInvalid}
  >
    {eMsg}
  </p>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .content-container {
    --range-slider-width: var(--szot-range-slider-width, 100%);
    --range-slider-max-width: var(--szot-range-slider-max-width, 100%);
    --range-slider-height: var(--szot-range-slider-height, 0.625rem);
    --range-slider-border-radius: var(--szot-range-border-radius, 3.25rem);
    --range-slider-background-color: var(--szot-range-slider-background-color, #333);
    --range-slider-background-color-filled: var(--szot-range-slider-background-color-filled, var(--range-slider-background-color));
    --range-slider-thumb-width: var(--szot-range-slider-thumb-width, 1.5rem);
    --range-slider-thumb-height: var(--szot-range-slider-thumb-height, 1.5rem);
    --range-slider-thumb-border-radius: var(--szot-range-slider-thumb-border-radius, 50%);
    --range-slider-thumb-background-color: var(--szot-range-slider-thumb-background-color, #d9d9d9);
    --range-slider-thumb-border: var(--szot-range-slider-thumb-border, none);
    --range-slider-margin: var(--szot-range-slider-margin, calc(var(--range-slider-thumb-height) / 2) 0);

    --range-filled: calc(var(--range-value) - var(--range-min));
    --range-gap: calc(var(--range-max) - var(--range-min));
    --range-min-between-widths: min(var(--range-slider-width), var(--range-slider-max-width));
    --range-filled-proportion: calc(var(--range-filled) / var(--range-gap));
    --range-progress-width: calc(var(--range-filled-proportion) * var(--range-min-between-widths));

    .range-wrapper {
      display: grid;
      grid: 1fr / 1fr;
      margin: var(--range-slider-margin);
      width: var(--range-slider-width);
      max-width: var(--range-slider-max-width);
      height: var(--range-slider-height);
      background: var(--range-slider-background-color);
      border-radius: var(--range-slider-border-radius);

      & > * {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }
      &.not-half-filled {
        --offset: calc(var(--range-slider-thumb-width) / 2);
      }
      .progress-range {

        &.hidden {
          display: none;
        }

        width: calc(var(--range-progress-width) + var(--offset, 0rem));
        height: var(--range-slider-height);
        background: var(--range-slider-background-color-filled);
        border-radius: var(--range-slider-border-radius);
        z-index: 1;
        position: relative;
        pointer-events: none;
      }
    }

    /* The slider itself */
    .slider {
      -webkit-appearance: none;  /* Override default CSS styles */
      appearance: none;
      width: var(--range-slider-width);
      max-width: var(--range-slider-max-width);
      height: var(--range-slider-height);
      background: transparent;
      border-radius: var(--range-slider-border-radius);
      z-index: 2;
      position: relative;
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: var(--range-slider-thumb-width);
      height: var(--range-slider-thumb-height);
      border-radius: var(--range-slider-thumb-border-radius);
      background: var(--range-slider-thumb-background-color);
      border: var(--range-slider-thumb-border);
      cursor: pointer; /* Cursor on hover */
    }

    .slider::-moz-range-thumb {
      width: var(--range-slider-thumb-width);
      height: var(--range-slider-thumb-height);
      border-radius: var(--range-slider-thumb-border-radius);
      background: var(--range-slider-thumb-background-color);
      border: var(--range-slider-thumb-border);
      cursor: pointer; /* Cursor on hover */
    }
  }

  p {
    position: relative;
    transition: opacity 0.2s linear, bottom 0.2s;
    margin-left: var(--message-left);

    &.helper {
      @include m.form-field-helper-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
      height: 0;
      @include m.text-color(var(--theme-info));
    }
    &.helper-show {
      @include m.form-field-helper-text();
      @include m.text-color(var(--theme-info));
      height: fit-content;
    }
    &.error {
      @include m.form-field-error-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
      @include m.text-color(var(--theme-error));
      height: 0;
      margin-bottom: var(--margin-bottom);
    }
    &.error-show {
      @include m.form-field-error-text();
      @include m.text-color(var(--theme-error));
      height: fit-content;
    }

    &.show {
      margin-bottom: calc(var(--margin-bottom) - 20px);
    }
  }
</style>
