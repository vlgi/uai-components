<script lang="ts">
  import ListRadioButton from "./ListRadioButton.svelte";

  export let style: string;
</script>

<div {style}>
  <ListRadioButton
    {...$$restProps}
    on:input
    on:change
  />
</div>
