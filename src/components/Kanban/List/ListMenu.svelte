<script lang="ts">
  import { tick } from "svelte";

  import type {
    TBoard,
    TCustomBoard,
    TList,
    TCustomList,
  } from "../data/types";

  import { texts } from "../data/components-texts";
  import { changeElPositionByIndex } from "../utils";

  // components
  import Button from "../../formFields/Button/Button.svelte";
  import Select from "../../formFields/Select/Select.svelte";
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";

  // list props
  export let data: TList | TCustomList; // list data
  export let boardData: TBoard | TCustomBoard;
  export let li: number; // list index
  export let addingCard: boolean; //
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  let funcAction: ()=> void;
  let actionAlertBtnText = "";
  let alertText = "";
  const indexListToChange = -1;
  let isBtnEnable = false;
  let openAlertModal = false;
  let targetListIndex = -1;
  const listPositions: { text: string }[] = boardData.lists.map((list, index: number) => ({ text: `${index}` }));

  async function copyList() {
    const lists = [...boardData.lists];
    const list = { ...data };
    lists.splice(li, 0, list);
    boardData.lists = [...lists];
    await tick();
    const el: HTMLElement = document.querySelector(`.list-title-${li + 1}`);
    el.focus();
  }

  function moveListPosition() {
    if (indexListToChange === -1) return;
    boardData.lists = changeElPositionByIndex(
      boardData.lists,
      li,
      indexListToChange,
    );
  }

  function moveAllCards() {
    if (targetListIndex === -1) return;
    const targetListCards = boardData.lists[targetListIndex].cards;
    const provideListCards = data.cards;
    boardData.lists[targetListIndex].cards = [
      ...targetListCards,
      ...provideListCards,
    ];
    data.cards = [];
  }

  function deleteAllCards() {
    data.cards = [];
  }

  function deleteList() {
    const lists = [...boardData.lists];
    lists.splice(li, 1);
    boardData.lists = [...lists];
  }

</script>

<div style="z-index: 2;">
  <Dropdown
    targetId="open-list-menu-{li}"
    enableAutAdjust={false}
    dropdownAlignment="bottomRight"
    --szot-dropdown-padding="0"
  >
    <div class="drop-menu-container">
      <div class="drop-menu-section">
        {texts.listAction}
      </div>
      <div class="divider" />

      {#if canCreateCard}
        <div class="item"
          on:click={() => {
            addingCard = true;
          }}
          >
          {texts.createCard}
        </div>
        <div class="divider" />
      {/if}

      {#if canMoveCard}
        <div
          class="item"
          on:click={() => {
            funcAction = moveAllCards;
            openAlertModal = true;
            alertText = texts.moveAllCardsAlert;
            actionAlertBtnText = texts.move;
          }}
        >
          {texts.moveAllCards}
        </div>
      {/if}
      {#if canDeleteCard}
        <div
          class="item"
          on:click={() => {
            funcAction = deleteAllCards;
            openAlertModal = true;
            alertText = texts.deleteAllCardsFromListAlert;
            actionAlertBtnText = texts.remove;
            isBtnEnable = true;
          }}
        >
          {texts.deleteAllCardsFromList}
        </div>
      {/if}
      {#if canMoveCard || canDeleteCard}
        <div class="divider" />
      {/if}
      {#if canCreateList}
        <div
          class="item"
          on:click={() => {
            funcAction = copyList;
            openAlertModal = true;
            alertText = texts.copyListAlert;
            actionAlertBtnText = texts.copy;
            isBtnEnable = true;
          }}
        >
          {texts.copyList}
        </div>
      {/if}

      {#if canMoveList}
        <div
          class="item"
          on:click={() => {
            funcAction = moveListPosition;
            openAlertModal = true;
            alertText = texts.changeListPositionAlert;
            actionAlertBtnText = texts.move;
            isBtnEnable = true;
          }}
        >
          {texts.changeListPosition}
        </div>
      {/if}
      {#if canMoveList || canCreateList}
        <div class="divider" />
      {/if}

      {#if canDeleteList}
        <div
          class="item item-alert"
          on:click={() => {
            funcAction = deleteList;
            openAlertModal = true;
            alertText = texts.removeListAlert;
            actionAlertBtnText = texts.remove;
            isBtnEnable = true;
          }}
        >
          {texts.removeList}
        </div>
      {/if}
    </div>
  </Dropdown>

  <Modal
    bind:opened={openAlertModal}
    --szot-modal-width="400px"
    on:closeModal={() => {
      targetListIndex = -1;
      isBtnEnable = false;
    }}
  >
    <div slot="modal-header" class="header" />
    <div slot="modal-content" class="content">
      <h3>{alertText}</h3>
      {#if alertText === texts.moveAllCardsAlert}
        <div class="all-lists-options drop-menu-container">
          {#each boardData.lists as list, index}
            <div
              class="item"
              class:disabled={li === index}
              class:selected={targetListIndex === index}
              on:click={() => {
                targetListIndex = index;
                isBtnEnable = !!(targetListIndex !== -1
                  && targetListIndex !== li
                  && data.cards.length > 0);
              }}
            >
              <span
                >{list.title}
                {#if li === index} ({texts.curr}){/if}</span
              >
              {#if targetListIndex === index}
                <Icon iconName="check" --szot-icon-font-size="15px" />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      {#if alertText === texts.changeListPositionAlert}
        <Select
          id="list-position"
          name="list-position"
          required={true}
          options={listPositions}
          label={texts.listPosition}
          bind:selected={listPositions[li]}
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
</div>

<style lang="scss">
  @use "src/components/Kanban/menu.scss";
  @use "src/components/Kanban/styles.scss";
  .lane:first-child {
    padding-left: var(--target-padding);
  }

  .disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  .selected {
    background: #eee;
  }

  .all-lists-options {
    width: 500px;
    max-width: 80vw;
  }
</style>

