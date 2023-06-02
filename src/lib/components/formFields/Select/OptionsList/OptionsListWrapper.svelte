<script lang="ts">
  import type { TOption } from "../types";
  import OptionsList from "./OptionsList.svelte";

  export let id: string;
  export let labelledBy: string;
  export let options: TOption[];
  export let selected: TOption | TOption[];
  export let focused = -1;
  export let focusNext: () => void;
  export let focusPrevious: () => void;
  export let toggleSelectedOfFocused: () => void;
  export let unfocusItems: () => void;
</script>

<OptionsList
  on:changeSelected
  {id}
  {labelledBy}
  {options}
  bind:selected
  bind:focused
  bind:focusNext
  bind:focusPrevious
  bind:toggleSelectedOfFocused
  bind:unfocusItems
/>

<button on:click={focusNext}>Focus Next</button>
<button on:click={focusPrevious}>Focus Previous</button>
<button on:click={toggleSelectedOfFocused}>Toggle Focused</button>
<button on:click={unfocusItems}>Unfocus Items</button>

<header><b>Selected:</b></header>
{#if Array.isArray(selected)}
  {#each selected as option}
    <p>{JSON.stringify(option)}</p>
  {/each}
{:else}
  <p>{JSON.stringify(selected)}</p>
{/if}
