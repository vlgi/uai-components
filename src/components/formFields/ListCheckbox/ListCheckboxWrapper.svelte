<script lang="ts">
  import ListCheckbox from "./ListCheckbox.svelte";

  export let style: string;
  export let values: Array<string>;
</script>

<div {style}>
  <ListCheckbox
    {...$$restProps}
    bind:values
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(values)}</p>
