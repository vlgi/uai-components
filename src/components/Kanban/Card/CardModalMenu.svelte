<script lang="ts">
  import { tick } from "svelte";
  import { changeElPositionByIndex } from "../../../helpers/arrays-handling";

  import { texts } from "../data/components-texts";
  import { checklist } from "../data/empty-data";

  // stores
  import type { TDefautCard, TBoard, TCustomBoard } from "../data/types";

  // components
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Select from "../../formFields/Select/Select.svelte";
  import CardHandleDueDates from "./CardHandleDueDates.svelte";

  export let data: TDefautCard; // card data
  export let boardData: TBoard | TCustomBoard;
  export let selectCardUserModalOpened = false;
  export let handleLabelsModalOpened = false;
  export let showAdd = false; // show addind atts boolean
  export let opened = false; // card modal open
  export let ci: number; // card index
  export let cli: number; // card list index
  export let canMoveCard = true;
  export let canDeleteCard = true;


  let funcAction: ()=> void;
  let actionAlertBtnText = "";
  let isBtnEnable = false;
  let openAlertModal = false;
  let showDueDatesModal = false;
  let targetCardIndex = ci;
  let targetListIndex = cli;
  let textAlert = "";
  let listCardsPositions:
    { text: string }[] = [];

  async function addChecklist() {
    const emptyChecklist = { ...checklist };
    data.checklists = [...data.checklists, emptyChecklist];
    await tick();
    const i = data.checklists.length - 1;
    const el: HTMLElement = document.querySelector(`.checklist-title-${i}`);
    el.focus();
  }

  function deleteCard() {
    const copy = { ...boardData };
    copy.lists[cli].cards.splice(ci, 1);
    boardData = { ...copy };
    opened = false;
  }

  function changeCardPosition() {
    if (cli === targetListIndex) {
      boardData.lists[cli].cards = changeElPositionByIndex(
        boardData.lists[cli].cards,
        ci,
        targetCardIndex,
      );
    } else if (cli !== targetListIndex) {
      const temp = { ...boardData };
      const card = data; // card data
      temp.lists[targetListIndex].cards
        .splice(targetCardIndex, 0, card); // insert card on targetList (temp copy)
      temp.lists[cli].cards.splice(ci, 1); // remove card from the original list
      boardData = { ...temp }; // update target list with targetList (updated copy)
    }
    opened = false;
  }

  function selectCardPosition(e: CustomEvent< { text: string } >) {
    targetCardIndex = Number(e.detail.text);
  }

  $: isBtnEnable = !(cli === targetListIndex && ci === targetCardIndex);
  $: listCardsPositions = boardData.lists[targetListIndex].cards.map((card, index: number) => ({ text: `${index}` }));
</script>

<Dropdown
  targetId="modal-menu"
  enableAutAdjust={false}
  dropdownAlignment="bottomRight"
  --szot-dropdown-padding="0"
>
  <div class="drop-menu-container">
    <div class="drop-menu-section">
      {texts.cardAction}
    </div>
    <div class="divider" />
    <div class="item" on:click={() => {
      selectCardUserModalOpened = true;
    }}>
      {texts.addMember}
    </div>
    <div class="item" on:click={() => {
      handleLabelsModalOpened = true;
    }}>
      {texts.addLabel}
    </div>
    <div class="item" on:click={addChecklist}>
      {texts.addChecklist}
    </div>
    <div class="item" on:click={() => {
      showAdd = !showAdd;
    }}>
      {texts.addAttachment}
    </div>
    <div class="item" on:click={() => {
      showDueDatesModal = true;
    }}>
      {texts.addDueDates}
    </div>
    {#if canMoveCard}
      <div class="divider" />
      <div
        class="item"
        on:click={() => {
          openAlertModal = true;
          actionAlertBtnText = texts.move;
          funcAction = changeCardPosition;
          textAlert = texts.changeCardPositionAlert;
        }}
      >
        {texts.changeCardPosition}
      </div>
    {/if}
    {#if canDeleteCard}
      <div class="divider" />
      <div
        class="item item-alert"
        on:click={() => {
          openAlertModal = true;
          actionAlertBtnText = texts.remove;
          funcAction = deleteCard;
          textAlert = texts.removeCardAlert;
          isBtnEnable = true;
        }}
      >
        {texts.removeCard}
      </div>
    {/if}
  </div>
</Dropdown>

<Modal
  bind:opened={openAlertModal}
  --szot-modal-width="500px"
  --szot-modal-max-width="90vw"
>
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <h3>{textAlert}</h3>
    {#if textAlert === texts.changeCardPositionAlert}
      <div class="lists">
        {#each boardData.lists as list, index}
          <div
            class="item"
            class:selected={targetListIndex === index}
            on:click={() => {
              targetListIndex = index;
            }}
          >
            <span>{list.title}</span>
            {#if targetListIndex === index}
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
        label={texts.cardPosition}
        selected={listCardsPositions[targetCardIndex]}
        on:changeSelected={selectCardPosition}
      />
    {/if}
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => {
        openAlertModal = false;
      }}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      on:click={() => {
        funcAction();
        openAlertModal = false;
      }}
      size="small"
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
  title={texts.cardDates}
/>

<style lang="scss">
  @use "src/components/Kanban/menu.scss";
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
