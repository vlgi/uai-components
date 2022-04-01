<script lang="ts">
  import ListCheckbox from "./ListCheckbox.svelte";


  export let style: string;
  export let value;
</script>

<div {style}>
  <ListCheckbox
    {...$$restProps}
    on:input
    on:change
    bind:value
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(value)}</p>
