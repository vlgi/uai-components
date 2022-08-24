<script lang="ts">
  import Checkbox from "./Checkbox.svelte";

  export let style: string;
  export let checked = false;
  export let name: string;
</script>

<div {style}>
  <Checkbox
    {...$$restProps}
    {name}
    bind:checked
    on:checkItem
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(checked)}</p>
