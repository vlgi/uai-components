<script lang="ts">
  import type { TCard } from "../data/types";
  import Icon from "../../Icon/Icon.svelte";
  import { texts } from "../data/components-texts";

  // props
  export let data; // label data from card
  export let cardData: TCard; // label card data
  export let showIcon = false; // show icon boolean
  export let canEditText = false;
  export let icon = ""; // label icon
  export let allowEdit = false; // allow edition boolean
  export let focus = false; // label span text focus to edit
  export let canSelect = false; // can click and select label

  // stores
  import { lang, allLabels, board } from "../stores";

  // components
  import CardHandleLabelsColorsModal from "./CardHandleLabelsColorsModal.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";

  // local variables
  $: openModal = false;
  $: showRemoveLabelsAlert = false;

  // functions
  import { checkIfItemIsInArray } from "../utils";

  $: if (focus) document.getElementById("label-editable").focus();

  // remove label from board props labels (board avaiable labels) and from all cads
  function removeLabel(): void {
    // remove label from all labels stores
    const allTags = [...$allLabels];
    $allLabels.forEach((label, i) => {
      if (JSON.stringify(label) === JSON.stringify(data)) {
        allTags.splice(i, 1);
        allLabels.set(allTags);
      }
    });

    // remove label from all cards
    const boardData = { ...$board };
    boardData.lists.forEach((list) => {
      list.cards.forEach((card) => {
        card.labels.forEach((label, i) => {
          const labels = [...card.labels];
          if (JSON.stringify(label) === JSON.stringify(data)) {
            labels.splice(i, 1);
            card.labels = [...labels];
          }
        });
      });
    });
    board.set(boardData);
    showRemoveLabelsAlert = false;
  }

  function handleCardLabel(): void {
    const check = checkIfItemIsInArray(data, cardData.labels);
    const labels = [...cardData.labels];
    if (check.isInIt) {
      labels.splice(check.index, 1);
      cardData.labels = [...labels];
    }
    if (!check.isInIt) cardData.labels = [...cardData.labels, data];
  }
</script>

<div class="card-label-container">
  {#if allowEdit}
    <div
      class="card-edit-btn"
      on:click={() => (openModal = true)}
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
        on:focusout={() => (focus = false)}
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
      {#if showIcon}<Icon
          iconName={icon}
          --szot-icon-font-size="20px"
          --szot-icon-color="white"
        />{/if}
    </div>
  </div>
  {#if allowEdit}
    <div
      class="card-remove-btn"
      on:click={() => (showRemoveLabelsAlert = true)}
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
/>

<Modal bind:opened={showRemoveLabelsAlert} --szot-modal-width="400px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-label-alert">
    <h3>{texts.removeLabelAlert[$lang][0]}</h3>
    <div class="modal-card-label">
      <div class="card-label" style="background-color: {data.hex}4e">
        <div class="circle" style="background-color: {data.hex}" />
        <span>{data.title}</span>
      </div>
    </div>
    <p>{texts.removeLabelAlert[$lang][1]}</p>
  </div>
  <div slot="modal-footer" class="footer">
    <Button
      on:click={() => (showRemoveLabelsAlert = false)}
      size="medium"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel[$lang]}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      on:click={removeLabel}
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {texts.remove[$lang]}
    </Button>
  </div>
</Modal>

<style lang="scss">
  @import "../index.scss";
  .card-label-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    .card-edit-btn {
      border-radius: var(--szot-radius) 0 0 var(--szot-radius);
    }

    .card-remove-btn {
      border-radius: 0 var(--szot-radius) var(--szot-radius) 0;
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
    border-radius: var(--szot-radius);
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

  .remove-label-alert {
    .modal-card-label {
      display: flex;
      justify-content: center;
      width: 100%;
      background: #eee;
      padding: 1rem;
      border-radius: var(--szot-radius);
      margin: 10px 0; // change
      .card-label {
        width: fit-content;
      }
    }
  }

  .card-label-edit-btn {
    border-radius: 0;
  }

  .footer {
    display: flex;
    gap: 10px; // change
    justify-content: center;
  }
</style>
