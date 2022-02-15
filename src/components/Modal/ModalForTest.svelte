<script lang="ts">
  import Modal from "./Modal.svelte";

  export let disableHeader = false;
  export let opened = false;
  export let content = "Lorem ipsum dolor sit.";

  function openModal() {
    opened = true;
  }
</script>

<button on:click={openModal}>Open</button>

<Modal bind:opened {disableHeader}>
  <div slot="modal-header">
    <span>My modal header</span>
  </div>
  <div slot="modal-content">
    <p>
      {content}
    </p>
  </div>
  <div slot="modal-footer">
    <span>My modal footer</span>
  </div>
</Modal>

<div class="scroll-maker"></div>

<style global lang="scss">
  .scroll-maker {
    height: 150vh;
    width: 150vw;
  }
</style>
