<script lang="ts">
  import Badge from "./Badge.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div style={style}>
  <Badge { ...$$restProps }>
    { labelSlot }
  </Badge>
</div>

