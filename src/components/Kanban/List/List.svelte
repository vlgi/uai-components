<script lang="ts">
  import type {
    TList,
    TCustomList,
    TBoard,
    TCustomBoard,
    TCardLabel,
  } from "../data/types";
  import { card } from "../data/empty-data";
  import { texts } from "../data/components-texts";

  // stores
  import {
    dci,
    tcli,
    dli,
    dlEl,
    tli,
    tlEl,
    pos,
    relPos,
    dir,
    lang,
    dlh,
  } from "../stores";

  // components
  import Card from "../Card/Card.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import ListMenu from "./ListMenu.svelte";

  // funcs
  import { changeElementPosition, getRelativePosition } from "../utils";

  // list props
  export let data: TList | TCustomList; // list data
  export let boardData: TBoard | TCustomBoard;
  export let labelsData: TCardLabel[] = [];
  export let li: number; // list index
  export let customCard = null;
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  let addedCardTitle = "";
  let overed = false;
  let listenerH = 0;

  // set dragging list values
  function setDragList(e): void {
    if (e.button != 0) return; // if not left button, do nothing
    const list = document.querySelector(`.list-${li}`);
    const listener: HTMLElement = document.querySelector(`.lane`);
    listenerH = listener.offsetHeight;
    dlEl.set(list); // set dragging list html element (.list div)
    const header = document.querySelector(`.list-header-${li}`);
    const cards = document.querySelector(`.list-cards-${li}`);
    const footer = document.querySelector(`.list-footer-${li}`);
    dlh.set(
      `${header.clientHeight + cards.clientHeight + footer.clientHeight}px`
    ); // set dragging list placeholder height
    dli.set(li); // set dragging list index
    relPos.set(getRelativePosition(e.clientX, e.clientY, e.target)); // relative mouse position in relation to the html element
    changeElementPosition($pos, $dlEl, { x: $relPos.x, y: -20 }); // change dragging element position
  }

  // change dragging list position
  $: $pos && $dli != -1 && moveDragList();
  function moveDragList(): void {
    // when there is a dragging element and pos change, change html element position
    changeElementPosition($pos, $dlEl, { x: $relPos.x, y: -20 });
  }

  // set values on list over (.lane over)
  function onLaneOver(): void {
    if (($dli != -1 || $dci != -1) && $dli != li && !overed) {
      tli.set(li); // set target list index
      tlEl.set(document.querySelector(`.list-${li}`)); // set target list html element (.list div)
      overed = true;
    }
  }

  // on lane mouse out event reset related data
  function onLaneOut(): void {
    overed = false;
    if ($dli != -1 || $dci != -1) {
      tli.set(-1); // reset target list index
      tlEl.set(null); // reset target list html element (.list div)
    }
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
      const lists = [...boardData.lists];
      lists.splice(lists.length - 1, 1);
      boardData = { ...boardData, lists: [...lists] };
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

  $: addingCard = false;
  $: menuCondition =
    canMoveCard ||
    canCreateCard ||
    canDeleteCard ||
    canMoveList ||
    canCreateList ||
    canDeleteList;
</script>

<div class="lane">
  <div
    class="lane-listener"
    on:focus
    on:mouseover|self={onLaneOver}
    on:blur
    on:mouseout={onLaneOut}
    class:lane-listener-active={$dli != -1}
    style="height: {$dlh}"
  />
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
        {#if menuCondition}
          <div class="list-menu-btn" id="open-list-menu-{li}">
            <Icon iconName="dots-horizontal" --szot-icon-font-size="20px" />
          </div>
        {/if}
      </div>
    </div>
    <div class="list-cards list-cards-{li}">
      <!-- {#each data.cards.slice(0, 1) as card, ci} -->
      {#each data.cards as card, ci}
        <Card
          bind:boardData
          bind:data={card}
          bind:labelsData
          {ci}
          cli={li}
          {customCard}
          {canMoveCard}
          {canDeleteCard}
        />
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
    {#if canCreateCard}
      <div class="list-footer list-footer-{li}">
        <Button
          on:click={() => (addingCard = true)}
          size="small"
          buttonStyleType="outline"
          buttonStyle="dark"
        >
          {texts.createCard[$lang]}
        </Button>
      </div>
    {/if}
  </div>
</div>

{#if menuCondition}
  <ListMenu
    bind:boardData
    bind:data
    bind:addingCard
    {li}
    {canMoveCard}
    {canCreateCard}
    {canDeleteCard}
    {canMoveList}
    {canCreateList}
    {canDeleteList}
  />
{/if}

<style lang="scss">
  .lane {
    display: grid;
    grid-template-rows: 100%;

    .lane-listener {
      display: none;
      opacity: 0.7;
      position: absolute;
      width: var(--list-width);
      z-index: 2000;
    }

    .lane-listener-active {
      display: block;
    }

    .list,
    .list-placeholder {
      width: var(--list-width);
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
          height: calc(var(--target-padding) * 2 - 5px);
          background: transparent;
          margin-bottom: calc(-1 * var(--target-padding) + 5px);
          z-index: 1990;
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
            font-size: var(--list-title-font-size);
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
</style>
