<script lang="ts">
  import type { TCardUser } from "../data/types";
  import { returnInitialsNames } from "../utils";

  // components
  import Modal from "../../Modal/Modal.svelte";

  export let data: TCardUser = {
    name: "",
    photo: "",
    email: "",
  }; // user data
  export let info = false;
  export let number = -1;

  $: openModal = false;
</script>

<Modal bind:opened={openModal} --szot-modal-width="350px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <div
      class="user-avatar"
      style="background-image: url({data.photo}); height: 100px; width: 100px;"
      title={`${data.name} (${data.email})`}
    >
      {#if data.photo === ""}{returnInitialsNames(data.name)}{/if}
    </div>
    <div class="user-info">
      <h3>{data.name}</h3>
      <span>{data.email}</span>
    </div>
  </div>
</Modal>

<div
  class="user-avatar"
  style="background-image: url({data.photo});"
  title={`${data.name} (${data.email})`}
  on:click
  on:click={() => {
    if (info) openModal = true;
  }}
>
  {#if data.photo === ""}{returnInitialsNames(data.name)}{/if}
  {#if number !== -1}+{number}{/if}
</div>

<style lang="scss">
  .content {
    display: flex;
    align-items: center;
    gap: 5px;
    -webkit-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all;
    width: fit-content;

    h3,
    span {
      cursor: text;
    }

    span {
      font-size: 13px;
    }
  }

  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    background: #222;
    color: white;
    font-weight: bold;
    border-style: solid;
    border-color: white;
    border-width: 2.5px;
    background-size: cover;
    font-size: 12px;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
</style>
