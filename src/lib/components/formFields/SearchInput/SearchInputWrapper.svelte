<script lang="ts">
  import SearchInput from "./SearchInput.svelte";

  export let inputElement: HTMLInputElement;
  export let focus: () => void;
  export let searchQuery = "";
  export let filtered: unknown[] = [];
  export let items: unknown[] = [];
  export let searchable: string[] = [];
</script>

<SearchInput
  bind:inputElement
  bind:focus
  bind:searchQuery
  bind:filtered
  {items}
  {searchable}
  name="search"
  {...$$restProps}
/>

<header>
  <b>Results</b>
</header>
{#each filtered as filter}
  <p>{JSON.stringify(filter)}</p>
{/each}
