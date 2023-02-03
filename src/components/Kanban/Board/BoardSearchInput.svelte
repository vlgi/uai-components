<script lang="ts">
  import { actionOutClick } from "../../../actions/clickOutside/clickOutside";

  import type {
    TBoard,
    TList,
    TDefautCard,
    TCustomBoard,
    TCustomCard,
    TCustomList,
  } from "../data/types";

  import { texts } from "../data/components-texts";

  // funcs
  import {
    fuzzySearch,
    throttle,
  } from "../utils";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import Input from "../../formFields/Input/Input.svelte";
  import CardModal from "../Card/CardModal.svelte";

  // types
  interface TDefaultCardFullData extends TDefautCard {
    li: number;
    ci: number;
  }

  interface TCustomCardFullData extends TCustomCard {
    li: number;
    ci: number;
  }

  type TCombinedCustomDefaultCard = TDefaultCardFullData | TCustomCardFullData

  type TFuzzySearchResult = {
    item: TCombinedCustomDefaultCard;
    matches: {
      indices: number[][];
      key: string;
      value: string;
    }[];
    refIndex: number;
    score: number;
  };

  export let data: TBoard | TCustomBoard; // board data
  export let searchableCardKeys: string[];
  export let titleColor = "var(--board-title-color)";

  let allCards: TCombinedCustomDefaultCard[] = []; // all board cards
  let results: TCombinedCustomDefaultCard[] = []; // search result board cards
  let selectedCardListIndex = -1;
  let showCardModal = false;
  let showResults = false;
  let selectedCardIndex = -1;

  function openSelectedCardModal(card: TDefaultCardFullData | TCustomCardFullData): void {
    const selected = { ...card };
    selectedCardListIndex = selected.li;
    selectedCardIndex = selected.ci;
    showResults = false;
    showCardModal = true;
  }

  export let clickSearchResultFunction = openSelectedCardModal;
  let searchSelectedDefaultCardData: TDefautCard;

  // fuzzy search for cards with throtle in each keys passed on searchableCardKeys prop
  function searchForCards(e: InputEvent) {
    return throttle(() => {
      results = fuzzySearch(
        allCards,
        (e.target as HTMLInputElement).value,
        searchableCardKeys,
        0.3,
      ).map((r: TFuzzySearchResult) => r.item);
      showResults = true;
    }, 500)();
  }

  function getAllCards() {
    allCards = [];
    data.lists.forEach((_list: TList | TCustomList, li: number) => {
      const cards = _list.cards
        .map((c, ci: number) => ({ ...c, li, ci }) as TCombinedCustomDefaultCard);
      allCards = [...allCards, ...cards] as TCombinedCustomDefaultCard[];
    });
  }

  $: if (data) getAllCards();

  $: if (selectedCardListIndex !== -1 && selectedCardIndex !== -1) {
    searchSelectedDefaultCardData = data.lists[selectedCardListIndex]
      .cards[selectedCardIndex] as TDefautCard;
  }

</script>

<div
  class="search-input-container"
  use:actionOutClick
  on:actionOutClick={() => {
    showResults = false;
  }}
>
  <Input
    on:input={searchForCards}
    on:focus={() => {
      showResults = true;
    }}
    icon="magnify"
    label={texts.searchCardPlaceholder}
    inputStyle="dark"
    name="cards-search"
    inputAttributes={{ autocomplete: "off" }}
    --szot-input-text-color={titleColor}
    --szot-input-border-color={titleColor}
    --szot-input-label-color={titleColor}
    --szot-input-margin-bottom="0"
    --szot-input-margin-top="0"
    --szot-input-border-color-focus={titleColor}
    --szot-input-icon-color={titleColor}
  />
  {#if showResults && results.length > 0}
    <div class="search-results">
      {#each results as result}
        <button on:click={() => clickSearchResultFunction(result)}>
          <div class="result-icon"><Icon iconName="card" /></div>
          <span class="result-card">{result.title}</span>
          <span class="result-card-list">
            {texts.inList}
            {data.lists[Number(result.li)].title}
          </span>
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if selectedCardListIndex !== -1 && selectedCardIndex !== -1}
  <CardModal
    bind:data={searchSelectedDefaultCardData}
    bind:boardData={data}
    bind:opened={showCardModal}
    on:closeModal={() => {
      selectedCardListIndex = -1;
      selectedCardIndex = -1;
    }}
    ci={selectedCardIndex}
    cli={selectedCardListIndex}
  />
{/if}


<style lang="scss">
  .search-input-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    grid-area: inpt;

    .input-container {
      z-index: 3;
    }

    .search-results {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.97);
      border-radius: var(--target-padding);
      box-shadow: var(--box-shadow-pattern);
      height: fit-content;
      max-height: 60vh;
      margin-top: 45px;
      max-width: calc(100% - 30px - calc(var(--target-padding) * 2));
      position: absolute;
      width: 500px;
      z-index: 2;
      overflow-y: auto;
      padding: var(--target-padding) 0;

      button {
        display: grid;
        grid-template-areas:
          "icon card"
          "icon list";
        justify-items: start;
        grid-template-columns: 23px calc(100% - 25px);
        padding: calc(var(--target-padding) / 2);
        border: 1px solid transparent;
        background: transparent;
        outline: none;

        .result-icon {
          grid-area: icon;
          margin-top: -3px;
        }

        .result-card {
          grid-area: card;
        }

        .result-card-list {
          grid-area: list;
          font-size: 11px;
          color: #555;
        }

        &:hover {
          cursor: pointer;
          background: rgba(230, 230, 230, 1);
        }

        &:focus {
          box-shadow: var(--box-shadow-pattern);
          background: white;
        }
      }
    }
  }
</style>
