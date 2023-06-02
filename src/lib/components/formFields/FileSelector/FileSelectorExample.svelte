<script lang="ts">
  import type { Button } from "$lib";
  import type { ComponentProps } from "svelte";
  import FileSelector from "./FileSelector.svelte";

  // set the FileSelector name
  export let name = "file-selector";
  // set the FileSelector files types accepted
  export let accept = ".pdf,image/*";

  export let labelSlot: string;

  // Used to force $$restProps be of type ComponentProps<Badge>;
  $: restProps = $$restProps as ComponentProps<Button>;
</script>

<div>
  <FileSelector
    {...restProps}
    {name}
    {accept}
  >
    {labelSlot}
  </FileSelector>
</div>
