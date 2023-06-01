<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Button from "./Button.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Button> {
    style?: string;
    labelSlot?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<Button>;

  export let labelSlot = "";
  export let style = "";
</script>

<div {style}>
  <Button {...restProps} on:click>
    {labelSlot}
  </Button>
</div>
