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

<Modal bind:opened --szot-modal-width="500px" --szot-modal-max-width="90vw">
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
    <div class="modal-alert-footer">
      <Button
        on:click={() => (opened = false)}
        size="small"
        buttonStyleType="outline"
        buttonStyle="dark"
      >
        {texts.close[$lang]}
      </Button>
      <Button
        on:click={() => (colorsModalOpened = true)}
        size="small"
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
</style>
