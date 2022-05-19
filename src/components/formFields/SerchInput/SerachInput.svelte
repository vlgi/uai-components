<script lang="ts">
  import Input from "../Input/Input.svelte";

  // Field concatenation
  type TConcat = {
    index: number,
    concatenated: string,
  }

  // The input reference.
  export let inputElement: HTMLInputElement = null;

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

  // Serach input name //
  export let name: string;

  // Other attributes for the HTML input element
  export let inputAttributes: Record<string, string> = {
    tabindex: "-1",
    placeholder: "Pesquise ou Selecione...",
  };

  /**
   * Focus on the input element.
   */
  export const focus = (): void => {
    if (inputElement) inputElement.focus();
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

<Input
  bind:value={searchQuery}
  bind:inputElement
  on:change
  on:input
  {name}
  {inputAttributes}

  {...$$restProps}
/>

<style lang="scss">
</style>
