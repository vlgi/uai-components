<script lang="ts">
  import Button from "../../formFields/Button/Button.svelte";
  import Modal from "../Modal.svelte";

  export let disableHeader = false;
  export let opened = false;
  export let content = "Lorem ipsum dolor sit.";

  function openModal() {
    opened = true;
  }
</script>

<button on:click={openModal}>Open</button>

<Modal
  bind:opened
  {disableHeader}
  on:closeModal
  {...$$restProps}
>
  <div
    class="horizontal"
    slot="modal-header"
  >
    <span class="title">My modal header title</span>
    <div class="buttons">
      <Button
        icon="ic:round-plus"
        size="round"
        buttonStyle="light"
      />
      <Button
        icon="mdi:pencil"
        size="round"
        buttonStyle="light"
      />
      <Button
        icon="material-symbols:delete-outline"
        size="round"
        buttonStyle="light"
      />
    </div>
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

<style lang="scss">
  .horizontal {
    display: grid;
    grid-auto-flow: column;
    gap: 0.5em;
  }
  .buttons {
    display: grid;
    grid-auto-flow: column;
    gap: 0.5em;
  }
  .title {
    align-self: center;
  }
</style>
