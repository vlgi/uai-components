<script lang="ts">
  import Button from "../formFields/Button/Button.svelte";
  import Dialog from "./Dialog.svelte";

  let opened = false;

  export let style;
</script>

<div {style} class="dialog-container">
  <Dialog bind:opened {...$$restProps} on:cancel on:confirm/>
</div>

<Button
  on:click={() => {
    opened = true;
  }}
>
  Open
</Button>

<style lang="scss">
  * {
    :global(.cancel-button-container) { --szot-button-background-color: yellow; }
    :global(.confirm-button-container) { --szot-button-background-color: purple; }
  }
</style>
