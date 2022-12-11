<script lang="ts">
  import type { TList } from "./board-data";

  // stores
  import { dli, dlEl, tli, tlEl, pos, relPos, dir } from "./stores";

  // components
  import Card from "./Card.svelte";

  // funcs
  import { changeElementPosition, getRelativePosition } from "./utils";

  // list props
  export let data: TList; // list data
  export let li: number; // list index

  // local variables
  let phh = "0px"; // dragging element placeholder height

  // set values on list over (.lane over)
  function onLaneOver(): void {
    tli.set(li); // set target list index
    const el = document.querySelector(`.list-${li}`); // get target list html element (.list div)
    tlEl.set(el); // set target list html element (.list div)
  }

  // set dragging list values
  function setDragList(e): void {
    if (e.button != 0) return; // if not left button, do nothing
    dli.set(li); // set dragging list index
    dlEl.set(e.target); // set dragging list html element (.list div)
    phh = `${e.target.clientHeight}px`; // set dragging list placeholder height
    relPos.set(getRelativePosition(e.clientX, e.clientY, e.target)); // relative mouse position in relation to the html element
    changeElementPosition($pos, $dlEl, { x: $relPos.x, y: 10 }); // change dragging element position
  }

  // change dragging list position
  $: $pos && $dli != -1 && moveDragList();
  function moveDragList(): void {
    // when there is a dragging element and pos change, change html element position
    changeElementPosition($pos, $dlEl, { x: $relPos.x, y: 10 });
  }

  // on lane mouse out event reset target list index and element
  function onLaneOut(): void {
    tli.set(-1); // reset target list index
    tlEl.set(null); // reset target list html element (.list div)
  }
</script>

<div
  class="lane"
  on:focus
  on:mouseover|self={onLaneOver}
  on:blur
  on:mouseout={onLaneOut}
>
  <div class="list-wrapper">
    {#if $dli == li}
      <div style="height: {phh}px" class="list-placeholder">
        <div />
      </div>
    {/if}
    <div
      class="list list-{li}"
      on:mousedown|self={setDragList}
      class:to-right={$dli == li && $dir == "right"}
      class:to-left={$dli == li && $dir == "left"}
    >
      <div class="list-header">
        <div
          class="list-title editable"
          contenteditable="true"
          bind:textContent={data.title}
        />
      </div>
      <div class="list-cards">
        {#each data.cards as card, ci}
          <div class="card-container">
            <Card data={card} {ci} cli={li} />
          </div>
        {/each}
      </div>
      <div class="list-footer">Bottom</div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./index.scss";

  // .lane:first-child {
  //   padding-left: 0;
  //   border-left: 0;
  // }

  // .lane:last-child {
  //   padding-right: 0;
  //   border-right: 0;
  // }

  .lane {
    display: grid;
    grid-template-rows: 100%;
    padding: var(--target-padding);
    background-color: #ff867d; // remove
    padding: 2rem; // remove

    .list-wrapper {
      display: grid;
      grid-template-rows: 100%;
      padding: 1rem; // remove

      .list,
      .list-placeholder {
        align-self: stretch;
        position: static;
        width: 500px; // change
      }

      .list-placeholder {
        background: rgba(0, 0, 0, 0.4);
      }

      .list {
        display: flex;
        flex-direction: column;
        cursor: grab;

        background-color: #7465a6; // remove
        padding-top: 0.5rem;
        padding: 2rem; // remove

        .list-header,
        .list-footer,
        .list-cards {
          background-color: var(--szot-list-background-color);
        }

        .list-header,
        .list-footer {
          padding: var(--target-padding);
          cursor: pointer;
        }

        .list-header {
          top: 0;
          .list-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--color);
          }
        }

        .list-footer {
          height: fit-content;
          color: var(--color);
          bottom: 0;
          padding: var(--);
        }

        .list-cards {
          display: grid;
          align-content: start;
          overflow-y: auto;
          padding: 2rem; // remove
          background-color: #64b3b3; // remove
          gap: 2rem; // remove
          cursor: default;
        }
      }
    }
  }
</style>
