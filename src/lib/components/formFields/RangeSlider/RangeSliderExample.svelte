<script lang="ts">
  import type { ComponentProps } from "svelte";
  import RangeSlider from "./RangeSlider.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<RangeSlider> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<RangeSlider>;

  export let style = "";
</script>

<div
  class="wrapper"
  {style}
>
  <RangeSlider
    name="range"
    bind:value={restProps.value}
    {...restProps}
    on:input
  />

  <p>value: {restProps.value}</p>
</div>
