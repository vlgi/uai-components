<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";

  import type {
    TBoard,
    TCustomBoard,
    TCardUser,
    TCardLabel,
  } from "./data/types";
  import { list } from "./data/empty-data";
  import { texts } from "./data/components-texts";

  // stores
  import {
    dlEl, // dragging list html element
    dli, // dragging list index
    tlEl, // target list html element
    tli, // target liste index
    dcEl, // dragging card html element
    dci, // dragging card index
    dcli, // dragging card index
    tcEl, // target card html element
    tci, // target card index
    tcli, // target card list index
    pos, // mouse position
    dir, // mouse direction
    allUsers, // all existent users
    lang, // board language
    logged,
  } from "./stores";

  // funcs
  import {
    getMousePosition,
    getMouseDirection,
    switchElsPositionByIndex,
  } from "./utils";

  // components
  import List from "./List/List.svelte";
  import Icon from "../Icon/Icon.svelte";
  import SearchInput from "../formFields/SearchInput/SearchInput.svelte";
  import Input from "../formFields/Input/Input.svelte";
  import Dropdown from "../Dropdown/Dropdown.svelte";

  // props
  export let data: TBoard | TCustomBoard; // board data
  export let users: TCardUser[] = []; // board possible users
  export let labels: TCardLabel[] = []; // board possible users
  export let language: string = "en"; // components language
  export let searchableCardKeys: string[] = ["title"];
  export let customCard = null; // custom card svelte component
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  let allCards = [];
  let inpt;

  // move mouse/element listener and change position
  function moveEl(e): void {
    pos.set(getMousePosition(e)); // set mouse position
    dir.set(getMouseDirection(e)); // set mouse direction
  }

  // reset all variables to initial state
  function reset(): void {
    dcEl.set(-1); // reset dragging card html element
    dci.set(-1); // reset dragging card index
    dcli.set(-1); // reset dragging card list index
    dlEl.set(null); // reset dragging list html element
    dli.set(-1); // reset dragging list index
    tcEl.set(-1); // reset target card html element
    tci.set(-1); // reset target card index
    tcli.set(-1); // reset target card list index
    tlEl.set(null); // reset target list html element
    tli.set(-1); // reset target list index
  }

  // reset necessary variables after card changing position
  function resetVariablesAfterCardChangingPosition(empty: boolean): void {
    if (!empty) {
      dcEl.set($tcEl); // dragging card becomes target card html element
      dci.set($tci); // dragging card becomes target card index
      dcli.set($tcli); // dragging card list index becomes target card list index
    } else if (empty) {
      dcEl.set(null);
      dci.set(0); // dragging card becomes target card index
      dcli.set($tli); // dragging card list index becomes target card list index
    }
    tcEl.set(null); // reset target card html element
    tci.set(-1); // reset target card index
    tcli.set(-1); // reset target card list index
  }

  // add a new empty list
  async function addList(): Promise<any> {
    const emptyList = { ...list };
    data.lists = [...data.lists, emptyList];
    const listIndex = data.lists.length - 1;
    await tick();
    const el: HTMLElement = document.querySelector(`.list-title-${listIndex}`);
    el?.focus();
  }

  function filterCards(): void {
    data.lists.forEach((list) => {
      list.cards = [];
    });
    filtered.forEach((card) => {
      data.lists[card.list].cards = [...data.lists[card.list].cards, card];
    });
  }

  function initializeInput() {
    document.body.onfocus = handleInputEl;
  }

  function getFile(e): void {
    const files = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    data.backgroundImage = files[0];
    showDropdown = false;
  }

  function handleInputEl(e): void {
    showAdd = false;
  }

  onMount(async () => {
    tick();
    if (users.length > 0) allUsers.set(users); // set all board users when finished data fetching
    if (language) lang.set(language); // set board language
    if (!customCard && data.logged) logged.set(data.logged);
    data.lists.forEach((list, index) => {
      list.cards.forEach((card) => {
        allCards = [...allCards, { ...card, list: index }];
      });
    });
    inpt = document.getElementById(`input-image`);
  });

  onDestroy(() => {
    document.body.removeEventListener("onfocus", handleInputEl);
  });

  $: filtered = [];
  $: titleColor = "var(--board-title-color)";
  $: showAdd = false;
  $: showDropdown = false;
  $: if (showAdd) inpt.click();

  // ####################################################
  // ## Conditional for changing lists positions     ####
  // ####################################################

  // change data.lists when dragging and target list index are different from -1
  $: if ($dli != -1 && $tli != -1 && $dli != $tli) {
    data.lists = switchElsPositionByIndex(data.lists, $dli, $tli); // switch the items and return the new list array
    dli.set($tli); // dragging list index becomes target list index
    dlEl.set($tlEl); // dragging element becomes target element
    tli.set(-1); // reset target list index
    tlEl.set(null); // target element becomes null
  }

  // ####################################################
  // ## Conditional for changing cards positions     ####
  // ####################################################

  // change card position in the same list
  $: if (
    $tcli == $dcli && // when dragging and target card list is the same
    $dci != -1 && // when there is a dragging card
    $dci != $tci && // when dragging card index is different from target card index
    $tci != -1 // and when there is a target card index
  ) {
    const list = data.lists[$dcli].cards; // list cards data
    data.lists[$dcli].cards = switchElsPositionByIndex(list, $dci, $tci); // switch cards an return the new list cards array
    resetVariablesAfterCardChangingPosition(false);

    // change card position in different lists and target list are not empty
  } else if (
    $tcli != $dcli && // change card position in the same list
    $tli != $dcli && // change card position in the same list
    $dci != -1 && // when there is a dragging card
    $tci != -1 && // and when there is a target card index
    data.lists[$tcli].cards.length > 0 // and when target list is not empty
  ) {
    const card = data.lists[$dcli].cards[$dci]; // dragging card data
    const targetList = data.lists[$tcli].cards; // target list copy
    targetList.splice($tci, 0, card); // insert dragging card on targetList (copy)
    data.lists[$dcli].cards.splice($dci, 1); // remove dragging card from the original list
    data.lists[$tcli].cards = [...targetList]; // update target list with targetList (updated copy)
    resetVariablesAfterCardChangingPosition(false);
  }

  // change card position in different lists and target list are empty
  else if (
    $tli != -1 && // when there is a target list index
    $tli != $dcli && // when dragging card list index is different target list index
    $dci != -1 && // when there is a dragging card
    data.lists[$tli].cards.length == 0 // and when target list is not empty
  ) {
    const card = data.lists[$dcli].cards[$dci]; // dragging card data
    data.lists[$tli].cards = [card]; // empty target list receives dragging card
    data.lists[$dcli].cards.splice($dci, 1); // remove dragging card from the original list
    resetVariablesAfterCardChangingPosition(true);
  }
</script>

<input
  type="file"
  id="input-image"
  on:change={getFile}
  on:click={initializeInput}
/>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div
    class="board-container"
    style="background-image: url({data.backgroundImage}); 
      cursor: {$dli != -1 || $dci != -1 ? 'grabbing' : 'default'}"
    on:mouseup={reset}
  >
    <div class="board-header">
      <div
        class="board-title editable"
        contenteditable="true"
        bind:textContent={data.title}
        style="color: {titleColor}"
      />
      <div class="search-menu-container">
        <SearchInput
          items={allCards}
          searchable={searchableCardKeys}
          placeholder={texts.searchCardPlaceholder[$lang]}
          on:input={filterCards}
          bind:filtered
          inputStyle="dark"
          name="cards-search"
          --szot-input-text-color={titleColor}
          --szot-input-border-color={titleColor}
          --szot-input-placeholder-color={titleColor}
          --szot-input-margin-bottom="0"
          --szot-input-margin-top="0"
        />
        <div class="board-menu-btn" id="open-board-menu">
          <Icon
            iconName="dots-horizontal"
            --szot-icon-font-size="20px"
            --szot-icon-color={titleColor}
          />
          <Dropdown
            targetId="open-board-menu"
            enableAutAdjust={false}
            dropdownAlignment="bottomRight"
            --szot-dropdown-padding="0"
            bind:opened={showDropdown}
          >
            <div class="drop-menu-container">
              <div class="drop-menu-section">{texts.boardAction[$lang]}</div>
              <div class="divider" />

              <div class="item" on:click={() => (showAdd = true)}>
                {texts.changeBoardBackgroundImage[$lang]}
              </div>
              <div class="divider" />

              <div class="item">
                <!-- {texts.changeBoardColor[$lang]} -->
                <Input
                  name="board-color"
                  label={texts.boardTitleColor[$lang]}
                  type="color"
                  --szot-input-margin-top="0"
                  --szot-input-margin-bottom="0"
                  on:change={(e) => (titleColor = e.target.value)}
                  bind:value={titleColor}
                />
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="board-lists" on:mousemove={moveEl} on:blur>
      <!-- {#each data.lists.slice(0, 1) as list, li} -->
      {#each data.lists as list, li}
        <List
          bind:data={list}
          bind:boardData={data}
          bind:labelsData={labels}
          {li}
          {customCard}
          {canMoveCard}
          {canCreateCard}
          {canDeleteCard}
          {canMoveList}
          {canCreateList}
          {canDeleteList}
        />
      {/each}
      {#if canCreateList}
        <div class="add-new-list" on:click={addList}>
          <Icon
            iconName="plus-box"
            --szot-icon-font-size="40px"
            --szot-icon-color={titleColor}
          />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  * {
    --board-background-color: var(--szot-kanban-board-background-color, black);
    --board-title-color: var(--szot-kanban-board-title-color, white);
    --board-title-font-size: var(--szot-kanban-board-title-font-size, 2rem);
    --card-background-color: var(--szot-kanban-card-background-color, #f9f9f9);
    --list-background-color: var(--szot-kanban-list-background-color, #f5f5f5);
    --list-font-color: var(--szot-kanban-list-font-color, #172b4d);
    --list-title-font-size: var(--szot-kanban-list-title-font-size, 1.2rem);
    --list-width: var(--szot-kanban-list-width, 330px);
    --radius-pattern: var(--szot-kanban-radius-pattern, 15px);

    --szot-button-border-radius: var(--szot-kanban-radius-pattern);
    --szot-dropdown-border-radius: var(--szot-kanban-radius-pattern);
    --target-padding: 0.75rem;
  }

  :global(.editable) {
    cursor: pointer;
    outline: none;
    width: 100%;
    width: 100%;

    &:focus {
      outline: none !important;
      background-color: rgba(113, 158, 206, 0.3);
      border-radius: calc(var(--radius-pattern) / 1);
      border: 1px solid #719ece;
      // box-shadow: 0 0 5px #719ece;
    }

    &:hover {
      cursor: pointer;
    }
  }

  :global(*) {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  :global(.to-right, .to-left) {
    opacity: 0.8;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    position: absolute !important;
    cursor: grabbing;
    height: auto;
  }

  :global(.to-right) {
    animation-name: toRight;

    @keyframes toRight {
      to {
        transform: rotate(2deg);
      }
    }
  }

  :global(.to-left) {
    animation-name: toLeft;

    @keyframes toLeft {
      to {
        transform: rotate(-2deg);
      }
    }
  }

  :global(.modal-alert-footer) {
    display: flex;
    gap: 5px;
    justify-content: center;
  }

  :global(.drop-menu-container) {
    min-width: 200px;
    max-width: 300px;
    padding: 5px;
    font-size: 13px;
  }

  :global(.divider, .drop-menu-section) {
    margin: 5px 0;
    opacity: 0.6;
  }

  :global(.divider) {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #aaa;
  }

  :global(.item, .drop-menu-section) {
    padding: 5px 10px;
    width: 100%;
  }

  :global(.item) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: var(--radius-pattern);

    &:hover {
      background: #eee;
    }
  }

  :global(.drop-menu-section) {
    text-align: center;
  }

  :global(.item-alert) {
    color: #cf513d;
  }

  #input-image {
    display: none;
  }

  .loading,
  .board-container {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--board-background-color);
  }

  .loading {
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background: white;
  }

  .board-container {
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left top;
    padding: calc(var(--target-padding));

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: calc(var(--target-padding));

      .board-title {
        width: fit-content;
        font-weight: 400;
        font-size: var(--board-title-font-size);
        padding: calc(var(--target-padding) / 1.5) 0;

        &:focus {
          padding: calc(var(--target-padding) / 1.5) var(--target-padding);
        }
      }

      .search-menu-container {
        display: grid;
        grid-template-columns: calc(100% - 30px) 20px;
        gap: 10px;
        align-items: center;
        max-width: 100%;
        width: 500px;

        .item {
          display: grid;
          grid-template-columns: 100%;
        }
      }

      .board-menu-btn {
        z-index: 2;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .board-lists {
      display: grid;
      grid-template-rows: 100%;
      justify-content: start;
      grid-auto-flow: column;
      height: 100%;
      overflow-x: auto;
      gap: calc(var(--target-padding) / 2);
    }
  }

  .add-new-list {
    height: fit-content;
    padding: 0 5px;
    border-radius: var(--radius-pattern);
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
</style>
