<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Textarea from "./Textarea.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Textarea> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Textarea>;
  $: restProps = $$restProps as ComponentProps<Textarea>;

  export let style = "";
</script>

<div {style}>
  <Textarea
    {...restProps}
    on:input
    on:change
  />
</div>
