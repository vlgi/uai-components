<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ListCheckbox from "./ListCheckbox.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<ListCheckbox> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<ListCheckbox>;

  export let style = "";
</script>

<div {style}>
  <ListCheckbox
    {...restProps}
    bind:values={restProps.values}
    on:checkItem
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(restProps.values)}</p>
