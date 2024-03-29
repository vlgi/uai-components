<script lang="ts">
  import { onMount, tick } from "svelte";
  import martData from "@emoji-mart/data";
  import i18n from "@emoji-mart/data/i18n/en.json";

  import { actionOutClick } from "$actions/clickOutside/clickOutside";
  import { throttle } from "$helpers/perfomance";
  import searching from "$helpers/searching";
  import { checkIfItemIsInArray } from "$helpers/arrays-handling";

  import Input from "../formFields/Input/Input.svelte";
  import Icon from "../Icon/Icon.svelte";

  type SkinData = {
    unified: string;
    native: string;
  };

  type TEmojiSkin = {
    skins: SkinData[];
    id: string;
  };

  type TEmojiData = {
    id: string;
    keywords: string[];
    name: string;
    skins: SkinData[];
    version: number;
  };

  type TEmojiCategoriesData = {
    id: string;
    name: string;
    icon: string;
    emojis: string[];
    emojisFullData: TEmojiData[];
  };

  type TCategory = {
    emojis: string[];
    id: string;
  };

  type TEmojiMartData = {
    categories: TCategory[];
    emojis: { [key: string]: TEmojiData };
    aliases: { [key: string]: string };
    sheet: {
      cols: number;
      rows: number;
    };
  };

  // selected emoji skin unicode
  export let selected: string;

  // id of this emoji picker to control the recently used emojis
  export let localStorageId: string;

  // html element to focus after user select an emoji
  export let targetEl: HTMLElement = null;

  // when its true, show emoji picker
  export let opened = false;

  // max recently emojis to show
  export let maxRecently = 45;

  const emojisData: TEmojiMartData = martData as TEmojiMartData; // Imported Emoji Mart Data
  let results: TEmojiCategoriesData[] = []; // fuzzy search items data result
  let searched = false; // turns true when user searched for some emoji
  let hoveredEmoji = ""; // set emojis name on footer when mouseover
  let selectedEmojiSkins: TEmojiSkin; // selected emoji skins collection (when there is skins)
  let selectSkin = ""; // selected emoji skin

  // emojis categories icons
  const categoryIcons = {
    recently: "mdi:clock-outline",
    people: "mdi:emoticon-happy",
    nature: "mdi:teddy-bear",
    foods: "mdi:coffee",
    activity: "mdi:soccer",
    places: "mdi:car",
    objects: "mdi:lightbulb",
    symbols: "mdi:symbol",
    flags: "mdi:flag",
  };

  // set recently used emojis from local storage
  const local: TEmojiData[] = JSON.parse(localStorage.getItem(localStorageId)) as TEmojiData[];

  // using ternary instead of .? because storybook is not rendering controls correctly with .?
  let recentlyUsedStorage = local ? local.slice(0, maxRecently) : [];

  // if there are emojis in local storage set tab 0 `recently` else set tab 1 `people`
  let selectedCategory = recentlyUsedStorage.length > 0 ? 0 : 1;

  // set `recently`category that is the first element of full data emojis
  let fullData: TEmojiCategoriesData[] = [
    {
      emojis: recentlyUsedStorage.map((emoji: TEmojiData) => emoji.id),
      emojisFullData: recentlyUsedStorage.map((emoji: TEmojiData) => emojisData.emojis[emoji.id]),
      icon: categoryIcons.recently,
      id: "recently",
      name: "Recently Used",
    },
  ];

  // reset fuzzy search results
  function resetSearch() {
    results = [...fullData];
    results[selectedCategory].emojis = [...fullData[selectedCategory].emojis];
    searched = false;
  }

  // fuzzy search with throtle in each category emojis from keys above
  const searchIcons = throttle((e: InputEvent) => {
    const val = (e.target as HTMLInputElement).value;
    if (val !== "") {
      // if there is any string on input search
      const keys = ["name", "keywords"]; // keys to search for on fuzzy search
      searched = true;
      let fuzzyResults: TEmojiCategoriesData[] = [];

      // search for each category emojis
      fullData.forEach((c) => {
        const result: TEmojiData[] = searching(c.emojisFullData, val, keys, 0.2);

        // set fuzzyResults with the same fullData object type format
        fuzzyResults = [
          ...fuzzyResults,
          {
            ...c,
            emojis: result.map((r) => r.id),
            emojisFullData: [...result],
          },
        ];
      });

      // set all searched emojis results in the same array
      let searchedEmojis: string[] = [];
      let searchedEmojisFullData: TEmojiData[] = [];

      fuzzyResults.forEach((r: TEmojiCategoriesData) => {
        searchedEmojis = [...searchedEmojis, ...r.emojis];
        searchedEmojisFullData = [...searchedEmojisFullData, ...r.emojisFullData];
      });

      // set all searched emojis in a single category
      results = [
        {
          id: "searched",
          name: "Searched",
          icon: "",
          emojis: [...searchedEmojis],
          emojisFullData: [...searchedEmojisFullData],
        },
      ];
    } else {
      // if there isnt any string on input search
      resetSearch();
    }
  }, 500);

  function setEmojiToLocalStorage(emoji: TEmojiData) {
    const check = checkIfItemIsInArray(emoji, recentlyUsedStorage);
    if (check.isInIt) {
      const copy: TEmojiData[] = structuredClone(recentlyUsedStorage);
      copy.splice(check.index, 1);
      recentlyUsedStorage = [...copy];
    }
    recentlyUsedStorage = [emoji, ...recentlyUsedStorage].slice(0, maxRecently);
    localStorage.setItem(localStorageId, JSON.stringify(recentlyUsedStorage));
    fullData[0].emojis = recentlyUsedStorage.map((e) => e.id);
    fullData[0].emojisFullData = [...recentlyUsedStorage];

    results[0].emojis = recentlyUsedStorage.map((e) => e.id);
    results[0].emojisFullData = [...recentlyUsedStorage];
  }

  // on:mousedown event set user selected emoji
  function setEmoji(e: MouseEvent, emoji: TEmojiData) {
    if (emoji.skins.length > 1) {
      // when there is more than 1 skin set selectedEmojisSkins value
      selectedEmojiSkins = {
        skins: [...emoji.skins],
        id: emoji.id,
      };
      selectSkin = emoji.id;
    } else {
      // when there is just 1 skin directly set emoji skin
      selected = emoji.skins[0].native;
      setEmojiToLocalStorage(emoji);
    }
  }

  // reset `selectedEmojiSkins` and `selectSkin`
  // when skis was selected and
  // when user clicked outside skins container
  function resetSelectedEmojiSkins() {
    selectedEmojiSkins = {
      skins: [],
      id: "",
    };
    selectSkin = "";
  }

  // on:mouseup event in some skin button, set selected skin
  async function setEmojiSkin(skin: SkinData, emoji: TEmojiData) {
    selected = skin.native;
    await tick();
    resetSelectedEmojiSkins();
    setEmojiToLocalStorage(emoji);
  }

  // set initial data on mount
  onMount(() => {
    for (let i = 0; i < emojisData.categories.length; i++) {
      const category: TCategory = emojisData.categories[i];
      fullData = [
        ...fullData,
        {
          emojis: [...category.emojis],
          emojisFullData: category.emojis.map((emoji: string) => emojisData.emojis[emoji]),
          icon: categoryIcons[category.id] as string,
          id: category.id,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          name: i18n.categories[category.id] as string,
        },
      ];
    }
    results = [...fullData];
  });
</script>

{#if opened}
  <div
    class="container"
    use:actionOutClick
    on:actionOutClick={() => {
      opened = false;
    }}
  >
    <!-- header (input + tabs) container -->
    <div class="header">
      <div class="search-emojis-input-container">
        <Input
          on:input={searchIcons}
          label="Procure aqui..."
          icon="magnify"
          id="emojis-search-input"
          inputAttributes={{ autocomplete: "off" }}
          name="emojis-search-input"
          --uai-input-margin-bottom="0"
          --uai-input-margin-top="0"
        />
      </div>
      <div class="categories-tabs">
        {#each fullData as cat, ci}
          <button
            aria-label={cat.id}
            on:click={() => {
              selectedCategory = ci;
              resetSearch();
            }}
            class:selected-tab={ci === selectedCategory}
          >
            <Icon
              iconName={cat.icon}
              --uai-icon-font-size="20px"
              --uai-icon-color="var(--tabs-icon-color)"
            />
          </button>
        {/each}
      </div>
    </div>

    <!-- emojis container -->
    <div class="emojis-categories">
      {#each results as c, ci}
        {#if selectedCategory === ci}
          {#if !searched}<h4>{c.name}</h4>{/if}
        {/if}
        {#if selectedCategory === ci || searched}
          <div class="emojis-container">
            {#each c.emojis as emoji}
              <div class="emoji-container">
                <!-- Emoji picker button -->
                <button
                  on:mousedown|self={(e) => setEmoji(e, emojisData.emojis[emoji])}
                  on:mouseup={() => {
                    selected = "";
                    if (targetEl) targetEl.focus();
                  }}
                  on:focus={() => {
                    hoveredEmoji = emojisData.emojis[emoji].name;
                  }}
                  on:mouseover={() => {
                    hoveredEmoji = emojisData.emojis[emoji].name;
                  }}
                  on:blur={() => {
                    hoveredEmoji = "";
                  }}
                  on:mouseout={() => {
                    hoveredEmoji = "";
                  }}
                >
                  {emojisData.emojis[emoji].skins[0].native}
                </button>

                <!-- Emojis skins picker -->
                {#if selectedEmojiSkins?.skins?.length > 1 && selectSkin === emoji}
                  <div
                    class="skins-container"
                    use:actionOutClick
                    on:actionOutClick={resetSelectedEmojiSkins}
                  >
                    {#each selectedEmojiSkins?.skins as skin}
                      <button
                        on:mouseup={async () => {
                          await setEmojiSkin(skin, emojisData.emojis[emoji]);
                          if (targetEl) targetEl.focus();
                          selected = "";
                        }}
                      >
                        {skin.native}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      {/each}
    </div>

    <!-- footer icons names when hover -->
    <div class="footer">{hoveredEmoji}</div>
  </div>
{/if}

<style lang="scss">
  .container {
    --background-color: var(--uai-emojis-picker-background-color, white);
    --height: var(--uai-emojis-picker-height, 320px);
    --tabs-icon-color: var(--uai-emojis-picker-tabs-icon-color, var(--theme-dark));

    background-color: var(--background-color);
    border-radius: var(--uai-emojis-picker-border-radius, var(--theme-small-shape));
    box-shadow: var(--uai-emojis-picker-box-shadow, var(--theme-medium-shadow));

    height: var(--height);
    width: var(--uai-emojis-picker-width, 315px);
    max-width: 100%;
    min-width: 150px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      outline: none;
      font-size: 23px;
      height: 35px;
      width: 35px;
      border: 1px solid transparent;
      border-radius: 5px;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }

      &:focus {
        background: rgba(230, 235, 235, 1);
      }
    }

    .header {
      .search-emojis-input-container {
        padding: 10px;
      }

      .categories-tabs {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        button {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid var(--uai-emojis-picker-tabs-border-color, var(--theme-light));
          border-radius: 0;
        }

        button:first-child {
          border-left: 1px solid transparent;
        }

        button:last-child {
          border-right: 1px solid transparent;
        }

        .selected-tab {
          background: #eee;
        }
      }
    }

    .emojis-categories {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: calc(var(--height) - 125px);
      isolation: isolate;

      h4 {
        position: sticky;
        top: 0;
        text-align: center;
        width: 100%;
        padding: 10px;
        background-color: var(--background-color);
        height: fit-content;
        border-bottom: 1px solid
          var(--uai-emojis-picker-category-title-border-color, var(--theme-light));
        color: var(--uai-emojis-picker-category-title-font-color, var(--theme-dark));
        z-index: 2;
      }

      .emojis-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        z-index: 1;

        .emoji-container {
          display: flex;
          position: relative;

          button {
            background-color: var(--uai-emojis-picker-emoji-background-color, transparent);
          }

          .skins-container {
            display: flex;
            flex-wrap: wrap;
            height: fit-content;
            max-height: 70px;
            max-width: 105px;
            width: max-content;
            position: absolute;
            font-size: 20px;
            border-radius: 5px;
            bottom: 0;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

            z-index: 2;
          }
        }
      }
    }

    .footer {
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 5px;
    }
  }
</style>
