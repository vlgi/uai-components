<script lang="ts">
  import type { TList } from "../data/types";
  import { card } from "../data/empty-data";
  import { texts } from "../data/components-texts";

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
  } from "../stores";

  // components
  import Card from "../Card/Card.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import ListMenu from "./ListMenu.svelte";

  // funcs
  import { changeElementPosition, getRelativePosition } from "../utils";

  // list props
  export let data; // list data
  export let li: number; // list index
  export let customCard = null;
  export let canMoveList = true;
  export let canMoveCard = true;

  // local variables
  $: addingCard = false;
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
    if (addedCardTitle == "") return;
    const empty = customCard ? { title: "" } : { ...card };
    const newCard = { ...empty, title: addedCardTitle };
    data.cards = [...data.cards, newCard];
    addingCard = false;
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
      addedCardTitle != "" && addANewCard();
      addingCard = true;
    } else if (e.key == "Tab") {
      addedCardTitle != "" && addANewCard();
      addingCard = false;
    } else if (e.type == "focusout") {
      if (addedCardTitle == "") addingCard = false;
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
        <div
          class="list-draggable-element"
          class:draggable-cursor={canMoveList}
          on:mousedown|self={(e) => canMoveList && setDragList(e)}
        />
        <!-- svelte-ignore a11y-autofocus -->
        <div class="list-header-content">
          <div
            class="list-title list-title-{li} editable"
            contenteditable="true"
            on:focusout={autoRemove}
            on:keypress={(e) => {
              if (e.key == "Enter") addingCard = true;
            }}
            bind:textContent={data.title}
          />
          <div class="list-menu-btn" id="open-list-menu-{li}">
            <Icon iconName="dots-horizontal" --szot-icon-font-size="20px" />
          </div>
        </div>
      </div>
      <div class="list-cards list-cards-{li}">
        <!-- {#each data.cards.slice(0, 1) as card, ci} -->
        {#each data.cards as card, ci}
          <Card bind:data={card} {ci} cli={li} {customCard} {canMoveCard} />
        {/each}
        {#if addingCard}
          <div class="adding-card-container">
            <!-- svelte-ignore a11y-autofocus -->
            <div
              class="adding-text editable"
              contenteditable="true"
              autofocus
              bind:textContent={addedCardTitle}
              on:keydown={handleCreatingCard}
              on:focusout={handleCreatingCard}
            />
            <div class="card-adding-btns">
              <Button
                on:click={() => (addingCard = false)}
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
          on:click={() => (addingCard = true)}
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

<ListMenu bind:li bind:data bind:addingCard />

<style lang="scss">
  @import "../index.scss";

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
        border-radius: var(--radius-pattern);
      }

      .list {
        display: flex;
        flex-direction: column;

        .list-header,
        .list-footer,
        .list-cards {
          background-color: var(--list-background-color);
        }

        .list-header,
        .list-footer {
          cursor: pointer;
        }

        .list-header {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-pattern) var(--radius-pattern) 0 0;

          .list-draggable-element {
            width: 100%;
            height: calc(var(--target-padding));
            background: transparent;
          }

          .draggable-cursor {
            cursor: grab;
          }

          .list-header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 var(--target-padding);
            padding-bottom: calc(var(--target-padding) / 2);

            .list-title {
              font-size: 1.2rem;
              font-weight: bold;
              color: var(--list-font-color);

              &:focus {
                width: calc(100% - calc(var(--target-padding)) * 2);
                padding: 2px 5px;
              }
            }

            .list-menu-btn {
              &:hover {
                opacity: 0.8;
                cursor: pointer;
              }
            }
          }
        }

        .list-footer {
          display: flex;
          justify-content: center;
          padding: var(--target-padding); // change
          border-radius: 0 0 var(--radius-pattern) var(--radius-pattern);
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
              border-radius: var(--radius-pattern);
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
