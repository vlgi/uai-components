<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TCheckboxStyleType = "checkbox-input" | "switch";

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
   * The styletype text for this element
   * @type {string}
   */
  export let styleType: TCheckboxStyleType = "checkbox-input";

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
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="checkbox-item" class:invalid={!isValid}>
  <div class="border-{styleType}">
    <input
      type="checkbox"
      {name}
      {id}
      class={styleType}
      bind:checked
      bind:this={inputElement}
      on:click={() => {
        dispatchValue();
      }}
    />
    {#if styleType === "switch"}
      <span
        class="slider"
        class:checked
        on:click={() => {
          checked = !checked;
        }}
      >
        <span class="slider-checked" />
      </span>
    {/if}
  </div>
  <label for={id} class="checkbox-label">
    {label !== undefined ? label : ""}
  </label>
</div>
<p class="error" class:error-show={!isValid}>
  {#if required}
    Este campo é obrigatório
  {/if}
</p>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .checkbox-item {
    --checkbox-margin: var(--szot-checkbox-margin, 0.3125rem);
    --checkbox-size: var(--szot-checkbox-size, 0.7rem);
    --border-size: var(--szot-checkbox-border-size, 0.15rem);
    --border-radius: var(--szot-checkbox-border-radius, var(--border-size));
    --checkbox-color: var(--szot-checkbox-color, var(--theme-dark-txt));
    --checkbox-label-color: var(
      --szot-checkbox-label-color,
      var(--theme-dark-txt)
    );

    --switch-background: var(--szot-checkbox-switch-background, #dadada);
    --switch-color: var(--szot-checkbox-switch-color, var(--checkbox-color));
    --switch-checked-color: var(
      --szot-checkbox-switch-checked-color,
      var(--switch-color)
    );
    --switch-width: var(--szot-checkbox-switch-width, 3.25rem);
    --switch-height: var(--szot-checkbox-switch-height, 1.5rem);

    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    position: relative;
    padding: 0 0.375em;
    margin: var(--checkbox-margin);

    .border-checkbox-input {
      box-sizing: content-box;
      @include m.border(var(--border-size), var(--checkbox-color));
      border-radius: var(--border-radius);
    }

    .checkbox-input {
      /* Remove most all native input styles */
      appearance: none;
      min-width: var(--checkbox-size);
      height: var(--checkbox-size);
      transform: translateY(-0.025em);
      display: grid;
      place-content: center;
    }

    .checkbox-input::before {
      content: "";
      width: calc(var(--checkbox-size) - 0.125em);
      height: calc(var(--checkbox-size) - 0.125em);
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      background: var(--checkbox-color);
    }

    .checkbox-input:checked::before {
      transform: scale(1);
    }

    .checkbox-label {
      margin-left: 20px;
      @include m.text-color(var(--checkbox-label-color));
      font-weight: normal;
    }

    .border-switch {
      position: relative;
      display: inline-block;
      width: var(--switch-width);
      height: var(--switch-height);

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    .slider {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      transition: 0.4s;

      cursor: pointer;
      background-color: var(--switch-background);
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: calc(1.1 * var(--switch-height));
      width: calc(1.1 * var(--switch-height));
      left: 0;
      bottom: calc(var(--switch-height) * -1 * 0.05);

      background: var(--switch-color);

      transition: 0.4s;
      border-radius: 50%;
    }

    .slider.checked:before {
      transform: translateX(
        calc(var(--switch-width) - 1.1 * var(--switch-height))
      );
    }

    .slider .slider-checked:before {
      position: absolute;
      content: "";
      height: calc(1.1 * var(--switch-height));
      width: calc(1.1 * var(--switch-height));
      bottom: calc(var(--switch-height) * -1 * 0.05);

      transition: 0.4s;
      border-radius: 50%;
      opacity: 0;
    }

    .slider.checked .slider-checked:before {
      background: var(--switch-checked-color);
      opacity: 1;

      transform: translateX(
        calc(var(--switch-width) - 1.1 * var(--switch-height))
      );
    }
  }
  .invalid {
    --szot-checkbox-color: var(--theme-error);
    --szot-checkbox-label-color: var(--theme-error);
    @include m.text-color(var(--theme-error));
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
