<script lang="ts">
  import { tick } from "svelte";

  import { texts } from "../data/components-texts";
  import { checklist } from "../data/empty-data";
  import { changeElPositionByIndex } from "../utils";

  // stores
  import type { TCard, TBoard, TCustomBoard } from "../data/types";
  import { text } from "svelte/internal";
  import { lang } from "../stores";

  // components
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Select from "../../formFields/Select/Select.svelte";
  import CardHandleDueDates from "./CardHandleDueDates.svelte";

  export let data: TCard; // card data
  export let boardData: TBoard | TCustomBoard;
  export let selectCardUserModalOpened = false;
  export let handleLabelsModalOpened = false;
  export let showAdd = false;
  export let opened = false;
  export let ci: number; // card index
  export let cli: number; // card list index
  export let canMoveCard = true;
  export let canDeleteCard = true;

  async function addChecklist(): Promise<any> {
    const emptyChecklist = { ...checklist };
    data.checklists = [...data.checklists, emptyChecklist];
    await tick();
    const i = data.checklists.length - 1;
    const el: HTMLElement = document.querySelector(`.checklist-title-${i}`);
    el.focus();
  }

  function changeCardPosition(): void {
    if (cli == targetListIndex) {
      boardData.lists[cli].cards = changeElPositionByIndex(
        boardData.lists[cli].cards,
        ci,
        targetCardIndex
      );
    } else if (cli != targetListIndex) {
      const temp = { ...boardData };
      const card = data; // card data
      temp.lists[targetListIndex].cards.splice(targetCardIndex, 0, card); // insert card on targetList (temp copy)
      temp.lists[cli].cards.splice(ci, 1); // remove card from the original list
      boardData = { ...temp }; // update target list with targetList (updated copy)
    }
    opened = false;
  }

  $: actionAlertBtnText = "";
  $: openAlertModal = false;
  $: funcAction = null;
  $: targetListIndex = cli;
  $: targetCardIndex = ci;
  $: showDueDatesModal = false;
  $: listCardsPositions =
    targetListIndex != -1 &&
    boardData.lists[targetListIndex].cards.map((card, index) => {
      return { text: index };
    });
  $: isBtnEnable = !(cli == targetListIndex && ci == targetCardIndex);
</script>

<Dropdown
  targetId="modal-menu"
  enableAutAdjust={false}
  dropdownAlignment="bottomRight"
  --szot-dropdown-padding="0"
>
  <div class="drop-menu-container">
    <div class="drop-menu-section">
      {texts.cardAction[$lang]}
    </div>
    <div class="divider" />
    <div class="item" on:click={() => (selectCardUserModalOpened = true)}>
      {texts.addMember[$lang]}
    </div>
    <div class="item" on:click={() => (handleLabelsModalOpened = true)}>
      {texts.addLabel[$lang]}
    </div>
    <div class="item" on:click={addChecklist}>
      {texts.addChecklist[$lang]}
    </div>
    <div class="item" on:click={() => (showAdd = !showAdd)}>
      {texts.addAttachment[$lang]}
    </div>
    <div class="item" on:click={() => (showDueDatesModal = true)}>
      {texts.addDueDates[$lang]}
    </div>
    {#if canMoveCard}
      <div class="divider" />
      <div
        class="item"
        on:click={() => {
          openAlertModal = true;
          actionAlertBtnText = texts.move[$lang];
          funcAction = changeCardPosition;
        }}
      >
        {texts.changeCardPosition[$lang]}
      </div>
    {/if}
    {#if canDeleteCard}
      <div class="divider" />
      <div class="item item-alert" on:click={() => console.log("deletar")}>
        {texts.removeCard[$lang]}
      </div>
    {/if}
  </div>
</Dropdown>

<Modal bind:opened={openAlertModal} --szot-modal-width="400px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <h3>{texts.changeCardPositionAlert[$lang]}</h3>
    <div class="lists">
      {#each boardData.lists as list, index}
        <div
          class="item"
          class:selected={targetListIndex == index}
          on:click={() => {
            targetListIndex = index;
          }}
        >
          <span>{list.title}</span>
          {#if targetListIndex == index}
            <Icon iconName="check" --szot-icon-font-size="15px" />
          {/if}
        </div>
      {/each}
    </div>
    <Select
      id="card-position"
      name="card-position"
      required={true}
      options={listCardsPositions}
      label={texts.cardPosition[$lang]}
      selected={listCardsPositions[targetCardIndex]}
      on:changeSelected={(e) => (targetCardIndex = e.detail.text)}
    />
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => (openAlertModal = false)}
      size="medium"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel[$lang]}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      on:click={() => {
        funcAction();
        openAlertModal = false;
      }}
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
      disabled={!isBtnEnable}
    >
      {actionAlertBtnText}
    </Button>
  </div>
</Modal>

<CardHandleDueDates
  bind:data
  bind:opened={showDueDatesModal}
  title={texts.cardDates[$lang]}
/>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .selected {
    background: #eee;
  }

  .lists {
    border: 1px solid #5f5f5f;
    border-radius: var(--radius-pattern);
    padding: 5px;
  }
</style>
