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

  export let id = name;

  /**
   * If received on props, defines if the checkbox is default checked.
   * @type {boolean}
   */
  export let checked = false;

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  export let value: unknown = true;
  export let required = false;

  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue, addFieldToContext, removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function validation() {
    isValid = true;
    if (forceInvalid) {
      isValid = false;
    } else if (required) {
      isValid = checked;
    }
  }

  function setValue(ev: HTMLInputElement) {
    dispatch("checkItem", ev);
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
        true, // isValid Always True
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

<div class="checkbox-item" class:invalid={!isValid}>
  <input
    {...$$restProps}
    type="checkbox"
    {name}
    {id}
    bind:value
    class="checkbox-input"
    bind:checked
    bind:this={inputElement}
    on:click={() => {
      setValue(inputElement);
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
    --border-color: var(--szot-border-color, var(--theme-primary-txt));
    --checkbox-color: var(--szot-checkbox-color, var(--border-color));
    --checkbox-label-color: var(
      --szot-checkbox-label,
      var(--theme-primary-txt)
    );

    display: flex;
    flex-direction: row;
    width: fit-content;
    position: relative;
    padding: 0 0.375em;
    margin: var(--checkbox-margin);

    .checkbox-input {
      /* Remove most all native input styles */
      appearance: none;
      margin-right: 20px;

      color: var(--checkbox-color);
      width: var(--checkbox-size);
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
    display: inherit;
    @include m.form-field-error-text();
  }
</style>
