<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Badge from "./Badge.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Badge> {
    style?: string;
    labelSlot: string;
  }

  // Used to force $$restProps be of type ComponentProps<Badge>;
  $: restProps = $$restProps as ComponentProps<Badge>;

  export let style = "";
  export let labelSlot: string;
</script>

<div {style}>
  <Badge
    {...restProps}
    on:click
  >
    {labelSlot}
  </Badge>
</div>
