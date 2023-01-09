<script lang="ts">
  import type { TBoard, TCustomBoard, TList } from "../data/types";
  import { texts } from "../data/components-texts";
  import { tick } from "svelte";
  import { changeElPositionByIndex } from "../utils";

  // stores
  import { lang } from "../stores";

  // components
  import Button from "../../formFields/Button/Button.svelte";
  import Select from "../../formFields/Select/Select.svelte";
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";

  // list props
  export let data: TList; // list data
  export let boardData: TBoard | TCustomBoard;
  export let li: number; // list index
  export let addingCard: boolean; //
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  async function copyList(): Promise<any> {
    const lists = [...boardData.lists];
    const list = { ...data };
    lists.splice(li, 0, list);
    boardData.lists = [...lists];
    await tick();
    const el: HTMLElement = document.querySelector(`.list-title-${li + 1}`);
    el.focus();
  }

  function moveListPosition(): void {
    if (indexListToChange == -1) return;
    boardData.lists = changeElPositionByIndex(
      boardData.lists,
      li,
      indexListToChange
    );
  }

  function moveAllCards(): void {
    const targetListCards = boardData.lists[targetListIndex].cards;
    const provideListCards = data.cards;
    boardData.lists[targetListIndex].cards = [
      ...targetListCards,
      ...provideListCards,
    ];
    data.cards = [];
  }

  function deleteAllCards(): void {
    data.cards = [];
  }

  function deleteList(): void {
    const lists = [...boardData.lists];
    lists.splice(li, 1);
    boardData.lists = [...lists];
  }

  $: funcAction = null;
  $: openAlertModal = false;
  $: alertText = "";
  $: actionAlertBtnText = "";
  $: targetListIndex = -1;
  $: isBtnEnable = false;
  $: indexListToChange = -1;
  $: listPositions = boardData.lists.map((list, index) => {
    return { text: `${index}` };
  });
</script>

<div style="z-index: 2;">
  <Dropdown
    targetId="open-list-menu-{li}"
    enableAutAdjust={false}
    dropdownAlignment="bottomLeft"
    --szot-dropdown-padding="0"
  >
    <div class="drop-menu-container">
      <div class="drop-menu-section">
        {texts.listAction[$lang]}
      </div>
      <div class="divider" />

      {#if canCreateCard}
        <div class="item" on:click={() => (addingCard = true)}>
          {texts.createCard[$lang]}
        </div>
        <div class="divider" />
      {/if}

      {#if canMoveCard}
        <div
          class="item"
          on:click={() => {
            funcAction = moveAllCards;
            openAlertModal = true;
            alertText = texts.moveAllCardsAlert[$lang];
            actionAlertBtnText = texts.move[$lang];
          }}
        >
          {texts.moveAllCards[$lang]}
        </div>
      {/if}
      {#if canDeleteCard}
        <div
          class="item"
          on:click={() => {
            funcAction = deleteAllCards;
            openAlertModal = true;
            alertText = texts.deleteAllCardsFromListAlert[$lang];
            actionAlertBtnText = texts.remove[$lang];
            isBtnEnable = true;
          }}
        >
          {texts.deleteAllCardsFromList[$lang]}
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
            alertText = texts.copyListAlert[$lang];
            actionAlertBtnText = texts.copy[$lang];
            isBtnEnable = true;
          }}
        >
          {texts.copyList[$lang]}
        </div>
      {/if}

      {#if canMoveList}
        <div
          class="item"
          on:click={() => {
            funcAction = moveListPosition;
            openAlertModal = true;
            alertText = texts.changeListPositionAlert[$lang];
            actionAlertBtnText = texts.move[$lang];
            isBtnEnable = true;
          }}
        >
          {texts.changeListPosition[$lang]}
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
            alertText = texts.removeListAlert[$lang];
            actionAlertBtnText = texts.remove[$lang];
            isBtnEnable = true;
          }}
        >
          {texts.removeList[$lang]}
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
      {#if alertText == texts.moveAllCardsAlert[$lang]}
        <div class="all-lists-options drop-menu-container">
          {#each boardData.lists as list, index}
            <div
              class="item"
              class:disabled={li == index}
              class:selected={targetListIndex == index}
              on:click={() => {
                targetListIndex = index;
                isBtnEnable =
                  targetListIndex != -1 &&
                  targetListIndex != li &&
                  data.cards.length > 0
                    ? true
                    : false;
              }}
            >
              <span
                >{list.title}
                {#if li == index} ({texts.curr[$lang]}){/if}</span
              >
              {#if targetListIndex == index}
                <Icon iconName="check" --szot-icon-font-size="15px" />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      {#if alertText == texts.changeListPositionAlert[$lang]}
        <Select
          id="list-position"
          name="list-position"
          required={true}
          options={listPositions}
          label={texts.listPosition[$lang]}
          selected={listPositions[li]}
          on:changeSelected={(e) => (indexListToChange = e.detail.text)}
        />
      {/if}
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
</div>

<style lang="scss">
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
    max-width: 500px;
  }
</style>
