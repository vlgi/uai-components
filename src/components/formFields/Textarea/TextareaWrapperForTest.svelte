<script>
  import Textarea from "./Textarea.svelte";

  export let style;
</script>

<div {style}>
  <Textarea
    {...$$restProps}
    on:input
    on:change
  />
</div>
