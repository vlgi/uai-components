<script lang="ts">
  import type { TCard } from "../data/types";
  import { texts } from "../data/components-texts";
  import { item, checklist } from "../data/empty-data";
  import { tick } from "svelte";

  // stores
  import { pos, relPos, lang } from "../stores";

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
  export let data: TCard; // user data
  export let reset: boolean = false;

  let overed = false; // change target data only at the first overed

  function getDonesChecklistItems(checklist): number {
    if (checklist.items.length == 0) return 0;
    let dones = 0;
    checklist.items.forEach((item) => {
      if (item.done) dones++;
    });
    return dones / checklist.items.length;
  }

  function handleCheckListItemUser(ci: number, ii: number) {
    selectChecklistItemUserModalOpened = true;
    checklistIndex = ci;
    checklistItemIndex = ii;
  }

  function setDragItem(e, ci: number, ii: number): void {
    if (e.button != 0) return; // if not left button, do nothing
    diEl = document.querySelector(`.item-${ci}-${ii}`); // get drag item html element
    diw = diEl.clientWidth;
    dih = diEl.clientHeight;
    const rect = diEl.getBoundingClientRect();
    xpos = rect.left;
    dii = ii;
    dici = ci;
    relPos.set(getRelativePosition(e.clientX, e.clientY, diEl)); // relative mouse position in relation to the html element
    changeElementPosition($pos, diEl, { x: $relPos.x, y: 10 }); // change dragging element position
  }

  function setDragChecklist(e, ci: number): void {
    if (e.button != 0) return; // if not left button, do nothing
    dcEl = document.querySelector(`.checklist-${ci}`); // get drag list html element
    dcw = dcEl.clientWidth;
    dch = dcEl.clientHeight;
    const rect = dcEl.getBoundingClientRect();
    xpos = rect.left;
    dci = ci;
    relPos.set(getRelativePosition(e.clientX, e.clientY, dcEl)); // relative mouse position in relation to the html element
    changeElementPosition($pos, dcEl, { x: $relPos.x, y: 10 }); // change dragging element position
  }

  function onChecklistOver(ci: number): void {
    if (dci != -1 && tci != dci && !overed) {
      tci = ci;
      tcEl = document.querySelector(`.checklist-${ci}`); // get target list html element
      overed = true;
    }
  }

  function onCheckListOut(): void {
    overed = false;
    if (dci != -1) {
      tci = -1; // reset target card index
      tcEl = null; // reset target card html element (.card div)
    }
  }

  function onChecklistItemOver(ci: number, ii: number): void {
    if (dii != -1) {
      tiEl = document.querySelector(`.item-${ci}-${ii}`); // get drag item html element
      tii = ii;
      tci = ci;
    }
  }

  function resetDragElements(): void {
    xpos = -1;
    // dragging checklists
    dcw = "100%"; // place holder checklist width
    dch = "100%"; // place holder checklist height
    dci = -1; // dragging checklist index
    dcEl = null;
    tci = -1; // target checklist index
    tcEl = null;
    // dragging checklists items
    diw = "100%"; // place holder checklist width
    dih = "100%"; // place holder checklist height
    dii = -1; // dragging item index
    diEl = null; // dragging item html element
    dici = -1; // dragging item checklist index
    tii = -1; // target item index
    tiEl = null; // target item html element
    reset = false;
  }

  $: if (reset) resetDragElements();
  $: selectChecklistItemUserModalOpened = false;
  $: checklistIndex = -1;
  $: checklistItemIndex = -1;
  $: openAlertModal = false;
  $: ciToDelete = -1;
  // drag checklist variables
  $: xpos = -1;
  // dragging checklists
  $: dcw = "100%"; // place holder checklist width
  $: dch = "100%"; // place holder checklist height
  $: dci = -1; // dragging checklist index
  $: dcEl = null;
  $: tci = -1; // target checklist index
  $: tcEl = null;
  // dragging checklists items
  $: diw = "100%"; // place holder checklist width
  $: dih = "100%"; // place holder checklist height
  $: dii = -1; // dragging item index
  $: diEl = null; // dragging item html element
  $: dici = -1; // dragging item checklist index
  $: tii = -1; // target item index
  $: tiEl = null; // target item html element
  $: canRemoveEmptyItems = true;
  $: showDueDatesModal = false;

  // change dragging checklist position
  $: $pos && dci != -1 && moveDragCheckList();
  // when there is a dragging element and pos change, change html element position
  function moveDragCheckList() {
    changeElementPosition({ x: xpos, y: $pos.y }, dcEl, {
      x: 0,
      y: 10,
    });
  }

  // change dragging checklist item position
  $: $pos && dii != -1 && dici != -1 && moveDragCheckListItem();
  // when there is a dragging element and pos change, change html element position
  function moveDragCheckListItem() {
    changeElementPosition({ x: xpos, y: $pos.y }, diEl, {
      x: 0,
      y: 10,
    });
  }

  function resetVariablesAfterItemsChangingPosition(empty: boolean): void {
    if (!empty) {
      diEl = tiEl; // dragging card becomes target card html element
      dii = tii; // dragging card becomes target card index
    } else if (empty) {
      diEl = null;
      dii = 0; // dragging card becomes target card index
    }
    dici = tci; // dragging card list index becomes target card list index
    tiEl = null; // reset target card html element
    tii = -1; // reset target card index
    tci = -1; // reset target card list index
  }

  function removeChecklist(ci: number): void {
    const checklists = [...data.checklists];
    checklists.splice(ci, 1);
    data.checklists = [...checklists];
  }

  function addChecklist(): void {
    const emptyCheckList = { ...checklist };
    data.checklists = [...data.checklists, emptyCheckList];
  }

  async function addItem(ci: number): Promise<any> {
    const ii = data.checklists[ci].items.length;
    const emptyItem = { ...item };
    data.checklists[ci].items = [...data.checklists[ci].items, emptyItem];
    await tick();
    const el: HTMLElement = document.querySelector(`.item-title-${ci}-${ii}`); // get drag item html element
    el.focus();
  }

  function createNextItem(e, ci: number): void {
    const lastItem = data.checklists[ci].items.at(-1);
    if (e.key == "Enter" && lastItem.title != "") {
      addItem(ci);
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
      items.forEach((item, i) => {
        if (item.title == "") items.splice(i, 1);
      });
      data.checklists[ci].items = [...items];
    }
    canRemoveEmptyItems = true;
  }

  // ###############################################################
  // ## Conditional for changing checklists positions           ####
  // ###############################################################

  // change data.checklists when dragging and target list index are different from -1
  $: if (dci != -1 && tci != -1 && dci != tci) {
    data.checklists = switchElsPositionByIndex(data.checklists, dci, tci); // switch the items and return the new checklist array
    dci = tci; // dragging checklist index becomes target checklist index
    tci = -1; // reset target checklist index
    dcEl = tcEl; // dragging element becomes target element
    tcEl = null; // target element becomes null
  }

  // ###############################################################
  // ## Conditional for changing checklists items positions     ####
  // ###############################################################

  // change card position in the same list
  $: if (
    tci == dici && // when  target and dragging item checklist is the same
    dii != -1 && // when there is a dragging item
    dii != tii && // when dragging item index is different from target item index
    tii != -1 // and when there is a target item index
  ) {
    const list = data.checklists[dici].items; // list cards data
    data.checklists[dici].items = switchElsPositionByIndex(list, dii, tii); // switch cards an return the new list cards array
    resetVariablesAfterItemsChangingPosition(false);

    // change item position in different checklists and target checklist are not empty
  } else if (
    tci != dici && // when target checklist is different from dragging item checklist
    tci != -1 && // when there is a target checklist
    dii != -1 && // when there is a dragging item
    tii != -1 && // and when there is a target item index
    data.checklists[tci].items.length > 0 // and when target list is not empty
  ) {
    const item = data.checklists[dici].items[dii]; // dragging item data
    const targetChecklist = data.checklists[tci].items; // target checklist copy
    targetChecklist.splice(tii, 0, item); // insert dragging item on targetChecklist (copy)
    data.checklists[dici].items.splice(dii, 1); // remove dragging item from the original checklist
    data.checklists[tci].items = [...targetChecklist]; // update target checkist with targetChecklist (updated copy)
    resetVariablesAfterItemsChangingPosition(false);
  }

  // change card position in different lists and target list are empty
  else if (
    tci != -1 && // when there is a target list index
    tci != dici && // when dragging card list index is different target list index
    dii != -1 && // when there is a dragging card
    data.checklists[tci].items.length == 0 // and when target list is not empty
  ) {
    const card = data.checklists[dici].items[dii]; // dragging card data
    data.checklists[tci].items = [card]; // empty target list receives dragging card
    data.checklists[dici].items.splice(dii, 1); // remove dragging card from the original list
    resetVariablesAfterItemsChangingPosition(true);
  }
</script>

<Modal bind:opened={openAlertModal} --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeChecklistAlert[$lang]}</h3>
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
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
      on:click={() => {
        removeChecklist(ciToDelete);
        openAlertModal = false;
      }}
    >
      {texts.removeChecklist[$lang]}
    </Button>
  </div>
</Modal>

{#each data.checklists as checklist, ci}
  {#if dci == ci}
    <div class="section placeholder" style="height: {dch}px;" />
  {/if}

  <div
    class="checklist-space"
    on:focus
    on:mouseover|self={() => onChecklistOver(ci)}
    on:blur
    on:mouseout|self={onCheckListOut}
  >
    <div
      class="section checklist-{ci}"
      style="width: {dcw}px"
      class:to-right={dci == ci}
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
            class:full-bar={getDonesChecklistItems(checklist) == 1}
          />
        </div>
      </div>
      {#each checklist.items as item, ii}
        {#if dici == ci && dii == ii}
          <div
            class="checklist-item-container placeholder"
            style="height: {dih}px"
          />
        {/if}
        <div
          class="checklist-item-container item-{ci}-{ii}"
          style="width: {diw}px"
          class:to-right={dici == ci && dii == ii}
          on:focus
          on:mouseover|self={() => onChecklistItemOver(ci, ii)}
          on:blur
          on:mouseout|self={() => (tii = -1)}
        >
          <div class="item-icon" on:click={() => (item.done = !item.done)}>
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
          {texts.createCheckListItem[$lang]}
        </Button>
      </div>
    </div>
  </div>
{/each}

{#if checklistIndex != -1 && checklistItemIndex != -1}
  <CardHandleUsersModal
    bind:list={data.members}
    bind:data={data.checklists[checklistIndex].items[checklistItemIndex]}
    bind:opened={selectChecklistItemUserModalOpened}
  />
  <CardHandleDueDates
    bind:data={data.checklists[checklistIndex].items[checklistItemIndex]}
    bind:opened={showDueDatesModal}
    title={texts.checklistItemDates[$lang]}
  />
{/if}

<style lang="scss">
  @import "./card-modal.scss";

  .drag-el {
    cursor: grab;
  }

  .section-title {
    cursor: pointer;
  }

  .checklist-space {
    padding: 10px 0;
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
    grid-template-areas:
      "check    text   add-user add-deadline    trash   drag"
      "check    user   user     user            user    user";
    grid-template-columns: 20px auto 20px 20px 20px 20px;
    opacity: 1;
    gap: 5px;
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.9);

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

    .drag-btn {
      grid-area: drag;
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
    .drag-el,
    .trash {
      display: none;
    }

    &:hover {
      background-color: #eee;
      .add-deadline,
      .add-user,
      .drag-el,
      .trash,
      .item-users {
        display: flex;
      }
    }
  }

  .add-new-item-btn {
    margin-top: 5px;
  }

  .placeholder {
    background: rgba(0, 0, 0, 0.1);
  }
</style>
