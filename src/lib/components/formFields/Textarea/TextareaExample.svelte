<script>
  import Textarea from "./Textarea.svelte";

  export let style;
</script>

<div {style}>
  <Textarea
    {...$$restProps}
    name="text-input-form"
    on:input
    on:change
  />
</div>
