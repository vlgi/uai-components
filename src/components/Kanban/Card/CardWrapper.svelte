<script lang="ts">
  import { changeElementPosition } from "../../../helpers/html-element-handling";
  import { getRelativePosition } from "../../../helpers/mouse-cursor-handling";
  import type {
    TMouseDirection,
    TPosition,
  } from "../data/types";

  // stores
  import {
    pos,
    dir,
    relPos,
    dci,
    tci,
    dcli,
    tcli,
    dcEl,
    tcEl,
    dch,
    dcw,
    selectedCards,
  } from "../stores";

  // card props
  export let ci: number; // card index
  export let cli: number; // card list index
  export let canMoveCard = true;

  let overed = false; // change target data only at the first overed
  let isSelected = false;

  // set values on card over (.card-space over)
  function onCardSpaceOver(): void {
    const el = document.querySelector(`.card-${ci}-${cli}`); // get target card html element (.card div)
    if ($dci === 0 && $dcEl == null) dcEl.set(el); // if is the first card and the list was empty
    if (
      $dci !== -1 // set target card values only if there is a dragging card
        && !($dci === ci && $dcli === cli) // and it's not the dragging card itself
        && $tci === -1 // and if there isn´t a target card
        && !overed
    ) {
      overed = true;
      tci.set(ci); // set target card index
      tcli.set(cli); // set target card list index
      tcEl.set(el); // set target card html element
    }
  }

  // set dragging card values
  function setDragCard(e: MouseEvent) {
    if (e.button !== 0) return; // if not left button, do nothing
    selectedCards.set([[-1, -1]]);
    const el = document.querySelector(`.card-${ci}-${cli}`); // get target card html element (.card div)
    dcw.set(`${(el as HTMLElement).clientWidth}px`); // set placeholder width
    dch.set(`${(el as HTMLElement).clientHeight}px`); // set placeholder height
    relPos.set(
      getRelativePosition(e.clientX, e.clientY, el as HTMLElement),
    ); // relative mouse position in relation to the html element
    dcEl.set(el); // dragging card html element (.card div)
    changeElementPosition(
      $pos,
      $dcEl,
      { x: ($relPos as TPosition).x, y: 5 },
    ); // change dragging element position
    dcli.set(cli); // set dragging card list index
    dci.set(ci); // set dragging card index
  }

  // on card space mouse out event reset related data
  function onCardSpaceOut(): void {
    overed = false;
    if ($dci !== -1) {
      tci.set(-1); // reset target card index
      tcEl.set(null); // reset target card html element (.card div)
      tcli.set(-1); // reset target card list index
    }
  }

  // change dragging card position
  function moveDragCard() {
    // when there is a dragging element and pos change, change html element position
    changeElementPosition(
      $pos,
      $dcEl,
      { x: ($relPos as TPosition).x, y: 5 },
    ); // change dragging element position
  }

  function checkIfCardIsSelected(
    cards: [number, number][],
  ): { isInIt: boolean, index: number } {
    const selecteds = cards;
    for (let index = 0; index < selecteds.length; index++) {
      const element = selecteds[index];
      if (element[0] === cli && element[1] === ci) return { isInIt: true, index };
    }
    return { isInIt: false, index: -1 };
  }

  function handleMultipleSelect(e: MouseEvent) {
    let selecteds = $selectedCards as [number, number][];
    const check = checkIfCardIsSelected(selecteds);
    if (e.shiftKey && !check.isInIt) {
      if (selecteds[0][0] === -1) {
        selecteds[0] = [cli, ci];
      } else {
        selecteds.push([cli, ci]);
      }
    } else if (check.isInIt) {
      selecteds.splice(check.index, 1);
    }
    if (selecteds.length === 0) selecteds = [[-1, -1]];
    selectedCards.set([...selecteds]);
  }

  $: dirX = ($dir as TMouseDirection).x;
  $: isSelected = checkIfCardIsSelected($selectedCards).isInIt;
  $: if ($pos && $dci !== -1) moveDragCard();

</script>

<div
  class="card-space"
  id="card-space-{ci}-{cli}"
  on:focus
  on:mouseover={onCardSpaceOver}
  on:blur
  on:mouseout|self={onCardSpaceOut}
  on:mouseup={handleMultipleSelect}
>
  <div class="card-wrapper">
    {#if $dci === ci && $dcli === cli}
      <div class="card-placeholder" style="width: {$dcw}; height: {$dch}" />
    {/if}
    <div
      class="card card-{ci}-{cli}"
      class:to-right={$dci === ci && $dcli === cli && dirX === "right"}
      class:to-left={$dci === ci && $dcli === cli && dirX === "left"}
      style="width: {$dci === ci && $dcli === cli ? $dcw : '100%'};"
    >
      <div
        class="card-draggable-element"
        class:draggable-card-cursor={canMoveCard}
        on:mousedown|self={(e) => canMoveCard && setDragCard(e)}
      />
      <div class="card-content" class:card-selected={isSelected}>
        <slot name="card-content" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use "src/components/Kanban/styles.scss";

  .card-space {
    --card-padding: 5px;
    flex-direction: column;
    padding: calc(var(--target-padding) / 2) var(--target-padding); // change
    cursor: default;

    .card-selected {
      border: 2px solid #cf513d;
      border-radius: var(--radius-pattern);
    }

    .card-wrapper {
      .card-placeholder {
        background: rgba(0, 0, 0, 0.4);
        border-radius: var(--radius-pattern);
      }

      .card {
        .card-draggable-element {
          width: 100%;
          height: 3px;
          background: transparent;
        }

        .draggable-card-cursor {
          cursor: grab;
        }

        .card-content {
          border-radius: var(--radius-pattern);
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }

        cursor: pointer;
        border-radius: var(--radius-pattern);
      }

    }
  }

</style>
