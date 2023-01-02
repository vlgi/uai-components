<script lang="ts">
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
  } from "../stores";

  // components
  import CardModal from "./CardModal.svelte";
  import CardFooter from "./CardFooter.svelte";
  import CardLabel from "./CardLabel.svelte";

  // functions
  import { changeElementPosition, getRelativePosition } from "../utils";

  // card props
  export let data: any; // card data
  export let ci: number; // card index
  export let cli: number; // card list index
  export let customCard = null;
  export let canMoveCard = null;

  // local variables
  $: showModal = false; // if its true, show card modal
  let overed = false; // change target data only at the first overed

  // calculate how many dones items inside checklists
  $: if (!customCard) transformCardData(data);
  function transformCardData(data): void {
    let all = [];
    let dones = [];
    data.checklists.forEach((cList) => {
      all = [...all, ...cList.items];
      cList.items.forEach((item) => {
        if (item.done) dones.push(item);
      });
    });
    data.allChecklistsItems = [...all];
    data.allDoneChecklistsItems = [...dones];
  }

  // if triggered showModal variables becomes true
  function openModal(): void {
    showModal = true;
  }

  // set values on card over (.card-space over)
  function onCardSpaceOver(): void {
    const el = document.querySelector(`.card-${ci}-${cli}`); // get target card html element (.card div)
    if ($dci == 0 && $dcEl == null) dcEl.set(el); // if is the first card and the list was empty
    if (
      $dci != -1 && // set target card values only if there is a dragging card
      !($dci == ci && $dcli == cli) && // and it's not the dragging card itself
      $tci == -1 && // and if there isn´t a target card
      !overed
    ) {
      overed = true;
      tci.set(ci); // set target card index
      tcli.set(cli); // set target card list index
      tcEl.set(el); // set target card html element
    }
  }

  // set dragging card values
  function setDragCard(e) {
    if (e.button != 0) return; // if not left button, do nothing
    dcw.set(`${e.target.clientWidth}px`); // set placeholder width
    dch.set(`${e.target.clientHeight}px`); // set placeholder height
    relPos.set(getRelativePosition(e.clientX, e.clientY, e.target)); // relative mouse position in relation to the html element
    dcEl.set(e.target); // dragging card html element (.card div)
    changeElementPosition($pos, $dcEl, { x: $relPos.x, y: 10 }); // change dragging element position
    dcli.set(cli); // set dragging card list index
    dci.set(ci); // set dragging card index
  }

  // on card space mouse out event reset related data
  function onCardSpaceOut(): void {
    overed = false;
    if ($dci != -1) {
      tci.set(-1); // reset target card index
      tcEl.set(null); // reset target card html element (.card div)
      tcli.set(-1); // reset target card list index
    }
  }

  // change dragging card position
  $: $pos && $dci != -1 && moveDragList();
  function moveDragList() {
    // when there is a dragging element and pos change, change html element position
    changeElementPosition($pos, $dcEl, { x: $relPos.x, y: 10 });
  }
</script>

<CardModal bind:data bind:opened={showModal} {cli} />

<div
  class="card-space"
  on:focus
  on:mouseover={onCardSpaceOver}
  on:blur
  on:mouseout|self={onCardSpaceOut}
>
  <div class="card-wrapper" on:click={() => !customCard && openModal()}>
    {#if $dci == ci && $dcli == cli}
      <div class="card-placeholder" style="width: {$dcw}; height: {$dch}" />
    {/if}
    <div
      on:mousedown|self={(e) => canMoveCard && setDragCard(e)}
      class="card card-{ci}-{cli}"
      style="width: {$dcw}"
      class:to-right={$dci == ci && $dcli == cli && $dir.x == "right"}
      class:to-left={$dci == ci && $dcli == cli && $dir.x == "left"}
      class:draggable-card-cursor={canMoveCard}
    >
      {#if !customCard}
        <div class="card-header">
          {#if data.labels.length > 0}
            <div class="card-labels">
              {#each data.labels as label}
                <div class="label-wrapper">
                  <CardLabel bind:data={label} bind:cardData={data} />
                </div>
              {/each}
            </div>
          {/if}
        </div>
        <div
          class="card-title"
          style="background-image: url({data.cover})"
          class:card-cover={data.cover != ""}
        >
          <div>{data.title}</div>
        </div>
        <CardFooter bind:data />
      {:else if customCard}
        <div class="custom-card" style="cursor: default">
          <svelte:component this={customCard} {data} />
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../index.scss";

  .card-space {
    flex-direction: column;
    padding: calc(var(--target-padding) / 1.5) var(--target-padding); // change
    cursor: default;

    .card-wrapper {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

      cursor: pointer;
      border-radius: var(--radius-pattern);

      .card-placeholder {
        background: rgba(0, 0, 0, 0.4);
        border-radius: var(--radius-pattern);
      }

      .draggable-card-cursor {
        cursor: grab;
      }

      .card {
        display: grid;
        grid-auto-flow: row;
        height: fit-content;
        width: 100%;
        padding-top: 3px; // change
        border-radius: var(--radius-pattern);
        z-index: 400;

        .card-header,
        .card-title,
        .card-footer {
          cursor: pointer;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: var(--card-background-color); // change
          padding: 5px; // change
          border-radius: var(--radius-pattern) var(--radius-pattern) 0 0;

          .card-labels {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 5px; // change
            padding-bottom: -3px; // change
            min-height: 40px; // change
            width: 100%;

            .label-wrapper {
              width: fit-content;
            }
          }
        }

        .card-title {
          font-weight: bold; // remove
          background-color: var(--card-background-color); // change

          div {
            padding: calc(var(--target-padding) / 2);
            width: 100%;
          }
        }

        .card-cover {
          display: flex;
          align-items: flex-end;
          background-size: cover;
          height: 300px;
          color: white;
          background-color: black;

          div {
            display: flex;
            align-items: flex-end;
            height: 35%;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.8)
            );
          }
        }
      }
    }
  }
</style>
