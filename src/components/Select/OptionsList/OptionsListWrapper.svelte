<script lang="ts">
import OptionsList from "./OptionsList.svelte";

export let id;
export let labelledBy;
export let options;
export let selected;
export let focused;
export let focusNext;
export let focusPrevious;
export let toggleSelectedOfFocused;
export let unfocusItems;
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
