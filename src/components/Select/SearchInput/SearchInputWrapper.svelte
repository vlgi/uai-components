<script lang="ts">
  import SearchInput from "./SearchInput.svelte";

  export let inputBind: HTMLInputElement;
  export let focus: ()=> void;
  export let searchQuery = "";
  export let filtered: unknown[] = [];
  export let items: unknown[] = [];
  export let searchable: string[] = [];
</script>

<SearchInput
  bind:inputBind
  bind:focus
  bind:searchQuery
  bind:filtered
  {items}
  {searchable}
  {...$$restProps} />

<header>
  <b>Resultados:</b>
</header>
{#each filtered as item}
  <p>{JSON.stringify(item)}</p>
{/each}
