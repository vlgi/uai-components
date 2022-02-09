<script lang="ts">
  import Badge from "./Badge.svelte";

  export let labelSlot: string;
  export let style = "";
</script>

<div {style}>
  <Badge {...$$restProps}>
    {labelSlot}
  </Badge>
</div>
