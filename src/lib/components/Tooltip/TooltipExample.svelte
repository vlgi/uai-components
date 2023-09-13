<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Tooltip from "./Tooltip.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Tooltip> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Tooltip>;
  $: restProps = $$restProps as ComponentProps<Tooltip>;

  export let style = "";
</script>

<div {style}>
  <Tooltip {...restProps} />
</div>
