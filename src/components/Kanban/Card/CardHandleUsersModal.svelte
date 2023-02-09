<script lang="ts">
  import { checkIfItemIsInArray } from "../../../helpers/arrays-handling";
  import type { TCardUser, TBoard } from "../data/types";
  import { texts } from "../data/components-texts";

  import { selectedCards } from "../stores";

  // components
  import SearchInput from "../../formFields/SearchInput/SearchInput.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";

  // props
  export let data: TCardUser[] = [];
  export let boardData: TBoard = null;
  export let opened = false;
  export let list: TCardUser[];

  let filtered: TCardUser[];
  let selecteds = $selectedCards as [number, number][];

  function checkIfAllSelectedsHasUser(user: TCardUser): boolean {
    let allHasUser = true;
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]];
      const check = checkIfItemIsInArray(user, card.members);
      if (!check.isInIt) allHasUser = false;
    });
    return allHasUser;
  }

  function removeUserFromSelectedCards(user: TCardUser) {
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]];
      const check = checkIfItemIsInArray(user, card.members);
      const { members } = card;
      members.splice(check.index, 1);
      boardData.lists[selected[0]]
        .cards[selected[1]]
        .members = [...members];
    });
  }

  function addUserToSelectedCards(user: TCardUser) {
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]];
      const check = checkIfItemIsInArray(user, card.members);
      if (!check.isInIt) {
        boardData.lists[selected[0]]
          .cards[selected[1]]
          .members = [...card.members, user];
      }
    });
  }

  function handleCardUser(user: TCardUser): void {
    if (selecteds[0][0] === -1) {
      const check = checkIfItemIsInArray(user, data);
      const members = [...data];
      if (check.isInIt) {
        members.splice(check.index, 1);
        data = [...members];
      }
      if (!check.isInIt) data = [...data, user];
      filtered = [...filtered];
    } else if (checkIfAllSelectedsHasUser(user)) {
      removeUserFromSelectedCards(user);
    } else {
      addUserToSelectedCards(user);
    }
  }

  $: filtered = [];
  $: selecteds = $selectedCards as [number, number][];
</script>

<Modal
  bind:opened
  --szot-modal-width="500px"
  --szot-modal-max-width="90vw"
>
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <SearchInput
      bind:items={list}
      bind:filtered
      searchQuery=""
      searchable={["name"]}
      name="search"
      placeholder={texts.searchUserPlaceholder}
    />
    <div class="filtered-users">
      {#each filtered as user}
        <div class="filtered-user" on:click={() => handleCardUser(user)}>
          <CardUserAvatar data={user} />
          <div class="user-info">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          {#if selecteds[0][0] !== -1 && boardData
            ? checkIfAllSelectedsHasUser(user)
            : checkIfItemIsInArray(user, data).isInIt
          }
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
