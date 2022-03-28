<script lang="ts">
  import ListCheckbox from "./ListCheckbox.svelte";

  export let checkboxItems;
  export let name;
  export let value;
  export let required;
  export let isValid;
  export let forceInvalid;
  export let listName;
  export let checkboxStyleType;
  export let style;
</script>

<div {style}>
  <ListCheckbox
    {checkboxItems}
    {...$$restProps}
    {listName}
    {name}
    {required}
    {forceInvalid}
    {checkboxStyleType}
    on:input
    on:change
    bind:isValid
    bind:value
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(value)}</p>
