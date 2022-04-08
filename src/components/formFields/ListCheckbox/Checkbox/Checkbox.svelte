<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

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
   * Value is not expected to be set manually, only by changing "checked"
   */
  export let value: string | boolean = true;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

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

<div class="checkbox-item" class:invalid={!isValid}>
  <input
    type="checkbox"
    {name}
    {id}
    class="checkbox-input"
    bind:checked
    bind:this={inputElement}
    on:click={() => {
      dispatchValue();
    }}
  />

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
    --checkbox-size: var(--szot-checkbox-size, 1rem);
    --border-size: var(--szot-border-size, 0.15em);
    --border-color: var(--szot-border-color, var(--theme-dark-txt));
    --checkbox-color: var(--szot-checkbox-color, var(--border-color));
    --checkbox-label-color: var(
      --szot-checkbox-label,
      var(--theme-dark-txt)
    );

    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    position: relative;
    padding: 0 0.375em;
    margin: var(--checkbox-margin);

    .checkbox-input {
      /* Remove most all native input styles */
      appearance: none;
      margin-right: 20px;

      color: var(--checkbox-color);
      min-width: var(--checkbox-size);
      height: var(--checkbox-size);
      border: var(--border-size) solid var(--checkbox-color);
      border-radius: var(--border-size);
      transform: translateY(-0.075em);
      display: grid;
      place-content: center;
    }

    .checkbox-input::before {
      content: "";
      width: calc(var(--checkbox-size) - 0.5em);
      height: calc(var(--checkbox-size) - 0.5em);
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      background-color: var(--checkbox-color);
    }

    .checkbox-input:checked::before {
      transform: scale(1);
    }

    .checkbox-label {
      color: var(--checkbox-label-color);
      font-weight: normal;
    }
  }
  .invalid {
    --szot-checkbox-color: var(--theme-error);
    --szot-checkbox-label: var(--theme-error);
    color: var(--theme-error);
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
