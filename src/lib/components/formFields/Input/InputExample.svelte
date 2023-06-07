<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Input from "./Input.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Input> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<Input>;

  export let style = "";
</script>

<div {style}>
  <Input
    {...restProps}
    on:input
    on:change
    on:click
  />
</div>
