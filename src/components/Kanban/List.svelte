<script lang="ts">
  import type { TList } from "./data/types";
  import { card } from "./data/empty-data";
  import { texts } from "./data/components-texts";

  // stores
  import { dli, dlEl, tli, tlEl, pos, relPos, dir, lang } from "./stores";

  // components
  import Card from "./card/Card.svelte";
  import Button from "../formFields/Button/Button.svelte";

  // funcs
  import { changeElementPosition, getRelativePosition } from "./utils";

  // list props
  export let data: TList; // list data
  export let li: number; // list index

  // local variables
  let phh = "0px"; // dragging element placeholder height
  $: cardAdded = false;
  let addedCardTitle = "";

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

  // on lane mouse out event reset related data
  function onLaneOut(): void {
    tli.set(-1); // reset target list index
    tlEl.set(null); // reset target list html element (.list div)
  }

  function addANewCard(): void {
    const newCard = { ...card, title: addedCardTitle };
    data.cards = [...data.cards, newCard];
    cardAdded = false;
    addedCardTitle = "";
    const list = document.querySelector(`.list-cards-${li}`);
    list.scrollTop = list.scrollHeight;
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
      class:to-right={$dli == li && $dir.x == "right"}
      class:to-left={$dli == li && $dir.x == "left"}
    >
      <div class="list-header">
        <div
          class="list-title editable"
          contenteditable="true"
          bind:textContent={data.title}
        />
      </div>
      <div class="list-cards list-cards-{li}">
        {#each data.cards.slice(0, 1) as card, ci}
          <!-- {#each data.cards as card, ci} -->
          <Card bind:data={card} {ci} cli={li} />
        {/each}
        {#if cardAdded}
          <div class="adding-card-container">
            <!-- svelte-ignore a11y-autofocus -->
            <div
              class="adding-text editable"
              contenteditable="true"
              autofocus
              bind:textContent={addedCardTitle}
              on:keypress={(e) => e.key == "Enter" && addANewCard()}
            />
            <div class="card-adding-btns">
              <Button
                on:click={() => (cardAdded = false)}
                size="small"
                buttonStyleType="outline"
                buttonStyle="dark"
              >
                {texts.cancel[$lang]}
              </Button>
              <Button
                on:click={addANewCard}
                size="small"
                buttonStyleType="filled"
                buttonStyle="dark"
              >
                {texts.add[$lang]}
              </Button>
            </div>
          </div>
        {/if}
      </div>
      <div class="list-footer">
        <Button
          on:click={() => (cardAdded = true)}
          size="large"
          buttonStyleType="outline"
          buttonStyle="dark"
        >
          {texts.createCard[$lang]}
        </Button>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import "./index.scss";

  .lane {
    display: grid;
    grid-template-rows: 100%;
    padding: var(--target-padding); // remove
    // background: lightcyan; // remove

    .list-wrapper {
      display: grid;
      grid-template-rows: 100%;

      .list,
      .list-placeholder {
        align-self: stretch;
        position: static;
        width: 330px; // change
      }

      .list-placeholder {
        background: rgba(0, 0, 0, 0.4);
      }

      .list {
        display: flex;
        flex-direction: column;
        cursor: grab;
        background-color: rgba(0, 0, 0, 0.5); // remove
        height: fit-content;
        max-height: 87vh;
        padding-top: 0.5rem; // change

        .list-header,
        .list-footer,
        .list-cards {
          background-color: var(--szot-list-background-color);
        }

        .list-header,
        .list-footer {
          padding: var(--target-padding); // change
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
          display: flex;
          justify-content: center;
        }

        .list-cards {
          display: grid;
          align-content: start;
          overflow-y: auto;
          cursor: default;
          gap: 0.5rem; // change

          .adding-card-container {
            padding: 1rem; // change

            .adding-text {
              padding: 1rem;
              border-radius: 5px;
              border: 1px solid #888;
            }
            .card-adding-btns {
              display: flex;
              justify-content: center;
              padding: 1rem 0;
              width: 100%;
              gap: 5px;
              grid-auto-flow: column;
            }
          }
        }
      }
    }
  }
</style>
