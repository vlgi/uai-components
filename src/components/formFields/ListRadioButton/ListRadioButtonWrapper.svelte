<script lang="ts">
  import ListRadioButton from "./ListRadioButton.svelte";

  export let radioOptions;
  export let name;
  export let value;
  export let required;
  export let isValid;
  export let forceInvalid;
  export let listName;
  export let radioStyleType;
  export let style;
</script>

<div {style}>
  <ListRadioButton
  {radioOptions}
  {...$$restProps}
  {listName}
  {name}
  {required}
  {forceInvalid}
  {radioStyleType}
  on:input
  on:change
  bind:isValid
  bind:value
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(value)}</p>
