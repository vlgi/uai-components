<script lang="ts">
  import { onMount } from "svelte";
  import { checkIfItemIsInArray } from "../../../helpers/arrays-handling";
  import { compareObjects } from "../../../helpers/objects-handling";
  import type {
    TCardLabel, TDefautCard, TBoard, TCustomBoard,
  } from "../data/types";
  import { label as emptyLabel } from "../data/empty-data";
  import { colors } from "../data/colors-data";
  import { texts } from "../data/components-texts";

  // props
  export let labelData: TCardLabel = { ...emptyLabel }; // label data
  export let boardData: TBoard | TCustomBoard;
  export let labelsData: TCardLabel[] = [];
  export let cardData: TDefautCard; // card data
  export let opened = false; // card handle colors modal opened boolean

  // components
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardLabel from "./CardLabel.svelte";

  let old: TCardLabel = { ...emptyLabel };
  let focusLabel = false;

  function setColor(hex: string): void {
    labelData.hex = hex;
    focusLabel = true;
  }

  function handleLabel(): void {
    if (compareObjects(old, labelData)) return; // return if there isnt any change

    if (compareObjects(old, emptyLabel)) {
      // if is a new label, add in the end of labelsData prop and card labels
      if (labelData.hex === "") setColor("#dddddd"); // set a standard color if the user did not select one
      labelsData = [...labelsData, labelData];
    } else {
      // if is an existing label to be edited, edit label in all cards and labelsData prop
      const allTags = [...labelsData];

      // edit label from labelsData prop
      const checkBoardAllLabels = checkIfItemIsInArray(labelData, allTags);
      if (checkBoardAllLabels.isInIt) {
        allTags[checkBoardAllLabels.index] = { ...labelData };
        labelsData = allTags;
      }

      // edit label from all cards
      const boardDataCopy = { ...boardData };
      boardDataCopy.lists.forEach((list) => {
        list.cards.forEach((card) => {
          const check = checkIfItemIsInArray(old, card.labels);
          if (check.isInIt) card.labels[check.index] = { ...labelData };
        });
      });
      boardData = boardDataCopy;
    }
    old = { ...emptyLabel };
    labelData = { ...emptyLabel };
    labelData.title = labelData.title;
    opened = false;
  }

  function cancelEdit() {
    labelData = { ...old };
    opened = false;
  }

  onMount(() => {
    old = { ...labelData };
  });
</script>

<Modal
  bind:opened
  disableHeader={true}
  --szot-modal-width="340px"
  --szot-modal-max-width="90vw"
>
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <div class="card-label-container">
      <CardLabel
        bind:focus={focusLabel}
        on:focus-label
        canEditText={true}
        bind:data={labelData}
        bind:cardData
      />
    </div>
    <div class="labels-colors">
      {#each colors as color}
        <div
          class="color-container"
          style="background-color: {color.hex}"
          on:click={() => setColor(color.hex)}
        >
          {#if color.hex === labelData.hex}
            <Icon
              iconName="check"
              --szot-icon-color="white"
              --szot-icon-font-size="25px"
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={cancelEdit}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel}
    </Button>
    <Button
      on:click={handleLabel}
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {old.title === "" ? texts.add : texts.edit}
    </Button>
  </div>
</Modal>

<style lang="scss">
  @use "src/components/Kanban/styles.scss";
  .label-title {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 40px;
    width: 100%;
    background: white;
    margin-bottom: 5px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .labels-colors {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    justify-content: center;
    width: fit-content;

    .color-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 50px;
      border-radius: var(--radius-pattern);

      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .card-label-container {
    padding: 1rem;
    background: #eee;
    border-radius: var(--radius-pattern);
    margin-bottom: 10px;
    width: 100%;
  }
</style>
