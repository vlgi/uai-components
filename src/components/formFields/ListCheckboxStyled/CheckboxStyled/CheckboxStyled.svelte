<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TIconPosition = "left" | "right" | "both" | "none";
  type TCheckboxStyle = "light" | "dark";

  const dispatch = createEventDispatcher();

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the checkbox element
   * @type {string}
   */
  export let name: string;

  /**
   * The id for the checkbox element. Default = name
   * @type {string}
   */
  export let id = name;

  /**
   * If received on props, defines if the checkbox is default checked.
   * @type {boolean}
   */
  export let checked = false;

  /**
   * Value returned to the form (if inside a form) on checked=true
   */
  export let value: string | boolean = true;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  /**
   * Set the position of the X icon in the styled checkbox
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the checkbox
   */
  export let checkboxStyle: TCheckboxStyle = "dark";

  export let required = false;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue, addFieldToContext, removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function validation() {
    isValid = true;
    if (required) {
      isValid = checked;
    }
  }

  function dispatchValue() {
    checked = !checked;
    dispatch("checkItem", value);
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    checked = (_value as string | boolean) === value;
  }

  $: if (checked) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, checked === true ? value : false, true);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        checked === true ? value : false,
        isValid,
        required,
        inputElement,
        validation,
        forceValue,
      );
    }
    if (checked) dispatchValue();
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div
  class="checkbox-styled-item checkbox-style-{checkboxStyle}"
  class:invalid={!isValid}
  on:click={dispatchValue}
>
  <div class="checkbox-container">
    <input
      type="checkbox"
      {name}
      {id}
      class="checkbox-styled"
      bind:checked
      bind:this={inputElement}
      on:click={() => {
        dispatchValue();
      }}
    />
  </div>
  {#if iconPosition === "left" || iconPosition === "both"}
    <span class="icon-close-circle"/>
  {/if}
  <label for={id} class="checkbox-label">
    {label !== undefined ? label : ""}
  </label>
  {#if iconPosition === "right" || iconPosition === "both"}
    <span class="icon-close-circle"/>
  {/if}
</div>
<p class="error" class:error-show={!isValid}>
  {#if required}
    Este campo é obrigatório
  {/if}
</p>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .checkbox-styled-item {
    --checkbox-margin: var(--szot-checkbox-margin, 0.3125rem);
    --checkbox-min-height: var(--szot-checkbox-min-height, 1.875rem);
    --checkbox-height: var(--szot-checkbox-height, auto);
    --border-size: var(--szot-checkbox-border-size, 0.15rem);
    --border-radius: var(--szot-checkbox-border-radius, 1rem);
    --checkbox-border-color: var(--szot-checkbox-border-color, var(--default-border-color));
    --checkbox-label-color: var(--szot-checkbox-label-color, var(--default-label-color));
    --checkbox-icon-color: var(--szot-checkbox-icon-color, var(--default-icon-color));

    &.checkbox-style-dark {
      --default-border-color: var(--theme-dark-txt);
      --default-label-color: var(--theme-dark-txt);
      --default-icon-color: var(--theme-dark-txt);
    }

    &.checkbox-style-light {
      --default-border-color: var(--theme-light-txt);
      --default-label-color: var(--theme-light-txt);
      --default-icon-color: var(--theme-light-txt);
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: var(--checkbox-height);
    min-height: var(--checkbox-min-height);
    position: relative;
    padding: 0 0.375em;
    margin: var(--checkbox-margin);
    border: var(--border-size) solid var(--checkbox-border-color);
    border-radius: var(--border-radius);

    .checkbox-label {
      @include m.text-color(var(--checkbox-label-color));
      font-weight: normal;
      margin-inline: 0.5rem;
    }

    .icon-close-circle {
      color: var(--checkbox-icon-color);
    }
  }
  .invalid {
    --szot-checkbox-color: var(--theme-error);
    --szot-checkbox-label-color: var(--theme-error);
    @include m.text-color(var(--theme-error));
  }

  .checkbox-container {
    display: none;
  }

  .error {
    @include m.form-field-error-text();
    display: none;
    opacity: 0;
    transition: opacity 0.2s linear, bottom 0.2s;
  }
  .error-show {
    display: unset;
    @include m.form-field-error-text();
  }
</style>
