<script lang="ts">
import Select from "./Select.svelte";

export let label;
export let options;
export let id;
export let name;
export let selectAttributes = {};
export let multiple;
export let required;
export let min;
export let isValid;
export let selected;
export let forceInvalid;
</script>

<Select
  {label}
  {options}
  {id}
  {name}
  {selectAttributes}
  {multiple}
  {required}
  {min}
  {forceInvalid}
  bind:isValid
  bind:selected/>

<header><b>Selected:</b></header>
{#if Array.isArray(selected)}

  {#each selected as option}
    <p>{JSON.stringify(option)}</p>
  {/each}

{:else}
  <p>{JSON.stringify(selected)}</p>
{/if}

<p><b>isValid:</b> {isValid}</p>
