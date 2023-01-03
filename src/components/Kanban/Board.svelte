<script lang="ts">
  import type { TBoard, TCardUser, TCardLabel, TList } from "./data/types";
  import { tick } from "svelte";
  import { list } from "./data/empty-data";

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
    allLabels, // all existent labels
    board, // all board data
    lang, // board language
  } from "./stores";

  // components
  import List from "./List/List.svelte";
  import Icon from "../Icon/Icon.svelte";

  // props
  export let data: TBoard; // board data
  export let users: TCardUser[] = []; // board possible users
  export let labels: TCardLabel[] = []; // board possible users
  export let language: string = "en"; // components language
  export let customCard = null;
  export let canMoveList = true;
  export let canMoveCard = true;

  // setting kanban data
  $: if (users) allUsers.set(users); // set all board users when finished data fetching
  $: if (labels) allLabels.set(labels); // set all board labels store when finished data fetching
  $: if ($allLabels) labels = [...$allLabels]; // update data labels when allLabels store change
  $: if (data?.lists) board.set(data); // set board store when data change
  $: if ($board) data = { ...$board }; // update data board when board store change
  $: lang.set(language); // set board language

  // funcs
  import {
    getMousePosition,
    getMouseDirection,
    switchElsPositionByIndex,
  } from "./utils";

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
    console.log(el);
    el.focus();
  }

  // ####################################################
  // ## Conditional for changing lists positions     ####
  // ####################################################

  // change data.lists when dragging and target list index are different from -1
  $: if ($dli != -1 && $tli != -1) {
    data.lists = switchElsPositionByIndex(data.lists, $dli, $tli); // switch the items and return the new list array
    dli.set($tli); // dragging list index becomes target list index
    tli.set(-1); // reset target list index
    dlEl.set($tlEl); // dragging element becomes target element
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
      />
    </div>
    <div class="board-lists" on:mousemove={moveEl} on:blur>
      <!-- {#each data.lists.slice(0, 1) as list, li} -->
      {#each data.lists as list, li}
        <List bind:data={list} {li} {customCard} {canMoveList} {canMoveCard} />
      {/each}
      <div class="add-new-list" on:click={addList}>
        <Icon iconName="plus-box" --szot-icon-font-size="40px" />
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @import "./index.scss";
  * {
    --board-title-color: var(--szot-kanban-board-title-color, white);
    --board-background-color: var(--szot-kanban-board-background-color, pink);
    --card-background-color: var(--szot-kanban-card-background-color, #f9f9f9);
    --list-background-color: var(--szot-kanban-list-background-color, #f5f5f5);
    --list-font-color: var(--szot-kanban-list-font-color, #172b4d);
    --radius-pattern: var(--szot-kanban-radius-pattern, 15px);
    --list-width: var(--szot-kanban-list-width, 330px);
    --list-title-font-size: var(--szot-kanban-list-title-font-size, 1.2rem);
    --board-title-font-size: var(--szot-kanban-board-title-font-size, 2rem);

    --szot-button-border-radius: var(--szot-kanban-radius-pattern);
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
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;

    .board-header {
      .board-title {
        width: fit-content;
        font-weight: bold;
        font-size: var(--board-title-font-size);
        padding: 0.5rem 1rem;
        color: var(--board-title-color);

        &:focus {
          margin-left: var(--target-padding);
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

      .add-new-list {
        margin: calc(var(--target-padding) / 2); // change
        height: fit-content;
        padding: 0 5px;
        border-radius: var(--radius-pattern);
        background-color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
      }
    }
  }
</style>
