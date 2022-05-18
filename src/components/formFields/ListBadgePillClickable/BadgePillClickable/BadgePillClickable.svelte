<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import Icon from "../../../Icon/Icon.svelte";
  import type { TFormContext } from "../../../Form/types";

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";

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

  let wrapperElement: HTMLElement;

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
    /**
     * Dispatch event with the value of the bagde component when click in the badge
     */
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

<div
  class="badge-pill-item badge-style-{badgeStyle}"
  class:invalid={!isValid}
  class:on={checked}
  class:off={!checked}
  {id}
  bind:this={wrapperElement}
  on:click={dispatchValue}
  on:click={() => {
    checked = !checked;
  }}
>
  <input
    type="hidden"
    {name}
    {id}
    bind:this={inputElement}
    on:click={() => {
      dispatchValue();
    }}
  />
  {#if iconPosition === "left" || iconPosition === "both"}
    <Icon iconName="close-circle" />
  {/if}
  <label for={id} class="badge-label">
    {label !== undefined ? label : ""}
  </label>
  {#if iconPosition === "right" || iconPosition === "both"}
    <Icon iconName="close-circle" />
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
    --badge-pill-background-color: var(--szot-badge-pill-background-color, green);
    --badge-pill-max-width: var(--szot-badge-pill-max-width, auto);
    --badge-pill-font-size: var(--szot-badge-pill-font-size, var(--theme-fields-font-size));

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

    &.badge-style-primary {
      --default-border-color: var(--theme-primary-txt);
      --default-label-color: var(--theme-primary-txt);
      --default-icon-color: var(--theme-primary-txt);
    }

    &.badge-style-secondary {
      --default-border-color: var(--theme-secondary-txt);
      --default-label-color: var(--theme-secondary-txt);
      --default-icon-color: var(--theme-secondary-txt);
    }

    --szot-icon-color: var(--badge-pill-icon-color);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    max-width: var(--badge-pill-max-width);
    height: var(--badge-pill-height);
    min-height: var(--badge-pill-min-height);
    position: relative;
    padding: 0 0.375em;
    margin: var(--badge-pill-margin);
    border-radius: var(--border-radius);
    @include m.border(var(--border-size), var(--badge-pill-border-color));

    .badge-label {
      @include m.text-color(var(--badge-pill-label-color));
      font-size: var(--badge-pill-font-size);
      font-weight: normal;
      margin-inline: 0.5rem;
    }
  }

  .invalid {
    --szot-badge-pill-icon-color: var(--theme-error);
    --szot-badge-pill-label-color: var(--theme-error);
    --szot-badge-pill-border-color: var(--theme-error);
    @include m.text-color(var(--theme-error));
  }

  .on {
    background: var(--badge-pill-background-color);
  }

  .off {
    background: none;
  }

  .error {
    @include m.form-field-error-text();
    display: none;
    opacity: 0;
    transition: opacity 0.2s linear, bottom 0.2s;
  }
  .error-show {
    display: unset;
    color: var(--theme-error);
    @include m.form-field-error-text();
  }
</style>
