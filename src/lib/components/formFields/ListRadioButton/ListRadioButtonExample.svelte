<script lang="ts">
  import type { ComponentProps } from "svelte";
  import ListRadioButton from "./ListRadioButton.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<ListRadioButton> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<ListRadioButton>;

  export let style = "";
</script>

<div {style}>
  <ListRadioButton
    {...restProps}
    on:input
    on:change
    on:click
    bind:value={restProps.value}
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(restProps.value)}</p>
