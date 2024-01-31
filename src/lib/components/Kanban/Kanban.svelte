<script lang="ts">
  /* eslint-disable */
  /**
   * Disabling lint for this file because him can't handle with $$Generic
   * necessary to make the table columns and table rows be strong typed.
   */

  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import type { DndEvent } from "svelte-dnd-action";
  import { dndzone } from "svelte-dnd-action";
  import { diffDatas } from "./logger";
  import type { TDiffDatas } from "./logger";

  type TColumnData = $$Generic<{ id: number }>;

  export let columnItems: TColumnData[] = [];

  // animation duration in milliseconds for moving lists
  export let animationDurationMs = 150;

  /** lets you customize the style of the draggable area when moving an item. [how use?](https://github.com/isaacHagoel/svelte-dnd-action)*/
  export let dropTargetStyle: Record<string, string> = { outline: "none" };
  export let dragDisabled = false;

  // save what we have before the change to create the log
  let columnItemsBeforeChange: TColumnData[] = structuredClone(columnItems);
  let columnItemsClone: TColumnData[] = structuredClone(columnItems);

  // variables to controls zone scroll
  let scrollContainerEl: HTMLElement = null;
  let dndRectData: DOMRect;
  let interval = null;
  let isAutoScrollEnabled = false;

  const dispatch = createEventDispatcher<{
    clickColumn: { columnId: number };
    changelog: TDiffDatas[];
    draggingColumn: { columnId: number };
    finishDraggingColumn: { columnId: number };
  }>();

  function clickColumn(columnData: TColumnData) {
    dispatch("clickColumn", { columnId: columnData.id });
  }

  function handleDndConsider(e: CustomEvent<DndEvent<TColumnData>>) {
    columnItemsClone = structuredClone(e.detail.items);
    dispatch("draggingColumn", { columnId: Number(e.detail.info.id) });
  }
  function handleDndFinalize(e: CustomEvent<DndEvent<TColumnData>>) {
    columnItems = structuredClone(e.detail.items);
    dispatch("finishDraggingColumn", { columnId: Number(e.detail.info.id) });
  }

  function sendLogger() {
    const loggerList: TDiffDatas[] = [];
    columnItems.forEach((item) => {
      loggerList.push(diffDatas(columnItems, columnItemsBeforeChange, item.id));
    });

    dispatch("changelog", loggerList);
  }

  function startScroll(x: number) {
    if (interval || !scrollContainerEl) return;
    interval = setInterval(() => scrollContainerEl.scrollBy({ left: x }), 25);
  }

  function stopScroll() {
    clearInterval(interval);
    interval = null;
  }

  function scrollToLeft() {
    startScroll(-10);
  }

  function scrollToRight() {
    startScroll(10);
  }

  function enableAutoScroll() {
    isAutoScrollEnabled = true;
  }

  function disableAutoScroll() {
    isAutoScrollEnabled = false;
    stopScroll();
  }

  function handleAutoScroll(ev: MouseEvent) {
    if (!isAutoScrollEnabled || !dndRectData) return;

    const offset = 70;
    const leftThreshold = dndRectData.x + offset;
    const rightThreshold = dndRectData.x + dndRectData.width - offset;

    const { clientX } = ev;
    if (clientX < leftThreshold) {
      scrollToLeft();
    } else if (clientX > rightThreshold) {
      scrollToRight();
    } else {
      stopScroll();
    }
  }

  /**
   * set internal variables to control the kanban
   */
  function handleColumnItemsChange(columnItems: TColumnData[]) {
    columnItemsClone = structuredClone(columnItems);
    sendLogger();
    columnItemsBeforeChange = structuredClone(columnItems);
  }

  $: handleColumnItemsChange(columnItems);
</script>

<svelte:window
  on:mousemove={handleAutoScroll}
  on:mousedown|capture={enableAutoScroll}
  on:mouseup|capture={disableAutoScroll}
/>

<div
  bind:this={scrollContainerEl}
  bind:contentRect={dndRectData}
  use:dndzone={{
    items: columnItemsClone,
    flipDurationMs: animationDurationMs,
    type: "columns",
    dropTargetStyle,
    dragDisabled,
  }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
  class="colums-list"
>
  {#each columnItemsClone as columnData, index (columnData.id)}
    <div
      animate:flip={{ duration: animationDurationMs }}
      on:click={() => {
        clickColumn(columnData);
      }}
      on:keyup={() => {
        clickColumn(columnData);
      }}
      class="column"
    >
      <!--
        here the slot receives the data object and a spreed with the data.
        This allows you to be able to use the data without having to pass
        a component to the slot due to an eslint error.
        If not, you can use the object directly.
      -->
      <slot
        name="column"
        {columnData}
        {...columnData}
        {index}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .colums-list {
    display: flex;
    flex-direction: row;

    border: var(--uai-kanban-border, none);
    padding: var(--uai-kanban-padding, 0.5rem);
    width: var(--uai-kanban-width, 100%);
    overflow: auto;
    height: var(--uai-kanban-height, 100%);
    gap: var(--uai-kanban-gap, 1rem);
  }

  .column {
    width: var(--uai-kanban-column-width, 25rem);
    flex-shrink: 0;
  }
</style>
