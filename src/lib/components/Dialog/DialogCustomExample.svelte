<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Dialog from "./Dialog.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Dialog> {
    style?: string;
  }
  export let style = "";
  let opened = false;

  // Used to force $$restProps be of type ComponentProps<Dialog>;
  $: restProps = $$restProps as ComponentProps<Dialog>;
</script>

<div
  {style}
  class="dialog-container"
>
  <Dialog
    bind:opened
    {...restProps}
    on:cancel
    on:confirm
  />
</div>

<button
  on:click={() => {
    opened = true;
  }}
>
  Open
</button>

<style lang="scss">
  * {
    :global(.cancel-button-container) {
      --uai-button-background-color: yellow;
    }
    :global(.confirm-button-container) {
      --uai-button-background-color: purple;
    }
  }
</style>
