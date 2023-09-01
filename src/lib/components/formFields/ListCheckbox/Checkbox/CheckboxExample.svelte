<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Checkbox from "./Checkbox.svelte";
  import Icon from "$lib/components/Icon/Icon.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Checkbox> {
    style?: string;
    showLeftSlot?: boolean;
    showRightSlot?: boolean;
  }

  // Used to force $$restProps be of type ComponentProps<Button>;
  $: restProps = $$restProps as ComponentProps<Checkbox>;

  export let style = "";

  export let showLeftSlot = false;

  export let showRightSlot = false;
</script>

<div {style}>
  <Checkbox
    bind:checked={restProps.checked}
    {...restProps}
    on:checkItem
  >
    <div slot="leftLabelSlot">
      {#if showLeftSlot}
        <Icon iconName="material-symbols:home-rounded" />
      {/if}
    </div>

    <div slot="rightLabelSlot">
      {#if showRightSlot}
        <Icon iconName="material-symbols:home-rounded" />
      {/if}
    </div>
  </Checkbox>
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(restProps.checked)}</p>
