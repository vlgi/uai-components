<script lang="ts">
  import Input from "./Input.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div class={style}>
  <Input {...$$restProps}>
    {labelSlot}
  </Input>
</div>

<style lang="scss">
  .orange {
    --background-color: #ffffff;
    --label-color: #c56d09;
    --input-color: #db984b;
    --input-focus-color: #ce4007;
    --border-color-focus: #ce4007;
    --border-color: #c56d09;
  }
</style>
