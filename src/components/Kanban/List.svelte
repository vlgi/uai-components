<script lang="ts">
  import type { TList } from "./data/types";
  import { card } from "./data/empty-data";
  import { texts } from "./data/components-texts";

  // stores
  import {
    dli,
    dlEl,
    tli,
    tlEl,
    pos,
    relPos,
    dir,
    lang,
    dlh,
    board,
  } from "./stores";

  // components
  import Card from "./card/Card.svelte";
  import Button from "../formFields/Button/Button.svelte";

  // funcs
  import { changeElementPosition, getRelativePosition } from "./utils";

  // list props
  export let data: TList; // list data
  export let li: number; // list index

  // local variables
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
    const list = document.querySelector(`.list-${li}`);
    dlEl.set(list); // set dragging list html element (.list div)
    const header = document.querySelector(`.list-header-${li}`);
    const cards = document.querySelector(`.list-cards-${li}`);
    const footer = document.querySelector(`.list-footer-${li}`);
    dlh.set(
      `${header.clientHeight + cards.clientHeight + footer.clientHeight}px`
    ); // set dragging list placeholder height
    dli.set(li); // set dragging list index
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

  function autoRemove(): void {
    if (data.title == "" && data.cards.length == 0) {
      const lists = [...$board.lists];
      lists.splice(lists.length - 1, 1);
      board.set({ ...$board, lists: [...lists] });
    }
  }

  function handleCreatingCard(e): void {
    if (e.key == "Enter") {
      addANewCard();
      cardAdded = true;
    } else if (e.key == "Tab") {
      addANewCard();
      cardAdded = false;
    }
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
      <div style="height:  {$dlh}" class="list-placeholder">
        <div />
      </div>
    {/if}
    <div
      class="list list-{li}"
      style="height: {$dli == li ? $dlh : 'auto'}"
      class:to-right={$dli == li && $dir.x == "right"}
      class:to-left={$dli == li && $dir.x == "left"}
    >
      <div class="list-header list-header-{li}">
        <div class="list-draggable-element" on:mousedown|self={setDragList} />
        <!-- svelte-ignore a11y-autofocus -->
        <div
          class="list-title editable"
          contenteditable="true"
          autofocus
          on:focusout={autoRemove}
          on:keypress={(e) => {
            if (e.key == "Enter") cardAdded = true;
          }}
          bind:textContent={data.title}
        />
      </div>
      <div class="list-cards list-cards-{li}">
        <!-- {#each data.cards.slice(0, 1) as card, ci} -->
        {#each data.cards as card, ci}
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
              on:keydown={handleCreatingCard}
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
      <div class="list-footer list-footer-{li}">
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

  .lane:first-child {
    padding-left: var(--target-padding);
  }

  .lane {
    display: grid;
    grid-template-rows: 100%;
    padding: calc(var(--target-padding) / 2); // change

    .list-wrapper {
      display: grid;
      grid-template-rows: 100%;

      .list,
      .list-placeholder {
        width: 330px; // change
      }

      .list-placeholder {
        background: rgba(0, 0, 0, 0.4);
      }

      .list {
        display: flex;
        flex-direction: column;

        .list-header,
        .list-footer,
        .list-cards {
          background-color: var(--szot-list-background-color);
        }

        .list-header,
        .list-footer {
          cursor: pointer;
        }

        .list-header {
          display: flex;
          justify-content: center;
          border-radius: var(--szot-radius) var(--szot-radius) 0 0;
          padding: 5px 0;

          .list-draggable-element {
            height: 3px;
            background-color: rgba(0, 0, 0, 0.1);
            cursor: grab;
          }

          .list-title {
            padding: var(--target-padding); // change
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--color);

            &:focus {
              width: calc(100% - calc(var(--target-padding)) * 2);
            }
          }
        }

        .list-footer {
          display: flex;
          justify-content: center;
          padding: var(--target-padding); // change
          border-radius: 0 0 var(--szot-radius) var(--szot-radius);
        }

        .list-cards {
          display: grid;
          align-content: start;
          overflow-y: auto;
          cursor: default;

          .adding-card-container {
            padding: 1rem; // change

            .adding-text {
              padding: 1rem;
              border-radius: var(--szot-radius);
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
