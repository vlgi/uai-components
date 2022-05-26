<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { EPickerType } from "./types";

  /** @type {string} */
  export let name: string;

  /** @type {string} */
  export let pickerType = EPickerType.date;

  export let label = "";

  export let value = "";

  let inputType: string;
  const dispatcher = createEventDispatcher();

  const typeMap = {
    [EPickerType.time]: "time",
    [EPickerType.datetime]: "datetime-local",
    [EPickerType.date]: "date",
    [EPickerType.month]: "month",
  };

  function setValue(ev: Event) {
    value = (ev.target as HTMLInputElement).value;
    dispatcher("change", {
      value,
    });
  }

  $: inputType = typeMap[pickerType];
</script>

<label for={ name }>{label}</label>
<input type={ inputType } id={name} {name} {value} on:change={ setValue }>

<style global lang="scss">
</style>
