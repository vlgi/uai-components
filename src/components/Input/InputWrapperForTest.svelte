<script lang="ts">
  import Input from "./Input.svelte";

  export let labelSlot: string;
  export let style: string;
</script>

<div {style}>
  <Input {...$$restProps}>
    {labelSlot}
  </Input>
</div>
