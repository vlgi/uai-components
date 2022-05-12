<script lang="ts">
  // Field concatenation
  type TConcat = {
    index: number,
    concatenated: string,
  }

  // The input reference.
  export let inputBind: HTMLInputElement = null;

  /**
   * The string that is being searched.
   * @type {string}
   */
  export let searchQuery = "";

  // ======== Filtering ======== //
  /**
   * All the fields that can be searched.
   * @type {array}
   */
  export let searchable: string[];
  /**
   * The items to be filtered by the search.
   * @type {array}
   */
  export let items: unknown[] = [];
  /**
   * The items filtered by the search.
   * @type {array}
   */
  export let filtered: unknown[] = [];

  /**
   * Focus on the input element.
   */
  export const focus = (): void => {
    if (inputBind) inputBind.focus();
  };

  // Generate a lookup table with the searchable fields concatenated
  function concatenateSearchable(_items: unknown[], _searchable: string[]): TConcat[] {
    return _items.map((item, i) => {
      let concatenated = "";
      _searchable.forEach((field) => {
        concatenated = `${concatenated} ${item[field] as string}`;
      });
      return {
        index: i,
        concatenated,
      };
    });
  }
  $: searchConcat = concatenateSearchable(items, searchable);

  // search for each word
  function calculateRegex(_searchQuery: string) {
    const words = _searchQuery.split(" ").filter((v) => v !== "");
    const wordSet = `(${words.join("|")})`;
    return RegExp(`${wordSet}.*`.repeat(words.length), "i");
  }
  $: regex = calculateRegex(searchQuery);

  // Searches in the concatenated fields and then find each corresponding item
  $: filtered = (searchConcat as TConcat[])
    .filter(({ concatenated }) => concatenated.match(regex) !== null)
    .map(({ index }) => items[index]);
</script>
<div>
  <input type="text" class="search" tabindex="-1"
    placeholder="Pesquise ou Selecione..."
    bind:value={searchQuery}
    bind:this={inputBind}/>
</div>
<style lang="scss">
  @use "src/styles/mixins" as m;

  div {
    @include m.border(var(--component-border), var(--component-border-color));
    border-radius: var(--theme-small-shape);
    margin: 0.375rem 0 0.125rem 0;
  }
  .search {
    color: var(--theme-dark-inserted-text);
    background-color: var(--component-background-color);
    width: 100%;

    padding: var(--theme-fields-padding);
    text-overflow: ellipsis;
    border: var(--component-border) solid transparent;
    border-radius: var(--theme-small-shape);
    outline: none;
    &::placeholder {
      color: var(--theme-light-txt);
    }
  }
</style>
