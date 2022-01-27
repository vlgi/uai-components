<script lang="ts">
  import Button from "./Button.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div {style}>
  <Button {...$$restProps}>
    {labelSlot}
  </Button>
</div>

<style lang="scss">
  div {
    --szot-primary: #2b4c7e;
    --szot-primary-txt: #ffffff;
    --szot-secondary: #722b7e;
    --szot-secondary-txt: #ffffff;
    --szot-dark: #333333;
    --szot-dark-txt: #ffffff;
    --szot-ligth-txt: #333333;
  }
</style>
