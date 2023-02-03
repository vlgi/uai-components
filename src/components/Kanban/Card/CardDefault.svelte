<script lang="ts">
  import type {
    TBoard,
    TCardChecklistItem,
    TCardLabel,
    TDefautCard,
  } from "../data/types";

// stores
import { dci } from "../stores";

  // components
  import CardModal from "./CardModal.svelte";
  import CardFooter from "./CardFooter.svelte";
  import CardLabel from "./CardLabel.svelte";

  // functions
  import { getCover } from "../utils";

  // card props
  export let data: TDefautCard; // card data
  export let boardData: TBoard;
  export let labelsData: TCardLabel[] = [];
  export let ci: number; // card index
  export let cli: number; // card list index
  export let customCard = null;
  export let canMoveCard = true;
  export let canDeleteCard = true;

  let showModal = false; // if its true, show card modal

  // calculate how many dones items inside checklists

  function transformCardData(_data: TDefautCard) {
    let all: TCardChecklistItem[] = [];
    const dones: TCardChecklistItem[] = [];
    _data.checklists.forEach((cList) => {
      all = [...all, ...cList.items];
      cList.items.forEach((item) => {
        if (item.done) dones.push(item);
      });
    });
    data.allChecklistsItems = [...all];
    data.allDoneChecklistsItems = [...dones];
  }

  $: transformCardData(data);
  $: cover = getCover(data.attachments);

</script>

<CardModal
  bind:boardData
  bind:data
  bind:labelsData
  bind:opened={showModal}
  {cli}
  {ci}
  {canMoveCard}
  {canDeleteCard}
/>

<div class="card-container"
    on:mouseup={() => {
      if (!customCard && $dci === -1) showModal = true;
    }}
  >
  <div class="card-header">
    {#if data.labels.length > 0}
      <div class="card-labels">
        {#each data.labels as label}
          <div class="label-wrapper">
            <CardLabel bind:data={label} bind:cardData={data} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div class="card-title" class:card-cover={cover !== ""}>
    {#if cover !== ""}<img src={cover} alt="" />{/if}
    <div>{data.title}</div>
  </div>
  <CardFooter bind:data />
</div>


<style lang="scss">
  @use "src/components/Kanban/styles.scss";

  .card-container {
    display: grid;
    grid-auto-flow: row;
    height: fit-content;
    width: 100%;
    padding-top: 3px; // change
    border-radius: var(--radius-pattern);
    z-index: 400;

    .card-header,
    .card-title,
    .card-footer {
      cursor: pointer;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background-color: var(--card-background-color);
      border-radius: var(--radius-pattern) var(--radius-pattern) 0 0;
      padding: var(--card-padding);

      .card-labels {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: var(--card-padding);
        width: 100%;

        .label-wrapper {
          width: fit-content;
        }
      }
    }

    .card-title {
      font-weight: bold;
      background-color: var(--card-background-color);

      div {
        padding: var(--card-padding);
        width: 100%;
      }
    }

    .card-cover {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      img {
        width: auto;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        min-height: 100px;
        max-height: 300px;
        object-fit: contain;
      }

      div {
        display: flex;
        align-items: flex-end;
        height: 100px;
        margin-top: -100px;
        color: white;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.6)
        );
      }
    }
  }

</style>
