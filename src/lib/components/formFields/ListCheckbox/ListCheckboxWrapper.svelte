<script>
  import ListCheckbox from "./ListCheckbox.svelte";

  export let style;
  export let values;
</script>

<div {style}>
  <ListCheckbox
    {...$$restProps}
    bind:values
    on:checkItem
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(values)}</p>
