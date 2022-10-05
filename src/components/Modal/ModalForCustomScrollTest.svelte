<script lang="ts">
  import Modal from "./Modal.svelte";

  export let opened = false;

  function openModal() {
    opened = true;
  }
</script>

<div class="scroll-container">
  <button on:click={openModal}>Open</button>

  <Modal bind:opened {...$$restProps}>
    <div slot="modal-header">
      <span>My modal header</span>
    </div>
    <div slot="modal-content">
      <p>
        Lorem ipsum dolor sit amet.
      </p>
    </div>
    <div slot="modal-footer">
      <span>My modal footer</span>
    </div>
  </Modal>

  <div class="inner-scroll"></div>
</div>

<style global lang="scss">
  .scroll-container {
    height: 50vh;
    width: 50vw;
    margin: 0 100vh 100vh 0;
    overflow: scroll;
  }

  .inner-scroll {
    height: 100vh;
    width: 100vw;
  }
</style>
