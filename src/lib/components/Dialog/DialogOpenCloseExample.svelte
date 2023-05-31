<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Dialog from "./Dialog.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = ComponentProps<Dialog>;

  // Used to force $$restProps be of type ComponentProps<Dialog>;
  $: restProps = $$restProps as ComponentProps<Dialog>;

  export let opened = false;

  function openDialog() {
    opened = true;
  }
</script>

<button on:click={openDialog}>Open</button>
<Dialog
  {...restProps}
  bind:opened
  on:cancel
  on:confirm
/>
