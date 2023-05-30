<script lang="ts">
  import ListRadioButton from "./ListRadioButton.svelte";

  export let value: string;
  export let style: string;
</script>

<div {style}>
  <ListRadioButton
    {...$$restProps}
    on:input
    on:change
    on:click
    bind:value
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(value)}</p>
