<script lang="ts">
  import data from "./data/emoji";
  import { fuzzySearch } from "../../utils";

  // components
  import Input from "../../../formFields/Input/Input.svelte";
  import Icon from "../../../Icon/Icon.svelte";

  const categories = [
    "Recently Used",
    "Smileys & People",
    "Animals & Nature",
    "Food & Drink",
    "Activities",
    "Travel & Places",
    "Objects",
    "Symbols",
    "Flags",
  ];

  const categoryIcons = {
    "Recently Used": "clock-outline",
    "Smileys & People": "emoticon-happy",
    "Animals & Nature": "teddy-bear",
    "Food & Drink": "coffee",
    Activities: "soccer",
    "Travel & Places": "car",
    Objects: "lightbulb-outline",
    Symbols: "symbol",
    Flags: "flag",
  };
  const emojiCategories = {};

  categories.forEach((cat) => {
    emojiCategories[cat] = [];
  });
  data.forEach((emoji) => {
    let categoryList = emojiCategories[emoji.category];
    if (!categoryList) {
      categoryList = emojiCategories[emoji.category] = [];
    }
    categoryList.push(emoji);
  });
  // console.log(emojiCategories);
  let arr = [];
  Object.keys(emojiCategories).forEach((k) => {
    arr = [...arr, ...emojiCategories[k]];
  });
  console.log(arr);
  // console.log(Object.values(emojiCategories));

  function searchIcons(e): void {
    // console.log(e.target.value);
    console.log(Object.values(emojiCategories));
    const keys = ["name", "category"];
    const results = fuzzySearch(arr, e.target.value, keys);
  }

  function goToCategory(ci: number): void {
    document.getElementById(`tab-${ci}`).scrollIntoView();
  }

  $: emojiName = "";
</script>

<div class="emojis-selector-container">
  <div class="selector-header">
    <!-- <h1>Emojis Selector</h1> -->
    <Input
      on:input={searchIcons}
      name="emojis-search-input"
      icon="magnify"
      --szot-input-margin-bottom="0"
      --szot-input-margin-top="0"
    />
  </div>
  <div class="categories-tabs">
    {#each categories as cat, ci}
      <button class="tab" on:click={() => goToCategory(ci)}>
        <Icon iconName={categoryIcons[cat]} --szot-icon-font-size="20px" />
      </button>
    {/each}
  </div>
  <div class="emojis-container">
    {#each arr as emoji, ei}
      {#if ei == 0}
        <h4>{emoji.category}</h4>
      {:else if ei > 0 && emoji.category != arr[ei - 1].category}
        <h4>{emoji.category}</h4>
      {/if}
      <button
        class="emoji-btn"
        on:focus
        on:mouseover={() => (emojiName = emoji.name)}
        on:blur
        on:mouseout={() => (emojiName = "")}
      >
        {emoji.emoji}
      </button>
    {/each}
  </div>
  <div class="footer">{emojiName}</div>
</div>

<style lang="scss">
  .emojis-selector-container {
    display: flex;
    flex-direction: column;
    width: 330px;
    max-width: 90vw;
    height: 400px;
    max-height: 60vh;
    background: white;
    border-radius: var(--radius-pattern);
    padding-bottom: 10px;

    .selector-header {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: var(--radius-pattern);
      padding: 10px;
    }

    button {
      align-self: center;
      background: transparent;
      border: none;
      outline: none;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      font-size: 20px;

      &:hover {
        cursor: pointer;
        background: rgba(230, 230, 230, 1);
      }

      &:focus {
        box-shadow: var(--box-shadow-pattern);
        background: white;
      }
    }

    .categories-tabs {
      display: flex;
      border-bottom: 1px solid #eee;

      .tab {
        border-right: 1px solid #eee;
        border-radius: 0;
      }

      .tab:last-child {
        border-right: none;
      }
    }

    .emojis-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      overflow-y: auto;

      h4 {
        position: sticky;
        background: white;
        padding: 10px 0;
        margin: 0 10px;
        top: 0;
        border-bottom: 1px solid #eee;
        text-align: center;
        width: 100%;
      }

      .emojis {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      font-size: 12px;
      padding-top: 10px;
    }
  }
</style>
