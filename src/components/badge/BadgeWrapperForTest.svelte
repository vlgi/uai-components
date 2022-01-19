<script lang="ts">
  import Badge from "./Badge.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div class={style}>
  <Badge { ...$$restProps }>
    { labelSlot }
  </Badge>
</div>

<style lang="scss">
  .default{
    --badge-border:none;
  }
  .border {
    --badge-border:.9px solid #7D7D7D;
  }
  .orange {
    --badge-color:#FFFFFF;
    --badge-background:#FC6627;
  }
</style>
