<script lang="ts">
  import type { ComponentProps } from "svelte";
  import FileSelector from "./FileSelector.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  /* eslint-disable*/
  interface $$Props extends ComponentProps<FileSelector> {
    name: string;
    acceptedFileTypes: string;
    buttonLabel: string;
  }
  /* eslint-enable*/

  // set the FileSelector name
  export let name = "file-selector";
  // set the FileSelector files types accepted
  export let acceptedFileTypes = ".pdf,image/*";

  export let buttonLabel: string;

  // Used to force $$restProps be of type ComponentProps<Badge>;
  $: restProps = $$restProps as ComponentProps<FileSelector>;
</script>

<div>
  <FileSelector
    {...restProps}
    {name}
    {acceptedFileTypes}
  >
    {buttonLabel}
  </FileSelector>
</div>
