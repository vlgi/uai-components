<script lang="ts">
  import type { TBoard } from "./board-data";

  // stores
  import {
    pos, // mouse position
    dir, // mouse direction
    dli, // dragging list index
    tli, // target liste index
    dlEl, // dragging list html element
    tlEl, // target list html element
    dci, // dragging card index
    tci, // target card index
    dcli, // dragging card index
    tcli, // target card list index
    dcEl, // dragging card html element
    tcEl, // target card html element
  } from "./stores";

  // components
  import List from "./List.svelte";

  // props
  export let data: TBoard; // board data

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
    dli.set(-1); // reset dragging list index
    dlEl.set(null); // reset dragging list html element
    tli.set(-1); // reset target list index
    tlEl.set(null); // reset target list html element
    dci.set(-1); // reset dragging card index
    tci.set(-1); // reset target card index
    dcli.set(-1); // reset dragging card list index
    tcli.set(-1); // reset target card list index
    dcEl.set(-1); // reset dragging card html element
    tcEl.set(-1); // reset target card html element
  }

  // ###################################################
  // Conditional for changing lists positions  # start #
  // ###################################################

  // change data.lists when dragging and target list index are different from -1
  $: if ($dli != -1 && $tli != -1) {
    data.lists = switchElsPositionByIndex(data.lists, $dli, $tli); // switch the items and return the new list array
    dli.set($tli); // dragging list index becomes target list index
    tli.set(-1); // reset target list index
    dlEl.set($tlEl); // dragging element becomes target element
    tlEl.set(null); // target element becomes null
  }

  // ############################################# end #

  // ###################################################
  // Conditionals for changing cards positions  # start #
  // ###################################################

  // change card position in the same list
  $: if (
    ($tli == -1 || $tli == $dcli) && // when target list is -1 (same list)
    $dci != -1 && // when there is a dragging card
    $dci != $tci && // when dragging card index is different from target card index
    $tci != -1 // and when there is a target card index
  ) {
    dcEl.set($tcEl);
    const list = data.lists[$dcli].cards; // list cards data
    data.lists[$dcli].cards = switchElsPositionByIndex(list, $dci, $tci); // switch cards an return the new list cards array
    dci.set($tci); // dragging card index becomes target card index
    tci.set(-1); // reset target card index

    // change card position in different lists and target list are not empty
  } else if (
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
    dcEl.set($tcEl); // dragging card element becomes target card element (.card div)
    dci.set($tci); // dragging card index becomes target card index
    dcli.set($tcli); // dragging card list index becomes target list index
    tci.set(-1); // reset target card index
    tcli.set(-1); // reset target card index
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
  }
  // ############################################# end #
</script>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div
    class="board-container"
    style="background-image: url({data.backgroundImage})"
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
      {#each data.lists as list, li}
        <List data={list} {li} />
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  * {
    --border-radius: 5px;
    --target-padding: 0.75rem;
    --color: #172b4d;
  }

  .loading,
  .board-container {
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
        font-size: 2rem;
        padding: 1rem;
        color: var(--szot-board-title-color);
      }
    }

    .board-lists {
      display: grid;
      gap: 2rem; // remove
      grid-template-rows: 100%;
      justify-content: start;
      grid-auto-flow: column;
      max-height: fit-content;
      overflow-x: auto;
      background-color: #ffd699; // remove
      padding: 1rem; // remove
    }
  }
</style>
