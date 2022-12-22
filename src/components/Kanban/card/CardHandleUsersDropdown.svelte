<script lang="ts">
  import { texts } from "../data/components-texts";

  // stores
  import { lang } from "../stores";

  // components
  import SearchInput from "../../formFields/SearchInput/SearchInput.svelte";
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Icon from "../../Icon/Icon.svelte";

  // props
  export let data;

  // stores
  import { allUsers } from "../stores";

  // local variables
  $: filtered = [];

  // functions
  import { returnInitialsNames, checkIfItemIsInArray } from "../utils";

  function handleCardUser(user): void {
    const check = checkIfItemIsInArray(user, data.members, "id");
    const members = data.members;
    if (check.isInIt) {
      members.splice(check.index, 1);
      data.members = [...members];
    }
    if (!check.isInIt) data.members = [...data.members, user];
    filtered = [...filtered];
  }
</script>

<Dropdown
  targetId="open-avaiable-users"
  enableAutAdjust={false}
  dropdownAlignment="rightTop"
>
  <SearchInput
    bind:items={$allUsers}
    bind:filtered
    searchQuery=""
    searchable={["name"]}
    name="search"
    placeholder={texts.searchUserPlaceholder[$lang]}
  />
  <div class="filtered-users">
    {#each filtered as user}
      <div class="filtered-user" on:click={() => handleCardUser(user)}>
        <div class="user-avatar" style="background-image: url({user.photo});">
          {#if user.photo == ""}{returnInitialsNames(user.name)}{/if}
        </div>
        <div class="user-info">
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
        {#if checkIfItemIsInArray(user, data.members, "id").isInIt}
          <Icon iconName="check" />
        {/if}
      </div>
    {/each}
  </div>
</Dropdown>

<style lang="scss">
  @import "./card.scss";

  .filtered-users {
    overflow-y: auto;
    max-height: 300px;
    width: 300px;
    z-index: 200;

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
