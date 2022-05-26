<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Input from "../Input/Input.svelte";
  import type { TMask } from "../Input/types";
  import type { TValue } from "./types";

  /**
   * You can use the preseted masks, or a Cleave.js object, or a custom mask function
   * @type {"number"|"money"|"percentage"|object|function}
   * */
  export let mask: TMask;

  // only required when using a custom mask function
  export let unmask = (v: string): string => v;

  /** @type {string} */
  export let name: string;

  export let label = "";

  export let value: TValue = {
    from: "",
    to: "",
  };

  const dispatcher = createEventDispatcher();
  let isValid: boolean | null = null;
  let internalValues = {
    from: "",
    to: "",
  };

  function validateRange(_intValue: TValue): boolean | null {
    if (!_intValue.from || !_intValue.to) return null;

    const from = Number(_intValue.from);
    const to = Number(_intValue.to);
    return from <= to;
  }

  function sendValues() {
    isValid = validateRange(internalValues);
    if (isValid === false) return;

    // copy value, because internalValues is an object, and we don't want to keep the ref
    value = { ...internalValues };
    dispatcher("input", {
      value,
    });
  }

  function changeInternalValue(_value: TValue) {
    if (_value) {
      isValid = validateRange(_value);
      internalValues = {
        ..._value, // copy
      };
    }
  }

  $: changeInternalValue(value);
</script>

<fieldset>
  <legend>{ label }</legend>

  <Input
    label="De:"
    name="{name}-from"
    bind:value={ internalValues.from }
    {mask}
    {unmask}
    on:input={ sendValues }
  />

  <Input
    label="Até:"
    name="{name}-to"
    bind:value={ internalValues.to }
    {mask}
    {unmask}
    on:input={ sendValues }
  />

  {#if isValid === false}
    <p class="error-msg">
      Valor inicial deve ser menor que o final!
    </p>
  {/if}
</fieldset>

<style lang="scss">
  .error-msg {
    margin-top: 5px;
    color: var(--theme-error);
  }

  fieldset {
    border: none;
    padding-top: 10px;
  }
</style>
