<script>
  import Modal from "../Modal/Modal.svelte";
  export let data;
  let opened = data.opened;
</script>

<Modal bind:opened {...data} --szot-modal-width="800px">
  <div slot="modal-header" class="header">
    <input type="text" bind:value={data.title} />
  </div>
  <div slot="modal-content" class="content">
    <input type="text" bind:value={data.desc} />
  </div>
  <div slot="modal-footer" class="footer">
    <span>My modal footer</span>
  </div>
</Modal>

<style lang="scss">
  .header {
    font-size: 3rem;
  }

  input {
    width: 100%;
    font-size: 2rem;
    padding: 0.5rem 0;
    border: none;
    outline: none;
    &:focus {
      color: darkblue;
    }
  }

  .content {
    padding: 1rem 0;
    input {
      font-size: 2rem;
    }
  }

  .footer {
    background: red;
    color: white;
    padding: 2rem;
    text-align: center;
  }
</style>
