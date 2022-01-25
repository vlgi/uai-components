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
    --border:none;
  }
  .border {
    --border:.9px solid #7D7D7D;
  }
  .orange {
    --color:#FFFFFF;
    --background:#FC6627;
  }
  .theme-test{
    --szot-dark: #202020;
    --szot-dark-txt: #ececec;
  }
</style>
