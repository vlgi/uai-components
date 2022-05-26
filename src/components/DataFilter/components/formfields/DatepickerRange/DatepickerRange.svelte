<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Datepicker from "../Datepicker/Datepicker.svelte";
  import { EPickerType } from "../Datepicker/types";
  import type { TValue } from "./types";

  /** @type {string} */
  export let name: string;

  /** @type {string} */
  export let pickerType = EPickerType.date;

  export let label = "";

  // from >= to
  export let value: TValue = {
    from: "",
    to: "",
  };

  /**
   * show if selected range is valid
   * @type {boolean}
   * */
  export let isValid: boolean | null = null;

  const dispatcher = createEventDispatcher();
  let internalValue = {
    from: "",
    to: "",
  };

  function validateRange(_intValue: TValue): boolean | null {
    if (!_intValue.from || !_intValue.to) return null;

    const from = new Date(_intValue.from);
    const to = new Date(_intValue.to);
    return from <= to;
  }

  function sendValues() {
    isValid = validateRange(internalValue);
    if (!isValid) return;

    value = internalValue;

    dispatcher("change", {
      value,
    });
  }

  function changeInternalValue(_value: TValue) {
    if (_value) {
      isValid = validateRange(_value);
      internalValue = {
        from: _value.from || "",
        to: _value.to || "",
      };
    }
  }

  $: changeInternalValue(value);
</script>

<fieldset>
  <legend>{ label }</legend>

  <Datepicker
    label="De:"
    name="{name}-from"
    bind:value={ internalValue.from }
    on:change={ sendValues }
    { pickerType }
  />

  <Datepicker
    label="Até:"
    name="{name}-to"
    bind:value={ internalValue.to }
    on:change={ sendValues }
    { pickerType }
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
