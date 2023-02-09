<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";
  import {
    getMousePosition,
    getMouseDirection,
  } from "../../../helpers/mouse-cursor-handling";

  import { switchElsPositionByIndex } from "../../../helpers/arrays-handling";

  import type {
    TBoard,
    TCustomBoard,
    TCardUser,
    TCardLabel,
  } from "../data/types";

  import { list } from "../data/empty-data";
  import { texts } from "../data/components-texts";

  // stores
  import {
    dlEl,
    dli,
    tlEl,
    tli,
    dcEl,
    dci,
    dcli,
    tcEl,
    tci,
    tcli,
    pos,
    dir,
    allUsers,
    logged,
    selectedCards,
  } from "../stores";

  // components
  import List from "../List/List.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import BoardSearchInput from "./BoardSearchInput.svelte";
  import BoardMenu from "./BoardMenu.svelte";

  export let canCreateCard = true; // create card boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteCard = true; // create card boolean
  export let canDeleteList = true; // create list boolean
  export let canMoveCard = true; // move card boolean
  export let canMoveList = true; // move list boolean
  export let customCard = null; // custom card svelte component
  export let data: TBoard | TCustomBoard; // board data
  export let labels: TCardLabel[] = []; // board possible users
  export let searchableCardKeys: string[];
  export let users: TCardUser[] = []; // board possible users
  export let clickSearchResultFunction;

  let titleColor = "var(--board-title-color)";

  // move mouse/element listener and change position
  function moveEl(e: MouseEvent) {
    pos.set(getMousePosition(e)); // set mouse position
    dir.set(getMouseDirection(e)); // set mouse direction
  }

  // reset all variables to initial state
  function reset() {
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
  async function addList() {
    const emptyList = { ...list };
    data.lists = [...data.lists, emptyList];
    const listIndex = data.lists.length - 1;
    await tick();
    const el: HTMLElement = document.querySelector(`.list-title-${listIndex}`);
    el.focus();
  }

  function resetSelecteds(e: KeyboardEvent) {
    if (e.key === "Escape") selectedCards.set([[-1, -1]]);
  }

  onMount(async () => {
    await tick();
    if (users.length > 0) allUsers.set(users); // set all board users when finished data fetching
    if (!customCard) logged.set((data as TBoard).logged);
    document.body.onkeyup = resetSelecteds;
  });

  onDestroy(() => {
    document.body.removeEventListener("onkeyup", resetSelecteds);
  });

  // #####################################################
  // ## Conditionals for changing lists positions     ####
  // #####################################################

  // change data.lists when dragging and target list index are different from -1
  $: if ($dli !== -1 && $tli !== -1 && $dli !== $tli) {
    // switch the items and return the new list array
    data.lists = switchElsPositionByIndex(data.lists, $dli, $tli);

    dli.set($tli); // dragging list index becomes target list index
    dlEl.set($tlEl); // dragging element becomes target element
    tli.set(-1); // reset target list index
    tlEl.set(null); // target element becomes null
  }

  // #####################################################
  // ## Conditionals for changing cards positions     ####
  // #####################################################

  // change card position in the same list
  $: if (
    $tcli === $dcli // when dragging and target card list is the same
    && $dci !== -1 // when there is a dragging card
    && $dci !== $tci // when dragging card index is different from target card index
    && $tci !== -1 // and when there is a target card index
  ) {
    const listCards = data.lists[$dcli as number].cards; // list cards data
    data.lists[$dcli as number].cards = switchElsPositionByIndex(
      listCards,
      $dci,
      $tci,
    ); // switch cards an return the new list cards array
    resetVariablesAfterCardChangingPosition(false);

    // change card position in different lists and target list are not empty
  } else if (
    $tcli !== $dcli // change card position in the same list
    && $tli !== $dcli // change card position in the same list
    && $dci !== -1 // when there is a dragging card
    && $tci !== -1 // and when there is a target card index
    && data.lists[$tcli as number].cards.length > 0 // and when target list is not empty
  ) {
    const card = data.lists[$dcli as number].cards[$dci as number]; // dragging card data
    const targetList = data.lists[$tcli as number].cards; // target list copy
    targetList.splice($tci, 0, card); // insert dragging card on targetList (copy)
    data.lists[$dcli as number].cards.splice($dci, 1); // remove dragging card from the original list
    // update target list with targetList (updated copy)
    data.lists[$tcli as number].cards = [...targetList];
    resetVariablesAfterCardChangingPosition(false);

    // change card position in different lists and target list are empty
  } else if (
    $tli !== -1 // when there is a target list index
    && $tli !== $dcli // when dragging card list index is different target list index
    && $dci !== -1 // when there is a dragging card
    && data.lists[$tli as number].cards.length === 0 // and when target list is not empty
  ) {
    const card = data.lists[$dcli as number].cards[$dci as number]; // dragging card data
    data.lists[$tli as number].cards = [card]; // empty target list receives dragging card
    data.lists[$dcli as number].cards.splice($dci, 1); // remove dragging card from the original list
    resetVariablesAfterCardChangingPosition(true);
  }

</script>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div
    class="board-container"
    style="background-image: url({data.backgroundImage});
      cursor: {$dli !== -1 || $dci !== -1 ? 'grabbing' : 'default'}"
    on:mouseup={reset}
  >
    <div class="board-header">
      <div
        class="board-title editable"
        contenteditable="true"
        bind:textContent={data.title}
        style="color: {titleColor}"
      />
      <BoardSearchInput
        bind:data
        {searchableCardKeys}
        {titleColor}
        {clickSearchResultFunction}
      />
      <div class="board-menu-btn" id="open-board-menu">
        <Icon
          iconName="dots-horizontal"
          --szot-icon-font-size="20px"
          --szot-icon-color={titleColor}
        />
        <BoardMenu
          dropDownTarget="open-board-menu"
          bind:data
          bind:titleColor
          bind:labels
          {customCard}
        />
      </div>
    </div>
    <div class="board-lists" on:mousemove={moveEl} on:blur>
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
          {texts.addNewList}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  @use "src/components/Kanban/styles.scss";
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
        font-weight: 600;
        font-size: var(--board-title-font-size);
        text-shadow: 3px 4px 7px rgba(81, 67, 21, 0.8);
        padding: calc((var(--target-padding) / 1.5) + 1px) 0;
        width: fit-content;
        min-width: 300px;
        max-width: 100%;

        &:focus {
          padding: calc(var(--target-padding) / 1.5) var(--target-padding);
        }

        &:hover {
          opacity: 0.8;
        }
      }

      .board-menu-btn {
        grid-area: btn;
        z-index: 2;
        cursor: pointer;
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
