<script lang="ts">
  import type { TCard } from "./board-data";

  // stores
  import { pos, dir, relPos, dci, tci, dcli, tcli, dcEl, tcEl } from "./stores";

  // components
  import CardModal from "./CardModal.svelte";

  // functions
  import { changeElementPosition, getRelativePosition } from "./utils";

  // card props
  export let data: TCard; // card data
  export let ci: number; // card index
  export let cli: number; // card list index

  // local variables
  let phw = "100%"; // dragging element placeholder width
  let phh = "100%"; // dragging element placeholder height

  // calculate how many dones items inside checklists
  let convertedCardData: any = { ...data };
  let all = [];
  let dones = [];
  data.checklists.forEach((cList) => {
    all = [...all, ...cList.items];
    cList.items.forEach((item) => {
      if (item.progress == 1) dones.push(item);
    });
  });
  convertedCardData.allChecklistsItems = [...all];
  convertedCardData.allDoneChecklistsItems = [...dones];

  // card data plus calculated items done on checklists
  let nCard = {
    ...convertedCardData,
    opened: false,
  };

  function openModal(): void {
    nCard = { ...data, opened: true };
  }

  // set values on card over (.card-space over)
  function onCardOver(): void {
    const el = document.querySelector(`.card-${ci}-${cli}`); // get target card html element (.card div)
    phw = `${el.clientWidth}px`; // set placeholder width
    phh = `${el.clientHeight}px`; // set placeholder height
    tci.set(ci); // set target card index
    tcli.set(cli); // set target card list index
    tcEl.set(el); // set target card html element
  }

  // set dragging card values
  function setDragCard(e) {
    if (e.button != 0) return; // if not left button, do nothing
    dci.set(ci); // set dragging card index
    dcli.set(cli); // set dragging card list index
    dcEl.set(e.target); // dragging card html element (.card div)
    phw = `${e.target.clientWidth}px`; // set placeholder width
    phh = `${e.target.clientHeight}px`; // set placeholder height
    relPos.set(getRelativePosition(e.clientX, e.clientY, e.target)); // relative mouse position in relation to the html element
    changeElementPosition($pos, $dcEl, { x: $relPos.x, y: 10 }); // change dragging element position
  }

  // change dragging card position
  $: $pos && $dci != -1 && moveDragList();
  function moveDragList() {
    // when there is a dragging element and pos change, change html element position
    changeElementPosition($pos, $dcEl, { x: $relPos.x, y: 10 });
  }
</script>

<CardModal data={nCard} />

<div class="card-space" on:focus on:blur on:mouseover={onCardOver}>
  <div class="card-wrapper" on:click={openModal}>
    {#if $dci == ci && $dcli == cli}
      <div class="card-placeholder" style="width: {phw}; height: {phh}" />
    {/if}
    <div
      on:mousedown|self={setDragCard}
      class="card card-{ci}-{cli}"
      style="background-color: {data.backgroundColor}; width: {phw}"
      class:to-right={$dci == ci && $dcli == cli && $dir == "right"}
      class:to-left={$dci == ci && $dcli == cli && $dir == "left"}
    >
      <div class="card-container">{data.title}</div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./index.scss";

  .card-space {
    flex-direction: column;
    padding: var(--target-padding);
    cursor: default;
    padding: 2rem; // remove
    background: white; // remove

    .card-wrapper {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

      .card-placeholder {
        background: rgba(0, 0, 0, 0.4);
      }

      .card {
        height: fit-content;
        cursor: grab;
        width: 100%;
        padding-top: 1rem;

        // remove
        .card-container {
          padding: 1rem;
          background: #eee; // remove
          cursor: pointer;
        }
      }
    }
  }
</style>
