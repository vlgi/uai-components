<script lang="ts">
import Select from "./Select.svelte";

export let label;
export let options;
export let id;
export let name;
export let selectAttributes = {};
export let multiple;
export let selected = multiple ? [] : null;
</script>

<Select
  {label}
  {options}
  {id}
  {name}
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
