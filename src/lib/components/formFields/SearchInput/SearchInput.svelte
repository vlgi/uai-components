<script lang="ts">
  /* eslint-disable */
  /**
   * Disabling lint for this file because him can't handle with $$Generic
   * necessary to make the table columns and table rows be strong typed.
   */

  import Input from "../Input/Input.svelte";
  import searching from "$helpers/searching";
  import { throttle } from "$helpers/perfomance";

  type TItem = $$Generic;

  type TborderStyle = "primary" | "secondary" | "dark" | "light";

  type Tborders = "bottom" | "outline";

  /** choose default theme colors */
  export let inputStyle: TborderStyle = "dark";

  /** choose border type */
  export let border: Tborders = "outline";

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
  export let searchable: Parameters<typeof searching<TItem>>[2];
  /**
   * The items to be filtered by the search.
   * @type {array}
   */
  export let items: TItem[] = [];
  /**
   * The items filtered by the search.
   * Readonly. Will be = to "items" if searchQuery is empty
   * @type {array}
   */
  export let filtered: TItem[] = [];

  // Search input name //
  export let name: string;

  // input tabindex
  export let tabindex = "-1";

  // input placeholder
  export let placeholder = "Pesquise ou Selecione...";

  // input icon
  export let icon: string | null = null;

  // Other attributes for the HTML input element
  export let inputAttributes: Record<string, string> = {};

  export let disabled = false;

  /**
   * Focus on the input element.
   */
  export const focus = (): void => {
    if (inputElement) inputElement.focus();
  };

  const performSearch = throttle((query: string) => {
    if (query) {
      filtered = searching(items, query, searchable);
    } else {
      filtered = items;
    }
  }, 500);

  /**
   * Perform search only when searchQuery change.
   * If you need to change items or searchable keys, remount the component.
   */
  $: performSearch(searchQuery);

  $: inputAttributes.tabindex = tabindex;
  $: inputAttributes.placeholder = placeholder;
</script>

<Input
  bind:value={searchQuery}
  bind:inputElement
  on:change
  on:input
  {name}
  {disabled}
  {inputStyle}
  {border}
  {icon}
  {inputAttributes}
/>

<style lang="scss">
</style>
