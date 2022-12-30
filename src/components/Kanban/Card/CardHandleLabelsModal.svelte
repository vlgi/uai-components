<script lang="ts">
  import type { TCard } from "../data/types";
  import { texts } from "../data/components-texts";

  // stores
  import { lang } from "../stores";

  // components
  import CardHandleLabelsColorsModal from "./CardHandleLabelsColorsModal.svelte";
  import SearchInput from "../../formFields/SearchInput/SearchInput.svelte";
  import CardLabel from "./CardLabel.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";

  // props
  export let data: TCard; // card data
  export let opened = false;

  // stores
  import { allLabels } from "../stores";

  // local variables
  $: filtered = [];
  $: colorsModalOpened = false;

  // functions
  import { checkIfItemIsInArray } from "../utils";
</script>

<Modal bind:opened --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <SearchInput
      bind:items={$allLabels}
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
  bind:opened={colorsModalOpened}
  bind:cardData={data}
/>

<style lang="scss">
  @import "../index.scss";

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
