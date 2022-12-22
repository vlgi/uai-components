<script lang="ts">
  import type { TCardLabel, TCard } from "../data/types";
  import { label as emptyLabel } from "../data/empty-data";
  import { colors } from "../data/colors-data";
  import { texts } from "../data/components-texts";

  // store
  import { lang } from "../stores";

  // props
  export let labelData: TCardLabel = { ...emptyLabel }; // label data
  export let cardData: TCard = null;
  export let opened = false;

  // components
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import CardLabel from "./CardLabel.svelte";
  import Button from "../../formFields/Button/Button.svelte";

  // stores
  import { allLabels } from "../stores";

  // local variables
  $: focusLabel = false;

  function setColor(hex: string): void {
    labelData.hex = hex;
    focusLabel = true;
  }

  function handleLabel(): void {
    labelData.title = labelData.title;
    if (labelData.hex == "") labelData.hex = "#dddddd";
    if (cardData) {
      cardData.labels = [...cardData.labels, labelData];
      allLabels.set([...$allLabels, labelData]);
    }
    opened = false;
  }
</script>

<Modal bind:opened --szot-modal-width="300px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <div class="card-label-container">
      <CardLabel
        bind:focus={focusLabel}
        on:focus-label
        canEditText={true}
        bind:data={labelData}
      />
    </div>
    <div class="labels-colors">
      {#each colors as color}
        <div
          class="color-container"
          style="background-color: {color.hex}"
          on:click={() => setColor(color.hex)}
        >
          {#if color.hex == labelData.hex}
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
  <div slot="modal-footer" class="footer">
    <Button
      on:click={handleLabel}
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {labelData.id != "" ? texts.edit[$lang] : texts.add[$lang]}
    </Button>
  </div>
</Modal>

<style lang="scss">
  @import "../index.scss";

  .label-title {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 40px;
    width: 100%;
    background: white;
    margin-bottom: 5px;
  }

  .labels-colors {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
    justify-content: start;
    width: fit-content;

    .color-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 40px;
      border-radius: 5px; // change

      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .card-label-container {
    padding: 1rem;
    background: #eee;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .footer {
    display: flex;
    justify-content: center;
    width: 100%;
    button {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
</style>
