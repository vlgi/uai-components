<script lang="ts">
  import Kanban from "./Kanban.svelte";
  import ListExample from "./components/List/ListExample.svelte";
  import type { TDiffDatas } from "./logger";

  type TCardsList = {
    id: number;
    title: string;
    labels: {
      text: string;
      backgroundColor?: string;
      textColor?: string;
    }[];
  }[];

  type TListData = {
    id: number;
    title: string;
    cardsList: TCardsList;
  }[];

  export let columnItems: TListData = [];
  export let animationDurationMs = 150;
  export let dropTargetStyle: Record<string, string> = { outline: "none" };
  export let dragDisabled = false;

  let columnLastChange: {
    id: number;
    action: TDiffDatas["action"];
    index: number;
  }[] = [];

  let openLabels = true;

  function showChangelog(ev: CustomEvent<TDiffDatas[]>) {
    columnLastChange = ev.detail.map((data) => {
      return {
        id: data.item.id,
        action: data.action,
        index: data.index,
      };
    });
  }
</script>

<div class="container">
  <Kanban
    bind:columnItems
    {dropTargetStyle}
    {animationDurationMs}
    {dragDisabled}
    on:clickColumn
    on:draggingColumn
    on:finishDraggingColumn
    on:changelog
    on:changelog={showChangelog}
    --szot-kanban-height="90vh"
  >
    <svelte:fragment
      slot="column"
      let:columnData
      let:index
    >
      <!-- eslint-disable @typescript-eslint/no-unsafe-member-access -->
      <ListExample
        id={columnData.id}
        title={columnData.title}
        {animationDurationMs}
        bind:cardsList={columnItems[index].cardsList}
        showLog={false}
        bind:openLabels
      />
    </svelte:fragment>
  </Kanban>
</div>

<div>
  <span>last action in Kanban</span>
  <br />

  {JSON.stringify(columnLastChange, null, 2)}
  <br />
  <br />
</div>

<style lang="scss">
</style>
