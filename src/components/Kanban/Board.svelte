<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";

  import type {
    TBoard,
    TCard,
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
    filterHTMLElements,
    fuzzySearch,
  } from "./utils";

  // components
  import List from "./List/List.svelte";
  import Icon from "../Icon/Icon.svelte";
  import Input from "../formFields/Input/Input.svelte";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import CardModal from "./Card/CardModal.svelte";

  // props
  export let data: TBoard | TCustomBoard; // board data
  export let users: TCardUser[] = []; // board possible users
  export let labels: TCardLabel[] = []; // board possible users
  export let language: string = "en"; // components language
  export let searchableCardKeys: any[];
  export let clickSearchResultFunction: Function = openSelectedCardModal;
  export let customCard = null; // custom card svelte component
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  let inpt;
  let allCards: TCard[] = [];
  let results: any[] = [];

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

  // function searchForCards(e): void {
  //   const cardsEls = document.querySelectorAll(".card-space");
  //   fuzzySearch(data.lists, e.target.value);
  //   filterHTMLElements(cardsEls, searchableCardKeys, e.target.value, allCards);
  // }

  function searchForCards(e): void {
    results = fuzzySearch(allCards, e.target.value);
    showResults = true;
  }

  function getAllCards(): void {
    allCards = [];
    data.lists.forEach((list, li) => {
      const cards = list.cards.map((c, ci) => {
        return { ...c, li, ci };
      });
      allCards = [...allCards, ...cards];
    });
  }

  function openSelectedCardModal(card): void {
    const selected = { ...card.item };
    selectedCardListIndex = selected.li;
    selectedCardIndex = selected.ci;
    showResults = false;
    showCardModal = true;
  }

  onMount(async () => {
    tick();
    if (users.length > 0) allUsers.set(users); // set all board users when finished data fetching
    if (language) lang.set(language); // set board language
    // @ts-ignore
    if (!customCard && data.logged) logged.set(data.logged);
    inpt = document.getElementById(`input-image`);
  });

  onDestroy(() => {
    document.body.removeEventListener("onfocus", handleInputEl);
  });

  $: titleColor = "var(--board-title-color)";
  $: showAdd = false;
  $: showDropdown = false;
  $: data && getAllCards();
  $: selectedCardListIndex = -1;
  $: selectedCardIndex = -1;
  $: showCardModal = false;
  $: showResults = false;
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
      <div class="search-input-container">
        <Input
          on:input={searchForCards}
          label={texts.searchCardPlaceholder[$lang]}
          inputStyle="dark"
          name="cards-search"
          inputAttributes={{ autocomplete: "off" }}
          --szot-input-text-color={titleColor}
          --szot-input-border-color={titleColor}
          --szot-input-label-color={titleColor}
          --szot-input-margin-bottom="0"
          --szot-input-margin-top="0"
          --szot-input-border-color-focus={titleColor}
        />
        {#if showResults && results.length > 0}
          <div class="search-results">
            {#each results as result}
              <button on:click={() => clickSearchResultFunction(result)}>
                <div class="result-icon"><Icon iconName="card" /></div>
                <span class="result-card">{result.item.title}</span>
                <span class="result-card-list">
                  {texts.inList[$lang]}
                  "{data.lists[result.item.li].title}"
                </span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
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
                on:change={(e) => {
                  // @ts-ignore
                  titleColor = e.target.value;
                }}
                bind:value={titleColor}
              />
            </div>
          </div>
        </Dropdown>
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
            --szot-icon-font-size="35px"
            --szot-icon-color="var(--list-font-color)"
          />
          {texts.addNewList[$lang]}
        </div>
      {/if}
    </div>
  </div>
{/if}
{#if selectedCardListIndex != -1 && selectedCardIndex != -1}
  <CardModal
    bind:data={data.lists[selectedCardListIndex].cards[selectedCardIndex]}
    bind:boardData={data}
    ci={selectedCardIndex}
    cli={selectedCardListIndex}
    bind:opened={showCardModal}
  />
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
    --box-shadow-pattern: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    --szot-button-border-radius: var(--szot-kanban-radius-pattern);
    --szot-input-border-radius: var(--szot-kanban-radius-pattern);
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
    justify-content: center;
    gap: 5px;
    width: 100%;
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
    @media only screen and (min-width: 0px) {
      --board-header-grid-template-areas: "title btn" "inpt inpt";
      --board-header-grid-template-columns: calc(100% - 30px) 20px;
      --board-header-align-items: start;
      --board-padding: var(--target-padding) 0 0 var(--target-padding);
      --board-header-padding: 0 var(--target-padding) 0 0;
    }
    @media only screen and (min-width: 1024px) {
      --board-header-grid-template-areas: "title inpt btn";
      --board-header-grid-template-columns: calc(100% - 540px) 500px 20px;
      --board-header-align-items: center;
      --board-padding: var(--target-padding) var(--target-padding) 0
        var(--target-padding);
      --board-header-padding: 0;
    }

    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left top;
    padding: var(--board-padding);

    .board-header {
      display: grid;
      grid-template-areas: var(--board-header-grid-template-areas);
      grid-template-columns: var(--board-header-grid-template-columns);
      gap: 10px;
      align-items: var(--board-header-align-items);
      margin-bottom: var(--target-padding);
      padding: var(--board-header-padding);

      .board-title {
        grid-area: title;
        width: fit-content;
        font-weight: 400;
        font-size: var(--board-title-font-size);

        &:focus {
          padding: calc(var(--target-padding) / 1.5) var(--target-padding);
        }
      }

      .search-input-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        grid-area: inpt;

        .input-container {
          z-index: 3;
        }

        .search-results {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.97);
          border-radius: var(--target-padding);
          box-shadow: var(--box-shadow-pattern);
          height: fit-content;
          max-height: 60vh;
          margin-top: 45px;
          max-width: calc(100% - 30px - calc(var(--target-padding) * 2));
          position: absolute;
          width: 500px;
          z-index: 2;
          overflow-y: auto;
          padding: var(--target-padding) 0;

          button {
            display: grid;
            grid-template-areas:
              "icon card"
              "icon list";
            justify-items: start;
            grid-template-columns: 23px calc(100% - 25px);
            padding: calc(var(--target-padding) / 2);
            border: 1px solid transparent;
            background: transparent;
            outline: none;

            .result-icon {
              grid-area: icon;
              margin-top: -3px;
            }

            .result-card {
              grid-area: card;
            }

            .result-card-list {
              grid-area: list;
              font-size: 11px;
              color: #555;
            }

            &:hover {
              cursor: pointer;
              background: rgba(230, 230, 230, 1);
            }

            &:focus {
              box-shadow: var(--box-shadow-pattern);
              background: white;
            }
          }
        }
      }

      .board-menu-btn {
        grid-area: btn;
        z-index: 2;
        cursor: pointer;

        .item {
          display: grid;
          grid-template-columns: 100%;
        }

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
      padding-bottom: var(--target-padding);
    }
  }

  .add-new-list {
    display: flex;
    gap: 5px;
    align-items: center;
    width: var(--list-width);
    max-width: calc(100vw - var(--target-padding) * 6);
    background-color: var(--list-background-color);
    border-radius: var(--radius-pattern);
    padding: calc(var(--target-padding) / 2);
    height: fit-content;
    color: var(--list-font-color);
    cursor: pointer;
    margin-right: var(--target-padding);
    opacity: 0.9;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
