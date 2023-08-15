<script lang="ts">
  /* eslint-disable */
  /**
   * Disabling lint for this file because him can't handle with $$Generic
   * necessary to make the table columns and table rows be strong typed.
   */
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import type { DndEvent } from "svelte-dnd-action";
  import Card from "$components/Card/Card.svelte";
  import { diffDatas } from "../../logger";
  import type { TDiffDatas } from "../../logger";

  type TCardData = $$Generic<{ id: number }>;

  export let id: number;
  export let title = " ";
  // animation duration in milliseconds for moving cards
  export let animationDurationMs = 150;
  export let cardsList: TCardData[] = [];

  /** lets you customize the style of the draggable area when moving an item. [how use?](https://github.com/isaacHagoel/svelte-dnd-action)*/
  export let dropTargetStyle: Record<string, string> = { outline: "none" };
  export let dragDisabled = false;

  // save what we have before the change to create the log
  let listBeforeChange: TCardData[] = structuredClone(cardsList);
  let lastChangeItemID: number = 0;

  let cardsListClone: TCardData[] = structuredClone(cardsList);

  const dispatch = createEventDispatcher<{
    clickCard: {
      listId: number;
      cardId: number;
    };
    draggingCard: {
      listId: number;
      cardId: number;
    };
    finishDraggingCard: {
      listId: number;
      cardId: number;
    };
    changelog: TDiffDatas;
  }>();

  function clickCard(cardData: TCardData) {
    dispatch("clickCard", {
      listId: id,
      cardId: cardData.id,
    });
  }

  // functions of the lib "svelte-dnd-action" necessary for moving cards
  function handleDndConsider(e: CustomEvent<DndEvent<TCardData>>) {
    cardsListClone = structuredClone(e.detail.items);
    dispatch("draggingCard", { listId: id, cardId: Number(e.detail.info.id) });
  }

  function handleDndFinalize(e: CustomEvent<DndEvent<TCardData>>) {
    cardsList = structuredClone(e.detail.items);
    lastChangeItemID = Number(e.detail.info.id);

    dispatch("finishDraggingCard", { listId: id, cardId: Number(e.detail.info.id) });
  }

  function fireChangeLog(cardsList: TCardData[]) {
    if (cardsList) {
      cardsListClone = structuredClone(cardsList);
      const log = diffDatas(cardsList, listBeforeChange, lastChangeItemID);
      if (log.action !== "none") {
        // Event fired every time the cardList change
        dispatch("changelog", log);
      }
      listBeforeChange = structuredClone(cardsList);
    }
  }

  $: fireChangeLog(cardsList);
</script>

<Card
  bodySlotted
  {title}
>
  <div
    class="header"
    slot="header"
  >
    <slot name="header-list" />
  </div>

  <div
    use:dndzone={{
      items: cardsListClone,
      flipDurationMs: animationDurationMs,
      type: "cards",
      dropTargetStyle,
      dragDisabled,
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
    class="list"
  >
    {#each cardsListClone as cardData, index (cardData.id)}
      <div
        animate:flip={{ duration: animationDurationMs }}
        on:click={() => {
          clickCard(cardData);
        }}
        on:keyup={() => {
          clickCard(cardData);
        }}
      >
        <!--
          Here the slot receives the data object and a spreed with the data.
          This allows you to be able to use the data without having to pass
          a component to the slot due to an eslint error.
        -->
        <slot
          name="list-item"
          {index}
          {cardData}
          {...cardData}
        />
      </div>
    {/each}
  </div>
  <svelte:fragment slot="footer">
    <slot name="footer-list" />
  </svelte:fragment>
</Card>

<style lang="scss">
  .header {
    overflow: hidden;
  }
  .list {
    display: var(--szot-list-display, flex);
    flex-direction: var(--szot-list-flex-direction, column);

    gap: var(--szot-list-items-gap, 0.5rem);
    padding: var(--szot-list-padding, 0 0.25rem);
    height: 100%;
    overflow: auto;
  }
</style>
