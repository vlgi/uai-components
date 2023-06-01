<script lang="ts">
  import Modal from "../Modal.svelte";

  let modal1Opened = false;
  let modal2Opened = false;

  function openFirst() {
    modal1Opened = true;
  }

  function openSecond() {
    modal1Opened = false;
    modal2Opened = true;
  }

  function onCloseFirst() {
    modal1Opened = false;
  }

  function onCloseSecond() {
    modal2Opened = false;
  }
</script>

<button on:click={openFirst}>Open 1</button>

<!-- Modal 1 -->
{#if modal1Opened}
  <Modal
    bind:opened={modal1Opened}
    on:closeModal={onCloseFirst}
  >
    <div slot="modal-header">
      <span>My modal header</span>
    </div>
    <div slot="modal-content">
      <button on:click={openSecond}> Open The other modal </button>
    </div>
    <div slot="modal-footer">
      <span>My modal footer</span>
    </div>
  </Modal>
{/if}

<!-- Modal 2 -->
{#if modal2Opened}
  <Modal
    bind:opened={modal2Opened}
    on:closeModal={onCloseSecond}
  >
    <div slot="modal-header">
      <span>My modal header</span>
    </div>
    <div slot="modal-content">The other modal</div>
    <div slot="modal-footer">
      <span>My modal footer</span>
    </div>
  </Modal>
{/if}

<div class="scroll-maker" />

<style
  global
  lang="scss"
>
  .scroll-maker {
    height: 150vh;
    width: 150vw;
  }
</style>
