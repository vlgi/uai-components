<script>
  import ListCheckbox from "./ListCheckbox.svelte";

  export let style;
  export let values;
</script>

<div {style}>
  <ListCheckbox
    {...$$restProps}
    bind:values
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(values)}</p>
