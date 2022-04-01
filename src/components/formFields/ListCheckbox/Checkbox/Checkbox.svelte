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

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  export let value: unknown = name;
  let valueShown: Array<unknown> | unknown;
  export let required = false;

  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    getFieldContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function setValue(ev: HTMLInputElement) {
    dispatch("checkItem", ev);
    value = ev.value;
    if (isInsideContext) {
      const oldValue = getFieldContext(name);
      if (Array.isArray(oldValue)) {
        if (oldValue.includes(value)) {
          valueShown = oldValue.filter((item) => item !== value);
        } else {
          valueShown = oldValue.concat(value);
        }
      } else {
        valueShown = oldValue ? [oldValue].concat(value) : value;
      }
      if (oldValue === false) {
        valueShown = checked ? value : "";
      }
    }
  }

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, valueShown, true);
  }

  onMount(() => {
    if (isInsideContext) {
      let validation;
      addFieldToContext(
        name,
        valueShown,
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

<div class="checkbox-item">
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

  <label for={id} class="checkbox-label"
    >{label !== undefined ? label : ""}</label
  >
</div>

<style lang="scss">
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
</style>
