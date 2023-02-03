<script lang="ts">
  import { tick } from "svelte";
  import type {
    TDefautCard, TCardCheckList, TCardChecklistItem, TPosition,
} from "../data/types";
  import { texts } from "../data/components-texts";
  import { item, checklist } from "../data/empty-data";

  // stores
  import { pos, relPos } from "../stores";

  // components
  import Button from "../../formFields/Button/Button.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import CardHandleUsersModal from "./CardHandleUsersModal.svelte";
  import CardHandleDueDates from "./CardHandleDueDates.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";

  // functions
  import {
    changeElementPosition,
    getRelativePosition,
    switchElsPositionByIndex,
  } from "../utils";

  // props
  export let data: TDefautCard; // user data
  export let reset = false;

  const dragInitialState = {
    overed: false, // change target data only at the first time overed

    // dragging checklists
    dcw: "100%", // place holder dragging checklist width
    dch: "100%", // place holder dragging checklist height
    dci: -1, // dragging checklist index
    dcEl: null as HTMLElement, // dragging checklist html element
    tci: -1, // target checklist index
    tcEl: null as HTMLElement, // target checklist html element

    // dragging checklists items
    diw: "100%", // place holder dragging item width
    dih: "100%", // place holder dragging item height
    dii: -1, // dragging item index
    diEl: null as HTMLElement, // dragging item html element
    dici: -1, // dragging item checklist index
    tii: -1, // target item index
    tiEl: null as HTMLElement, // target item html element
  };
  let dragCurrState = { ...dragInitialState };

  let canRemoveEmptyItems = true;
  let checklistIndex = -1;
  let checklistItemIndex = -1;
  let ciToDelete = -1;
  let openAlertModal = false;
  let selectChecklistItemUserModalOpened = false;
  let showDueDatesModal = false;
  let xpos = -1;

  function getDonesChecklistItems(_checklist: TCardCheckList): number {
    if (_checklist.items.length === 0) return 0;
    let dones = 0;
    _checklist.items.forEach((_item: TCardChecklistItem) => {
      if (_item.done) dones++;
    });
    return dones / _checklist.items.length;
  }

  function handleCheckListItemUser(ci: number, ii: number) {
    selectChecklistItemUserModalOpened = true;
    checklistIndex = ci;
    checklistItemIndex = ii;
  }

  function setDragItem(e: MouseEvent, ci: number, ii: number) {
    if (e.button !== 0) return; // if not left button, do nothing
    dragCurrState.diEl = document.getElementById(`item-${ci}-${ii}`); // get drag item html element
    dragCurrState.diw = dragCurrState.diEl.clientWidth.toString();
    dragCurrState.dih = dragCurrState.diEl.clientHeight.toString();
    const rect = dragCurrState.diEl.getBoundingClientRect();
    xpos = rect.left;
    dragCurrState.dii = ii;
    dragCurrState.dici = ci;
    relPos.set(getRelativePosition(
      e.clientX,
      e.clientY,
      dragCurrState.diEl,
    )); // relative mouse position in relation to the html element
    changeElementPosition(
      $pos,
      dragCurrState.diEl,
      { x: ($relPos as TPosition).x, y: 10 },
    ); // change dragging element position
  }

  function setDragChecklist(e: MouseEvent, ci: number) {
    if (e.button !== 0) return; // if not left button, do nothing
    dragCurrState.dcEl = document.getElementById(`checklist-${ci}`); // get drag list html element
    dragCurrState.dcw = dragCurrState.dcEl.clientWidth.toString();
    dragCurrState.dch = dragCurrState.dcEl.clientHeight.toString();
    const rect = dragCurrState.dcEl.getBoundingClientRect();
    xpos = rect.left;
    dragCurrState.dci = ci;
    relPos.set(getRelativePosition(
      e.clientX,
      e.clientY,
      dragCurrState.dcEl,
    )); // relative mouse position in relation to the html element
    changeElementPosition(
      $pos,
      dragCurrState.dcEl,
      { x: ($relPos as TPosition).x, y: 10 },
    ); // change dragging element position
  }

  function onChecklistOver(ci: number) {
    if (
      dragCurrState.dci !== -1
      && dragCurrState.tci !== dragCurrState.dci
      && !dragCurrState.overed) {
      dragCurrState.tci = ci;
      dragCurrState.tcEl = document.getElementById(`checklist-${ci}`); // get target list html element
      dragCurrState.overed = true;
    }
  }

  function onCheckListOut() {
    dragCurrState.overed = false;
    if (dragCurrState.dci !== -1) {
      dragCurrState.tci = -1; // reset target card index
      dragCurrState.tcEl = null; // reset target card html element (.card div)
    }
  }

  function onChecklistItemOver(ci: number, ii: number) {
    if (dragCurrState.dii !== -1) {
      dragCurrState.tiEl = document.getElementById(`item-${ci}-${ii}`); // get drag item html element
      dragCurrState.tii = ii;
      dragCurrState.tci = ci;
    }
  }

  function resetDragElements() {
    dragCurrState = { ...dragInitialState };
    reset = false;
  }

  // when there is a dragging element and pos change, change html element position
  function moveDragCheckList() {
    changeElementPosition({ x: xpos, y: ($pos as TPosition).y }, dragCurrState.dcEl, {
      x: 0,
      y: 10,
    });
  }

  // when there is a dragging element and pos change, change html element position
  function moveDragCheckListItem() {
    changeElementPosition({ x: xpos, y: ($pos as TPosition).y }, dragCurrState.diEl, {
      x: 0,
      y: 10,
    });
  }

  function resetVariablesAfterItemsChangingPosition(empty: boolean) {
    if (!empty) {
      dragCurrState.diEl = dragCurrState.tiEl; // dragging card becomes target card html element
      dragCurrState.dii = dragCurrState.tii; // dragging card becomes target card index
    } else if (empty) {
      dragCurrState.diEl = null;
      dragCurrState.dii = 0; // dragging card becomes target card index
    }
    dragCurrState.dici = dragCurrState.tci; // dragging card list index becomes target card list index
    dragCurrState.tiEl = null; // reset target card html element
    dragCurrState.tii = -1; // reset target card index
    dragCurrState.tci = -1; // reset target card list index
  }

  function removeChecklist(ci: number): void {
    const checklists = [...data.checklists];
    checklists.splice(ci, 1);
    data.checklists = [...checklists];
  }

  async function addChecklist() {
    const emptyChecklist = { ...checklist };
    data.checklists = [...data.checklists, emptyChecklist];
    await tick();
    const i = data.checklists.length - 1;
    const el: HTMLElement = document.querySelector(`.checklist-title-${i}`);
    el.focus();
  }

  async function addItem(ci: number) {
    const ii = data.checklists[ci].items.length;
    const emptyItem = { ...item };
    data.checklists[ci].items = [...data.checklists[ci].items, emptyItem];
    await tick();
    const el: HTMLElement = document.querySelector(`.item-title-${ci}-${ii}`); // get drag item html element
    el.focus();
  }

  async function createNextItem(e: KeyboardEvent, ci: number) {
    const lastItem = data.checklists[ci].items.at(-1);
    if (e.key === "Enter" && lastItem.title !== "") {
      await addItem(ci);
      canRemoveEmptyItems = false;
    }
  }

  function removeItem(ci: number, ii: number): void {
    const items = [...data.checklists[ci].items];
    items.splice(ii, 1);
    data.checklists[ci].items = [...items];
  }

  function deleteEmptyItems(ci: number): void {
    if (canRemoveEmptyItems) {
      const items = [...data.checklists[ci].items];
      items.forEach((_item, i) => {
        if (_item.title === "") items.splice(i, 1);
      });
      data.checklists[ci].items = [...items];
    }
    canRemoveEmptyItems = true;
  }

  $: if (reset) resetDragElements();
  // change dragging checklist item position
  $: if ($pos && dragCurrState.dii !== -1 && dragCurrState.dici !== -1) moveDragCheckListItem();
  // change dragging checklist position
  $: if ($pos && dragCurrState.dci !== -1) moveDragCheckList();


  // ###############################################################
  // ## Conditional for changing checklists positions           ####
  // ###############################################################

  // change data.checklists when dragging and target list index are diff from -1
  $: if (
    dragCurrState.dci !== -1
    && dragCurrState.tci !== -1
    && dragCurrState.dci !== dragCurrState.tci
  ) {
    data.checklists = switchElsPositionByIndex(
      data.checklists,
      dragCurrState.dci,
      dragCurrState.tci,
    ); // switch the items and return the new checklist array
    dragCurrState.dci = dragCurrState.tci; // dragging checklist index becomes target checklist index
    dragCurrState.tci = -1; // reset target checklist index
    dragCurrState.dcEl = dragCurrState.tcEl; // dragging element becomes target element
    dragCurrState.tcEl = null; // target element becomes null
  }

  // ###############################################################
  // ## Conditional for changing checklists items positions     ####
  // ###############################################################

  // change card position in the same list
  $: if (
    dragCurrState.tci === dragCurrState.dici // when  target and dragging item checklist is the same
    && dragCurrState.dii !== -1 // when there is a dragging item
    && dragCurrState.dii !== dragCurrState.tii // when drag index is diff from target index
    && dragCurrState.tii !== -1 // and when there is a target item index
  ) {
    const list = data.checklists[dragCurrState.dici].items; // list cards data
    data.checklists[dragCurrState.dici].items = switchElsPositionByIndex(
      list, dragCurrState.dii,
      dragCurrState.tii,
    ); // switch cards an return the new list cards array
    resetVariablesAfterItemsChangingPosition(false);

  // change item position in diff checklists and target checklist are not empty
  } else if (
    dragCurrState.tci !== dragCurrState.dici // when target checklist is diff from drag item checklist
    && dragCurrState.tci !== -1 // when there is a target checklist
    && dragCurrState.dii !== -1 // when there is a dragging item
    && dragCurrState.tii !== -1 // and when there is a target item index
    && data.checklists[dragCurrState.tci].items.length > 0 // and when target list is not empty
  ) {
    const cItem = data.checklists[dragCurrState.dici].items[dragCurrState.dii]; // dragging item data
    const targetChecklist = data.checklists[dragCurrState.tci].items; // target checklist copy
    targetChecklist.splice(dragCurrState.tii, 0, cItem); // insert drag item on targetChecklist (copy)
    data.checklists[dragCurrState.dici].items
      .splice(dragCurrState.dii, 1); // remove dragging item from the original checklist
    // update target checkist with targetChecklist (updated copy)
    data.checklists[dragCurrState.tci].items = [...targetChecklist];
    resetVariablesAfterItemsChangingPosition(false);

  // change card position in diff lists and target list are empty
  } else if (
    dragCurrState.tci !== -1 // when there is a target list index
    && dragCurrState.tci !== dragCurrState.dici // when drag card list index is diff target list index
    && dragCurrState.dii !== -1 // when there is a dragging card
    && data.checklists[dragCurrState.tci].items.length === 0 // and when target list is not empty
  ) {
    const card = data.checklists[dragCurrState.dici].items[dragCurrState.dii]; // dragging card data
    data.checklists[dragCurrState.tci].items = [card]; // empty target list receives dragging card
    data.checklists[dragCurrState.dici].items
      .splice(dragCurrState.dii, 1); // remove dragging card from the original list
    resetVariablesAfterItemsChangingPosition(true);
  }
</script>

<Modal bind:opened={openAlertModal} --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeChecklistAlert}</h3>
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
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
      on:click={() => {
        removeChecklist(ciToDelete);
        openAlertModal = false;
      }}
    >
      {texts.removeChecklist}
    </Button>
  </div>
</Modal>

{#if data.checklists.length > 0}
  <div class="section-title">
    <Icon iconName="check" --szot-icon-font-size="20px" />
    <h2>{texts.checklists}</h2>
    <div class="item-btn" on:click={addChecklist}>
      <Icon iconName="plus" />
    </div>
  </div>
{/if}

{#each data.checklists as checklist, ci}
  {#if dragCurrState.dci === ci}
    <div class="section placeholder" style="height: {dragCurrState.dch}px;" />
  {/if}

  <div
    class="checklist-space"
    on:focus
    on:mouseover|self={() => onChecklistOver(ci)}
    on:blur
    on:mouseout|self={onCheckListOut}
  >
    <div
      id="checklist-{ci}"
      class="section"
      style="width: {dragCurrState.dcw}px"
      class:to-right={dragCurrState.dci === ci}
    >
      <div class="section-title">
        <Icon iconName="checkbox-marked-outline" --szot-icon-font-size="20px" />
        <h3
          contenteditable="true"
          bind:textContent={checklist.title}
          class="editable checklist-title-{ci}"
        />
        <div
          class="item-btn remove-checklist-btn"
          on:click={() => {
            openAlertModal = true;
            ciToDelete = ci;
          }}
        >
          <Icon iconName="trash-can-outline" />
        </div>
        <div class="drag-el" on:mousedown={(e) => setDragChecklist(e, ci)}>
          <Icon iconName="drag" --szot-icon-font-size="20px" />
        </div>
      </div>
      <div class="checklist-progress-bar">
        <span>{(getDonesChecklistItems(checklist) * 100).toFixed(1)}%</span>
        <div class="bar-wrapper">
          <div
            style="width: {getDonesChecklistItems(checklist) * 100}%;"
            class:full-bar={getDonesChecklistItems(checklist) === 1}
          />
        </div>
      </div>
      {#each checklist.items as item, ii}
        {#if dragCurrState.dici === ci && dragCurrState.dii === ii}
          <div
            class="checklist-item-container placeholder"
            style="height: {dragCurrState.dih}px"
          />
        {/if}
        <div
          id="item-{ci}-{ii}"
          class="checklist-item-container"
          style="width: {dragCurrState.diw}px"
          class:to-right={dragCurrState.dici === ci && dragCurrState.dii === ii}
          on:focus
          on:mouseover|self={() => onChecklistItemOver(ci, ii)}
          on:blur
          on:mouseout|self={() => {
            dragCurrState.tii = -1;
          }}
        >
          <div class="item-icon" on:click={() => {
            item.done = !item.done;
          }}>
            {#if !item.done}<Icon iconName="checkbox-blank-outline" />{/if}
            {#if item.done}
              <Icon
                iconName="checkbox-marked"
                --szot-icon-color="#5AAC44"
                --szot-icon-font-size="20px"
              />
            {/if}
          </div>
          <span
            class="editable item-title-{ci}-{ii}"
            contenteditable="true"
            bind:textContent={item.title}
            on:keydown={(e) => createNextItem(e, ci)}
            on:focusout={() => deleteEmptyItems(ci)}
          />

          <div class="item-users">
            {#each item.members as member, mi (mi)}
              <div
                class="item-user"
                on:click={() => handleCheckListItemUser(ci, ii)}
              >
                <CardUserAvatar bind:data={member} />
              </div>
            {/each}
          </div>
          <div
            class="item-btn add-user"
            on:click={() => handleCheckListItemUser(ci, ii)}
          >
            <Icon iconName="account-plus" />
          </div>
          <div
            class="item-btn add-deadline"
            on:click={() => {
              showDueDatesModal = true;
              checklistIndex = ci;
              checklistItemIndex = ii;
            }}
          >
            <Icon iconName="clock-outline" />
          </div>
          <div class="item-btn trash" on:click={() => removeItem(ci, ii)}>
            <Icon iconName="trash-can-outline" />
          </div>
          <div class="drag-el" on:mousedown={(e) => setDragItem(e, ci, ii)}>
            <Icon iconName="drag-vertical" --szot-icon-font-size="20px" />
          </div>
        </div>
      {/each}
      <div class="add-new-item-btn">
        <Button
          on:click={() => addItem(ci)}
          size="small"
          buttonStyleType="outline"
          buttonStyle="dark"
        >
          {texts.createCheckListItem}
        </Button>
      </div>
    </div>
  </div>
{/each}

{#if checklistIndex !== -1 && checklistItemIndex !== -1}
  <CardHandleUsersModal
    bind:list={data.members}
    bind:data={data.checklists[checklistIndex].items[checklistItemIndex].members}
    bind:opened={selectChecklistItemUserModalOpened}
  />
  <CardHandleDueDates
    bind:data={data.checklists[checklistIndex].items[checklistItemIndex]}
    bind:limits={data.dates}
    bind:opened={showDueDatesModal}
    title={texts.checklistItemDates}
  />
{/if}

<style lang="scss">
  @use "src/components/Kanban/styles.scss";
  @use "src/components/Kanban//Card/card-modal-styles.scss";
  .drag-el {
    cursor: grab;
  }

  .section-title {
    cursor: pointer;
  }

  .checklist-space {
    padding: 10px 0;

    @media only screen and (min-width: 0px) {
      --checklist-item-container-grid-template-areas: "check text text text text"
        "check user add-user add-deadline trash";
      --checklist-item-grid-template-columns: 20px auto 25px 25px 30px;
      --drag-el-display: none;
      --btns-display: flex;
    }
    @media only screen and (min-width: 1024px) {
      --checklist-item-container-grid-template-areas: "check text add-user add-deadline trash drag"
        "check user user user user user";
      --checklist-item-grid-template-columns: 20px auto 25px 25px 25px 20px;
      --drag-el-display: flex;
      --btns-display: none;
    }
  }

  .section {
    background: rgba(255, 255, 255, 0.9);
    opacity: 1;

    .section-title {
      margin-top: 0px;
      margin-bottom: 0px;

      .editable:focus {
        padding: 0 5px;
      }
    }

    .drag-el {
      display: var(--drag-el-display);
    }
  }

  .checklist-progress-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 10px;
    margin: 1rem 0;
    width: 100%;

    span {
      font-size: 12px;
    }

    .bar-wrapper {
      width: 100%;
      border-radius: var(--radius-pattern);
      background-color: #eee;

      div {
        height: 10px;
        background-color: #026aa7;
        border-radius: var(--radius-pattern);
      }

      .full-bar {
        background-color: #5aac44;
      }
    }
  }

  .checklist-item-container {
    display: grid;
    grid-template-areas: var(--checklist-item-container-grid-template-areas);
    grid-template-columns: var(--checklist-item-grid-template-columns);
    opacity: 1;
    gap: 5px;
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.9);
    margin-bottom: 10px;
    box-shadow: var(--box-shadow-pattern);

    .item-icon {
      grid-area: check;
      cursor: pointer;
    }

    span {
      grid-area: text;
      display: flex;
      align-items: center;
      font-size: 15xp;
      padding: 0 5px;
      height: 100%;
    }

    .add-deadline {
      grid-area: add-deadline;
    }

    .add-user {
      grid-area: add-user;
    }

    .trash {
      grid-area: trash;
    }

    .item-users {
      display: flex;
      grid-area: user;
      width: 100%;
      margin-top: -5px;

      .item-user {
        margin-right: -10px;
      }
    }

    .add-deadline,
    .add-user,
    .trash {
      display: var(--btns-display);
    }

    &:hover {
      background-color: #eee;
      .add-deadline,
      .add-user,
      .trash,
      .item-users {
        display: flex;
      }

      .drag-el {
        display: var(--drag-el-display);
      }
    }

    .drag-el {
      grid-area: drag;
      display: var(--drag-el-display);
    }
  }

  .add-new-item-btn {
    margin-top: 5px;
  }

  .placeholder {
    background: rgba(0, 0, 0, 0.1);
  }
</style>
