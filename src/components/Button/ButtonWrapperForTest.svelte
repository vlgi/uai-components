<script lang="ts">
  import Button from "./Button.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div {style}>
  <Button {...$$restProps}>
    { labelSlot }
  </Button>
</div>
