<script lang="ts">
  import type { TCard, TBoard, TCustomBoard, TCardLabel } from "../data/types";
  import { texts } from "../data/components-texts";
  import { checkIfItemIsInArray } from "../utils";

  // stores
  import { lang } from "../stores";

  // components
  import SearchInput from "../../formFields/SearchInput/SearchInput.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardHandleLabelsColorsModal from "./CardHandleLabelsColorsModal.svelte";
  import CardLabel from "./CardLabel.svelte";

  // props
  export let data: TCard; // card data
  export let boardData: TBoard | TCustomBoard;
  export let labelsData: TCardLabel[] = [];
  export let opened = false;

  $: filtered = [...labelsData];
  $: colorsModalOpened = false;
</script>

<Modal bind:opened --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <SearchInput
      bind:items={labelsData}
      bind:filtered
      searchQuery=""
      searchable={["title"]}
      name="search"
      placeholder={texts.searchLabelPlaceholder[$lang]}
    />
    <div class="filtered-labels">
      {#each filtered as label, index}
        <CardLabel
          bind:data={label}
          bind:cardData={data}
          bind:boardData
          bind:labelsData
          showIcon={checkIfItemIsInArray(label, data.labels).isInIt}
          allowEdit={true}
          icon="check"
          canSelect={true}
        />
      {/each}
    </div>
    <div class="label-btns">
      <Button
        on:click={() => (opened = false)}
        size="medium"
        buttonStyleType="outline"
        buttonStyle="dark"
      >
        {texts.close[$lang]}
      </Button>
      <Button
        on:click={() => (colorsModalOpened = true)}
        --szot-button-width="fit-content"
        size="medium"
        buttonStyleType="filled"
        buttonStyle="dark"
      >
        {texts.createLabel[$lang]}
      </Button>
    </div>
  </div>
</Modal>

<CardHandleLabelsColorsModal
  bind:boardData
  bind:labelsData
  bind:opened={colorsModalOpened}
  bind:cardData={data}
/>

<style lang="scss">
  .filtered-labels,
  .existing-labels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;
    justify-items: stretch;
  }

  .filtered-labels {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .label-btns {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-top: 1rem;
  }
</style>
