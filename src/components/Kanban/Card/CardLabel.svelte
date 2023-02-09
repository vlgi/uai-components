<script lang="ts">
  import { checkIfItemIsInArray } from "../../../helpers/arrays-handling";
  import { compareObjects } from "../../../helpers/objects-handling";
  import type {
    TDefautCard, TBoard, TCustomBoard, TCardLabel,
  } from "../data/types";
  import { texts } from "../data/components-texts";

  import { selectedCards } from "../stores";

  // components
  import CardHandleLabelsColorsModal from "./CardHandleLabelsColorsModal.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Icon from "../../Icon/Icon.svelte";

  // props
  export let data: TCardLabel; // label data from card
  export let boardData: TBoard | TCustomBoard = null;
  export let labelsData: TCardLabel[] = [];
  export let cardData: TDefautCard; // label card data
  export let showIcon = false; // show icon boolean
  export let canEditText = false;
  export let icon = ""; // label icon
  export let allowEdit = false; // allow edition boolean
  export let focus = false; // label span text focus to edit
  export let canSelect = false; // can click and select label

  let openModal = false;
  let showRemoveLabelsAlert = false;
  let selecteds = $selectedCards as [number, number][];

  // remove label from board props labels (board avaiable labels) and from all cads
  function removeLabel(): void {
    const allTags = [...labelsData];
    labelsData.forEach((label, i) => {
      if (compareObjects(label, data)) {
        allTags.splice(i, 1);
        labelsData = allTags;
      }
    });

    // remove label from all cards
    const boardDataCopy = { ...boardData };
    boardDataCopy.lists.forEach((list) => {
      list.cards.forEach((card) => {
        card.labels.forEach((label, i) => {
          const labels = [...card.labels];
          if (compareObjects(label, data)) {
            labels.splice(i, 1);
            card.labels = [...labels];
          }
        });
      });
    });
    boardData = { ...boardDataCopy };
    showRemoveLabelsAlert = false;
  }

  function checkIfAllSelectedsHasLabel(): boolean {
    let allHasLabel = true;
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]] as TDefautCard;
      const check = checkIfItemIsInArray(data, card.labels);
      if (!check.isInIt) allHasLabel = false;
    });
    return allHasLabel;
  }

  function removeLabelFromSelectedCards() {
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]] as TDefautCard;
      const check = checkIfItemIsInArray(data, card.labels);
      const { labels } = card;
      labels.splice(check.index, 1);
      boardData.lists[selected[0]].cards[selected[1]].labels = [...labels];
    });
  }

  function addLabelToSelectedCards() {
    selecteds.forEach((selected) => {
      const card = boardData.lists[selected[0]].cards[selected[1]] as TDefautCard;
      const check = checkIfItemIsInArray(data, card.labels);
      if (!check.isInIt) {
        boardData.lists[selected[0]].cards[selected[1]].labels = [...card.labels, data];
      }
    });
  }

  function handleCardLabel(): void {
    if (selecteds[0][0] === -1) {
      const check = checkIfItemIsInArray(data, cardData.labels);
      const labels = [...cardData.labels];
      if (check.isInIt) {
        labels.splice(check.index, 1);
        cardData.labels = [...labels];
      }
      if (!check.isInIt) cardData.labels = [...cardData.labels, data];
    } else if (checkIfAllSelectedsHasLabel()) {
      removeLabelFromSelectedCards();
    } else {
      addLabelToSelectedCards();
    }
  }

  $: if (focus) document.getElementById("label-editable")?.focus();
  $: selecteds = $selectedCards as [number, number][];

</script>

<div class="card-label-container" on:click>
  {#if allowEdit}
    <div
      class="card-edit-btn"
      on:click={() => {
        openModal = true;
      }}
      style="background-color: {data.hex}4e"
    >
      <Icon iconName="square-edit-outline" --szot-icon-font-size="15px" />
    </div>
  {/if}
  <div
    on:click={() => canSelect && handleCardLabel()}
    class="card-label"
    class:card-label-edit-btn={allowEdit}
    style="background-color: {data.hex}4e"
  >
    <div class="circle" style="background-color: {data.hex}" />
    {#if canEditText}
      <!-- svelte-ignore a11y-autofocus -->
      <span
        autofocus
        on:focusout={() => {
          focus = false;
        }}
        id="label-editable"
        class="editable"
        contenteditable="true"
        bind:textContent={data.title}
        style="padding: 10px"
      />
    {:else}
      <span>{data.title}</span>
    {/if}
    <div class="card-label-icon">
      {#if selecteds[0][0] !== -1 && boardData ? checkIfAllSelectedsHasLabel() : showIcon}
        <Icon
          iconName={icon}
          --szot-icon-font-size="20px"
          --szot-icon-color="white"
        />
      {/if}
    </div>
  </div>
  {#if allowEdit}
    <div
      class="card-remove-btn"
      on:click={() => {
        showRemoveLabelsAlert = true;
      }}
      style="background-color: {data.hex}4e"
    >
      <Icon iconName="trash-can-outline" --szot-icon-font-size="15px" />
    </div>
  {/if}
</div>

<CardHandleLabelsColorsModal
  bind:opened={openModal}
  bind:labelData={data}
  bind:cardData
  bind:labelsData
  bind:boardData
/>

<Modal bind:opened={showRemoveLabelsAlert} --szot-modal-width="400px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeLabelAlert[0]}</h3>
    <div class="modal-card-label">
      <div class="card-label" style="background-color: {data.hex}4e">
        <div class="circle" style="background-color: {data.hex}" />
        <span>{data.title}</span>
      </div>
    </div>
    <p>{texts.removeLabelAlert[1]}</p>
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => {
        showRemoveLabelsAlert = false;
      }}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      on:click={removeLabel}
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {texts.remove}
    </Button>
  </div>
</Modal>

<style lang="scss">
  @use "src/components/Kanban/styles.scss";
  .card-label-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    .card-edit-btn {
      border-radius: var(--radius-pattern) 0 0 var(--radius-pattern);
    }

    .card-remove-btn {
      border-radius: 0 var(--radius-pattern) var(--radius-pattern) 0;
    }

    .card-edit-btn,
    .card-remove-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 0 5px;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }

  .card-label {
    display: grid;
    gap: 5px;
    grid-auto-flow: column;
    grid-template-columns: 12px calc(100% - 40px) auto;
    align-items: center;
    justify-items: start;
    min-height: 30px;
    height: fit-content;
    width: 100%;
    padding: 0.2rem 0.4rem;
    border-radius: var(--radius-pattern);
    font-weight: 500;

    .circle {
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }

    span {
      font-size: 15px;
      line-height: 15px;
      white-space: normal;
      width: 100%;
      max-width: 300px;

      .card-label-icon {
        margin-left: 0.5rem;
        width: 100%;
        background: red;
      }
    }

    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .remove-alert {
    .modal-card-label {
      display: flex;
      justify-content: center;
      width: 100%;
      background: #eee;
      padding: 1rem;
      border-radius: var(--radius-pattern);
      margin: 10px 0; // change

      .card-label {
        width: fit-content;
      }
    }
  }

  .card-label-edit-btn {
    border-radius: 0;
  }
</style>
