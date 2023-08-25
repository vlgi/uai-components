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
  import Label from "../Label/Label.svelte";
  import Card from "$components/Card/Card.svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import type { TDiffDatas } from "../../logger";
  import type { ComponentProps } from "svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<List<TCardsList>> {
    id: number;
    cardsList: TCardsList[];
    showLog?: boolean;
    openLabels?: boolean;
  }

  // Used to force $$restProps be of type ComponentProps<List<TCardsList>>;
  function typeRestProps(restProps: unknown) {
    return restProps as ComponentProps<List<TCardsList>>;
  }

  export let id: number;
  export let cardsList: TCardsList[];

  // variables used in the kanban example
  export let showLog = true;
  export let openLabels = true;

  let listLastChange: TDiffDatas = undefined;

  function showChangelog(ev: CustomEvent<TDiffDatas>) {
    listLastChange = ev.detail;
  }
</script>

<List
  {id}
  bind:cardsList
  {...typeRestProps($$restProps)}
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
    let:labels
    let:title
  >
    <div class="card">
      <Card>
        <div
          class="header"
          slot="header"
        >
          <div class="labels">
            {#each labels as labelData}
              <Label
                bind:isOpened={openLabels}
                {labelData}
              />
            {/each}
          </div>
          <span>{title}</span>
        </div>
        <p>
          {id} - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book.
        </p>
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

  .labels {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  .card {
    filter: brightness(80%);
    &:hover {
      filter: brightness(100%);
    }
  }
</style>
