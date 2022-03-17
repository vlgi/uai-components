<script lang="ts">
  import RadioButton from "./RadioButton.svelte";

  export let style: string;
</script>

<div {style}>
  <RadioButton
    {...$$restProps}
    on:input
    on:change
  />
</div>
