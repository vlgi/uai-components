<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
} from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TCheckboxStyleType = "filled" | "notFilled";

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
   * The checkboxStyleType text for this element
   * @type {string}
   */
  export let checkboxStyleType: TCheckboxStyleType = "notFilled";

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
  export let required = false;

  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } = isInsideContext && getContext<TFormContext>("FormContext");

  function setValue(ev: HTMLInputElement) {
    dispatch("checkItem", ev);
    inputElement = ev;
    const x = ev.value;
    value = x;
  }

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext && checked) {
    setFieldValue(name, value, true);
  }

  onMount(() => {
    if (isInsideContext) {
      let validation;
      addFieldToContext(
        name,
        value,
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
    class="checkbox-input checkbox-style-type-{checkboxStyleType}"
    {checked}
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
    --checkbox-margin: var(--szot-checkbox-margin, 0);
    --checkbox-size: var(--szot-checkbox-size, 1rem);
    --border-color: var(--szot-border-color, var(--theme-primary-txt));
    --checkbox-color: var(--szot-checkbox-color, var(--border-color));
    --checkbox-label-color: var(
      --szot-checkbox-label,
      var(--theme-primary-txt)
    );

    display: inline-block;
    position: relative;
    padding: 0 0.375em;
    margin: var(--checkbox-margin);

    .checkbox-input {
      display: none;
    }

    .checkbox-label {
      color: var(--checkbox-label-color);
      font-weight: normal;
    }

    .checkbox-label:before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 0.1875em;
      margin: 0 0.3125em 0 0;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      border: 0.125em solid var(--checkbox-color);
      background-color: transparent;
    }

    .checkbox-input:checked + .checkbox-label:after {
      width: calc(var(--checkbox-size) - 0.5em);
      height: calc(var(--checkbox-size) - 0.5em);
      position: absolute;
      top: 0.4375em;
      left: 0.625em;
      content: " ";
      display: block;
      background: var(--checkbox-color);
    }

    .checkbox-style-type-filled:checked + .checkbox-label:before {
      background-color: var(--checkbox-color);
    }
  }
</style>
