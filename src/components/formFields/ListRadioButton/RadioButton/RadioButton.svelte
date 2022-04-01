<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TRadioStyleType = "filled" | "notFilled";

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the radio element
   * @type {string}
   */
  export let name: string;

  /**
   * The name for the radio element, default is equal to name
   * @type {string}
   */
  export let id = name;

  /**
   * The radioStyleType text for this element
   * @type {string}
   */
  export let radioStyleType: TRadioStyleType = "notFilled";

  /**
   * If received on props, defines if the radio is default checked.
   * @type {boolean}
   */
  export let checked = false;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  let value = "";
  let wrapperElement: HTMLElement;
  const dispatch = createEventDispatcher();

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue, addFieldToContext, removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function setValue(ev: HTMLInputElement) {
    dispatch("checkItem", ev);
    inputElement = ev;
    const x = ev.value;
    value = x;
  }

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, true);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        true, // isValid Always True
        false,
        wrapperElement,
        () => true,
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

<div class="radio-item">
  <input
    {...$$restProps}
    type="radio"
    {name}
    {id}
    class="radio-input radio-style-type-{radioStyleType}"
    {checked}
    bind:this={inputElement}
    on:click={() => {
      setValue(inputElement);
    }}
  />

  <label for={id} class="radio-label">{label !== undefined ? label : ""}</label>
</div>

<style lang="scss">
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --border-color: var(--szot-border-color, var(--theme-primary-txt));
    --radio-color: var(--szot-radio-color, var(--border-color));
    --radio-label-color: var(--szot-radio-label, var(--theme-primary-txt));

    display: inline-block;
    position: relative;
    padding: 0 0.375em;
    margin: var(--radio-margin);

    .radio-input {
      display: none;
    }

    .radio-label {
      color: var(--radio-label-color);
      font-weight: normal;
    }

    .radio-label:before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 0.1875em;
      margin: 0 0.3125em 0 0;
      width: var(--radio-size);
      height: var(--radio-size);
      border-radius: calc(var(--radio-size) / 2);
      border: 0.125em solid var(--radio-color);
      background-color: transparent;
    }

    .radio-input:checked + .radio-label:after {
      width: calc(var(--radio-size) - 0.5em);
      height: calc(var(--radio-size) - 0.5em);
      border-radius: calc(var(--radio-size) / 2);
      position: absolute;
      top: 0.4375em;
      left: 0.625em;
      content: " ";
      display: block;
      background: var(--radio-color);
    }

    .radio-style-type-filled:checked + .radio-label:before {
      background-color: var(--radio-color);
    }
  }
</style>
