<script lang="ts">
  import Modal from "../Modal.svelte";

  export let disableHeader = false;
  const openeds = [false, false, false];

  function openModal(index: number) {
    openeds[index] = true;
  }
</script>

<button on:click={() => openModal(0)}>Open 1</button>

<!-- Modal 1 -->
<Modal
  bind:opened={openeds[0]}
  {disableHeader}
  --uai-modal-width="400px"
  --uai-modal-height="400px"
  {...$$restProps}
>
  <div slot="modal-header">
    <span>My modal header</span>
  </div>
  <div slot="modal-content">
    <button on:click={() => openModal(1)}>Open 2</button><br />

    <!-- Modal 2 -->
    <Modal
      bind:opened={openeds[1]}
      {disableHeader}
      --uai-modal-width="300px"
      --uai-modal-height="300px"
    >
      <div slot="modal-content">
        <button on:click={() => openModal(2)}>Open 3</button><br />

        <!-- Modal 3 -->
        <Modal
          bind:opened={openeds[2]}
          {disableHeader}
          --uai-modal-width="200px"
          --uai-modal-height="200px"
        >
          <div slot="modal-content">Hi</div>
        </Modal>
      </div>
    </Modal>
  </div>
  <div slot="modal-footer">
    <span>My modal footer</span>
  </div>
</Modal>

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
