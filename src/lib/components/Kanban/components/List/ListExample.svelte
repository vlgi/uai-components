<script
  lang="ts"
  context="module"
>
  export type TCardsList = {
    id: number;
    title: string;
    labels: {
      text: string;
      backgroundColor?: string;
      textColor?: string;
    }[];
  };
</script>

<script lang="ts">
  import List from "./List.svelte";
  import Card from "$components/Card/Card.svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import type { TDiffDatas } from "../../logger";

  export let id: number;
  export let title: string;
  export let animationDurationMs: number;
  export let dropTargetStyle: Record<string, string> = { outline: "none" };

  export let cardsList: TCardsList[];

  export let dragDisabled = false;

  // variables used in the kanban example
  export let showLog = true;

  let listLastChange: TDiffDatas = undefined;

  function showChangelog(ev: CustomEvent<TDiffDatas>) {
    listLastChange = ev.detail;
  }
</script>

<List
  {id}
  title="{title}-{id}"
  {dropTargetStyle}
  {animationDurationMs}
  {dragDisabled}
  bind:cardsList
  on:draggingCard
  on:finishDraggingCard
  on:clickCard
  on:changelog
  on:changelog={showChangelog}
>
  <svelte:fragment slot="header-list">
    <Button
      size="round"
      icon="mdi:dots-horizontal"
    />
  </svelte:fragment>

  <svelte:fragment
    slot="list-item"
    let:title
    let:id
  >
    <div class="card">
      <Card>
        <div
          class="header"
          slot="header"
        >
          <span>{title}{id}</span>
        </div>
      </Card>
    </div>
  </svelte:fragment>
</List>

{#if showLog}
  <div>
    <span>last action in list</span>
    <br />
    {JSON.stringify(listLastChange, null, 2)}
  </div>
{/if}

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card {
    filter: brightness(80%);
    &:hover {
      filter: brightness(100%);
    }
  }
</style>
