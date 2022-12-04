<script lang="ts">
  import Badge from "../Badge/Badge.svelte";
  import Icon from "../Icon/Icon.svelte";
  import CardModal from "./CardModal.svelte";
  import type { TCard } from "./board-data";

  export let data: TCard;
  let convertedCardData: any = { ...data };

  let all = [];
  let dones = [];
  data.checklists.forEach((cList) => {
    all = [...all, ...cList.items];
    cList.items.forEach((item) => {
      if (item.progress == 1) dones.push(item);
    });
  });
  convertedCardData.allChecklistsItems = [...all];
  convertedCardData.allDoneChecklistsItems = [...dones];

  let nCard = {
    ...convertedCardData,
    opened: false,
  };

  function openModal() {
    nCard = { ...data, opened: true };
  }

  function handleDragging(ev) {
    console.log("Dragging...");
  }
</script>

<CardModal data={nCard} />
<div class="container" on:click={openModal}>
  <div class="color" style="background: {data.backgroundColor}" />
  <div class="header">
    <div class="title">{data.title}</div>
    <div class="edit-wrapper">
      <Icon
        iconName={"square-edit-outline"}
        on:click={openModal}
        --szot-icon-font-size="1.2rem"
      />
    </div>
  </div>
  <div class="labels">
    {#each data.labels as label}
      <div style="font-weight: 600;">
        <Badge
          --szot-badge-color="white"
          --szot-badge-font-size=".8rem"
          --szot-badge-border-color={label.backgroundColor}
          --szot-badge-background-color={label.backgroundColor}
          >{label.title}</Badge
        >
      </div>
    {/each}
  </div>
  <div class="footer">
    <div class="checklist-summary">
      <Icon iconName={"checkbox-marked-outline"} --szot-icon-font-size="1rem" />
      {convertedCardData.allDoneChecklistsItems.length}/{convertedCardData
        .allChecklistsItems.length}
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    height: fit-content;
    display: grid;
    grid-auto-flow: row;
    background: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 5px;
    cursor: pointer;

    .color {
      height: 0.5rem;
      border-radius: 5px 5px 0 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .title {
        font-size: 1rem;
        padding: 0.5rem;
      }

      .edit-wrapper {
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }

    .labels {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.1rem;
      padding: 0.25rem 0.5rem;
    }

    .footer {
      border-radius: 0 0 5px 5px;
      padding: 0.25rem 0.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .checklist-summary {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 0.8rem;
      }
    }
  }
</style>
