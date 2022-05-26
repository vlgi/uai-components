<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import Cleave from "cleave"; // module renamed from clave.js to cleave
  import type { TMask } from "./types";

  /**
   * @type {string}
   */
  export let name: string;
  export let value = "";
  export let label = "";

  /**
   * You can use the preseted masks, or a Cleave.js object, or a custom mask function
   * @type {"number"|"money"|"percentage"|object|function}
   * */
  export let mask: TMask;

  // only required when using a custom mask function
  export let unmask = (v: string): string => v;

  let cleave: Cleave;
  let inputEl: HTMLInputElement;
  let maskedValue = "";
  let rawValue = "";
  const dispatcher = createEventDispatcher();

  function getUnmaskedValue(_cleave: Cleave, _value: string): string {
    if (typeof mask === "function") {
      return unmask(_value);
    }
    const cleaveRaw = _cleave.getRawValue();
    // replace is needed because cleave.getRawValue don't remove prefix
    return cleaveRaw.replace(/[R$\s%]/g, "");
  }

  function getMaskedValue(_value: string): string {
    if (typeof mask === "function") {
      return mask(_value);
    }
    // if is set with cleave just change the '.' because conflict with delimiter and decimal rawvalue
    // NOTE: using custom cleave configs can broken
    return _value.replace(".", ",");
  }

  function setExternalValue() {
    // skip a tick to get masked value
    setTimeout(() => {
      maskedValue = inputEl.value;
      rawValue = cleave && getUnmaskedValue(cleave, maskedValue);
      if (rawValue === value) return;
      value = rawValue;
      dispatcher("input", {
        value,
      });
    }, 0);
  }

  function setInternalValue(_value: string) {
    if (_value !== rawValue) {
      maskedValue = getMaskedValue(_value);
    }
  }

  function setMask(_inputEl: HTMLInputElement, _mask: TMask): void {
    if (cleave) cleave.destroy();

    if (typeof _mask === "object") {
      cleave = new Cleave(_inputEl, _mask);
    } else if (_mask === "number") {
      cleave = new Cleave(_inputEl, {
        numeral: true,
        numeralDecimalMark: ",",
        delimiter: ".",
        numeralDecimalScale: 2,
      });
    } else if (_mask === "money") {
      cleave = new Cleave(_inputEl, {
        numeral: true,
        numeralDecimalMark: ",",
        delimiter: ".",
        prefix: "R$ ",
        numeralDecimalScale: 2,
      });
    } else if (_mask === "percentage") {
      cleave = new Cleave(_inputEl, {
        numeral: true,
        numeralThousandsGroupStyle: "none",
        numeralDecimalScale: 2,
        delimiter: ".",
        numeralDecimalMark: ",",
        prefix: "% ", // used as prefix because tail doesn't work
      });
    }

    // set initial value, to be masked
    setExternalValue();
  }

  $: if (inputEl) setMask(inputEl, mask);
  $: setInternalValue(value);

  onMount(() => {
    setMask(inputEl, mask);
  });
</script>

<label for={ name }>{label}</label>
<input
  id={name}
  {name}
  type="text"
  value={ maskedValue }
  bind:this={inputEl}
  on:input={setExternalValue}
/>

<style lang="scss">
</style>
