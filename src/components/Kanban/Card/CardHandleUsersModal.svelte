<script lang="ts">
  import type { TCardUser } from "../data/types";
  import { texts } from "../data/components-texts";
  import { checkIfItemIsInArray } from "../utils";

  // stores
  import { lang } from "../stores";

  // components
  import SearchInput from "../../formFields/SearchInput/SearchInput.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";

  // props
  export let data;
  export let opened = false;
  export let list: TCardUser[];

  function handleCardUser(user): void {
    const check = checkIfItemIsInArray(user, data.members);
    const members = data.members;
    if (check.isInIt) {
      members.splice(check.index, 1);
      data.members = [...members];
    }
    if (!check.isInIt) data.members = [...data.members, user];
    filtered = [...filtered];
  }

  $: filtered = [];
</script>

<Modal bind:opened --szot-modal-width="400px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <SearchInput
      bind:items={list}
      bind:filtered
      searchQuery=""
      searchable={["name"]}
      name="search"
      placeholder={texts.searchUserPlaceholder[$lang]}
    />
    <div class="filtered-users">
      {#each filtered as user}
        <div class="filtered-user" on:click={() => handleCardUser(user)}>
          <CardUserAvatar data={user} />
          <div class="user-info">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          {#if checkIfItemIsInArray(user, data.members).isInIt}
            <Icon iconName="check" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</Modal>

<style lang="scss">
  .filtered-users {
    overflow-y: auto;
    max-height: 300px;
    width: 100%;

    .filtered-user {
      display: flex;
      align-items: flex-start;
      padding: 0.5rem;

      cursor: pointer;

      &:hover {
        background: rgb(240, 240, 240);
      }

      .user-info {
        display: flex;
        flex-direction: column;
        margin: 0 0.8rem 0 0.5rem; // change

        span:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
</style>
