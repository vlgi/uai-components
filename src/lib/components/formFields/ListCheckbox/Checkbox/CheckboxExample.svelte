<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Checkbox from "./Checkbox.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Checkbox> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<Checkbox>;

  export let style = "";
</script>

<div {style}>
  <Checkbox
    bind:checked={restProps.checked}
    {...restProps}
    on:checkItem
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(restProps.checked)}</p>
