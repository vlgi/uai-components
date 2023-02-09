<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";

  import type {
    TBoard,
    TCustomBoard,
    TCardLabel,
    TCustomList,
  } from "../data/types";

  // stores
  import {
    selectedCards,
    allUsers,
  } from "../stores";

  import { sortArrayOfTuples } from "../../../helpers/arrays-handling";

  import { texts } from "../data/components-texts";

  // components
  import Input from "../../formFields/Input/Input.svelte";
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardHandleLabelsModal from "../Card/CardHandleLabelsModal.svelte";
  import CardHandleUsersModal from "../Card/CardHandleUsersModal.svelte";

  export let data: TBoard | TCustomBoard; // board data
  export let dropDownTarget: string;
  export let titleColor = "var(--board-title-color)";
  export let labels: TCardLabel[] = []; // board possible users
  export let customCard = null; // custom card svelte component

  let inpt: HTMLInputElement; // input file element for board background image
  let showAdd = false;
  let showDropdown = false;
  let showLabelsModal = false;
  let showUsersModal = false;

  let funcAction: ()=> void;
  let actionAlertBtnText = "";
  let alertText = "";
  let isBtnEnable = false;
  let openAlertModal = false;
  let targetListIndex = -1;

  let selecteds = $selectedCards as [number, number][];

  function handleInputEl() {
    showAdd = false;
  }

  function initializeInput() {
    document.body.onfocus = handleInputEl;
  }

  function getFile(e: Event) {
    const files = Array.from((e.target as HTMLInputElement).files)
      .map((f) => URL.createObjectURL(f));
    [data.backgroundImage] = files;
    showDropdown = false;
  }

  function changeBoardColor(e: Event) {
    titleColor = (e.target as HTMLInputElement).value;
  }

  function removeSelectedCards() {
    const orderedSelected = sortArrayOfTuples($selectedCards as [number, number][], "asc");
    let compensationIndex = -1;
    let listIndex = selecteds[0][0];
    orderedSelected.forEach((selected, index) => {
      if (listIndex !== selected[0]) {
        [listIndex] = orderedSelected[index];
        compensationIndex = -1;
      }
      compensationIndex++;
      const oldList = [...data.lists[selected[0]].cards];
      oldList.splice(selected[1] - compensationIndex, 1);
      data.lists[selected[0]].cards = [...oldList];
    });
  }

  function moveSelectedCardsToList() {
    const lists = JSON.parse(JSON.stringify(data.lists)) as TCustomList[];
    removeSelectedCards();
    selecteds.forEach((selected) => {
      const oldList = lists[selected[0]].cards;
      const card = oldList[selected[1]];
      data.lists[targetListIndex].cards = [...data.lists[targetListIndex].cards, card];
    });
  }

  onMount(async () => {
    await tick();
    inpt = document.getElementById("input-image") as HTMLInputElement;
  });

  onDestroy(() => {
    document.body.removeEventListener("onfocus", handleInputEl);
  });

  $: if (showAdd) inpt.click();
  $: hasSelecteds = ($selectedCards as [number, number][])[0][0] !== -1;
  $: boardData = { ...data } as TBoard;
  $: selecteds = $selectedCards as [number, number][];

</script>

<Dropdown
  targetId={dropDownTarget}
  enableAutAdjust={false}
  dropdownAlignment="bottomRight"
  --szot-dropdown-padding="0"
  bind:opened={showDropdown}
  >
  <div class="drop-menu-container">
    <div class="drop-menu-section">{texts.boardAction}</div>
    <div class="divider" />

    <div class="item" on:click={() => {
      showAdd = true;
    }}>
      {texts.changeBoardBackgroundImage}
    </div>

    <div class="item item-color">
      {texts.changeBoardColor}
      <Input
        name="board-color"
        label={texts.boardTitleColor}
        type="color"
        --szot-input-margin-top="15px"
        --szot-input-margin-bottom="0"
        on:change={changeBoardColor}
        bind:value={titleColor}
      />
    </div>

    {#if hasSelecteds}
      <div class="divider" />
      <div class="drop-menu-section">{texts.selectedCardsAction}</div>
      <div class="divider" />
      {#if !customCard}
        <div class="item" on:click={() => {
          showUsersModal = true;
        }}>
          {texts.addMember}
        </div>
        <div class="item" on:click={() => {
          showLabelsModal = true;
        }}>
          {texts.addLabel}
        </div>
      <div class="divider" />
      {/if}
      <div class="item" on:click={() => {
        openAlertModal = true;
        actionAlertBtnText = texts.move;
        alertText = texts.moveAllSelectedCardsAlert;
      }}>
        {texts.moveAllSelectedCards}
      </div>
      <div class="item item-alert" on:click={() => {
        funcAction = removeSelectedCards;
        openAlertModal = true;
        isBtnEnable = true;
        actionAlertBtnText = texts.remove;
        alertText = texts.deleteAllSelectedCardsAlert;
      }}>
        {texts.deleteAllSelectedCards}
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
    {#if alertText === texts.moveAllSelectedCardsAlert}
      <div class="all-lists-options drop-menu-container">
        {#each data.lists as list, index}
          <div
            class="item"
            class:selected={targetListIndex === index}
            on:click={() => {
              targetListIndex = index;
              isBtnEnable = !!(targetListIndex !== -1);
              funcAction = moveSelectedCardsToList;
            }}
          >
          <span>{list.title}</span>
            {#if targetListIndex === index}
              <Icon iconName="check" --szot-icon-font-size="15px" />
            {/if}
          </div>
        {/each}
      </div>
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
      on:click={async () => {
        funcAction();
        await tick();
        selectedCards.set([[-1, -1]]);
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

<CardHandleLabelsModal
  bind:boardData
  bind:opened={showLabelsModal}
  bind:labelsData={labels}
/>

<CardHandleUsersModal
  bind:boardData
  bind:list={$allUsers}
  bind:opened={showUsersModal}
/>

<input
  type="file"
  id="input-image"
  style="display: none;"
  on:change={getFile}
  on:click={initializeInput}
/>

<style lang="scss">
  @use "src/components/Kanban/menu.scss";
  @use "src/components/Kanban/styles.scss";

  .item {
    width: 100%;
  }
  .item-color {
    display: grid;
    grid-template-columns: 100%;
  }

  .selected {
    background: #eee;
  }

</style>
