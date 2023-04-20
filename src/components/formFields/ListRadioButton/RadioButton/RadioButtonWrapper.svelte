<script lang="ts">
  import RadioButton from "./RadioButton.svelte";

  export let style: string;
  export let name: string;
  export let value: string;
  export let group: string;
</script>

<div {style}>
  <RadioButton
    {...$$restProps}
    {name}
    {value}
    {group}
    on:click
  />
</div>
