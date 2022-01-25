<script lang="ts">
import Select from "./Select.svelte";

export let label;
export let options;
export let selectAttributes;
export let multiple;
export let selected;
</script>

<Select
  {label}
  {options}
  {selectAttributes}
  {multiple}
  bind:selected/>

<header><b>Selected:</b></header>
{#if Array.isArray(selected)}

  {#each selected as option}
    <p>{JSON.stringify(option)}</p>
  {/each}

{:else}
  <p>{JSON.stringify(selected)}</p>
{/if}
