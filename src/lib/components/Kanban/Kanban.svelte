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

  $: if (columnItems) {
    columnItemsClone = structuredClone(columnItems);
    sendLogger();
    columnItemsBeforeChange = structuredClone(columnItems);
  }
</script>

<div
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
    flex-direction: var(--szot-kanban-flex-direction, row);

    border: var(--szot-kanban-border, none);
    padding: var(--szot-kanban-padding, 0.5rem);
    width: var(--szot-kanban-width, fit-content);
    height: var(--szot-kanban-height, 100%);
    gap: var(--szot-kanban-gap, 1rem);
  }

  .column {
    width: 100%;
  }
</style>
