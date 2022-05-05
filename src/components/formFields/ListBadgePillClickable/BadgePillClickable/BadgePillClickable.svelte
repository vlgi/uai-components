<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark";

  const dispatch = createEventDispatcher();

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the badge element
   * @type {string}
   */
  export let name: string;

  /**
   * The id for the badge element. Default = name
   * @type {string}
   */
  export let id = name;

  /**
   * If received on props, defines if the badge is default checked.
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
   * Set the position of the X icon in the styled badge
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the badge
   */
  export let badgeStyle: TBadgeStyle = "dark";

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
  class="badge-pill-item badge-style-{badgeStyle}"
  class:invalid={!isValid}
  class:on={checked}
  class:off={!checked}
  {id}
  on:click={dispatchValue}
  on:click={() => {
    checked = !checked;
  }}
>
  <div class="badge-container">
    <input
      type="checkbox"
      {name}
      {id}
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
  <label for={id} class="badge-label">
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

  .badge-pill-item {
    --badge-pill-margin: var(--szot-badge-pill-margin, 0.3125rem);
    --badge-pill-min-height: var(--szot-badge-pill-min-height, 1.875rem);
    --badge-pill-height: var(--szot-badge-pill-height, auto);
    --border-size: var(--szot-badge-pill-border-size, 0.15rem);
    --border-radius: var(--szot-badge-pill-border-radius, 1rem);
    --badge-pill-border-color: var(--szot-badge-pill-border-color, var(--default-border-color));
    --badge-pill-label-color: var(--szot-badge-pill-label-color, var(--default-label-color));
    --badge-pill-icon-color: var(--szot-badge-pill-icon-color, var(--default-icon-color));

    &.badge-style-dark {
      --default-border-color: var(--theme-dark-txt);
      --default-label-color: var(--theme-dark-txt);
      --default-icon-color: var(--theme-dark-txt);
    }

    &.badge-style-light {
      --default-border-color: var(--theme-light-txt);
      --default-label-color: var(--theme-light-txt);
      --default-icon-color: var(--theme-light-txt);
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: var(--badge-pill-height);
    min-height: var(--badge-pill-min-height);
    position: relative;
    padding: 0 0.375em;
    margin: var(--badge-pill-margin);
    border: var(--border-size) solid var(--badge-pill-border-color);
    border-radius: var(--border-radius);

    .badge-label {
      @include m.text-color(var(--badge-pill-label-color));
      font-weight: normal;
      margin-inline: 0.5rem;
    }

    .icon-close-circle {
      color: var(--badge-pill-icon-color);
    }
  }

  .invalid {
    --szot-badge-pill-icon-color: var(--theme-error);
    --szot-badge-pill-label-color: var(--theme-error);
    --szot-badge-pill-border-color: var(--theme-error);
    @include m.text-color(var(--theme-error));
  }

  .on {
    --badge-pill-background-color: var(--szot-badge-pill-background-color, green);

    background: var(--badge-pill-background-color);
  }

  .off {
    background: none;
  }

  .badge-container {
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
