<script lang="ts">
  import Select from "./Select.svelte";
  import type { TOption } from "./types";

  export let label: string;
  export let options: TOption[];
  export let id: string;
  export let name: string;
  export let selectAttributes = {};
  export let multiple = false;
  export let required = false;
  export let min = 1;
  export let isValid = true;
  export let selected: TOption | TOption[] | null = [];
  export let forceInvalid = false;
  export let style = "";
</script>

<div {style}>
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
    {...$$restProps}
    bind:isValid
    bind:selected
  />

  <header><b>Selected:</b></header>
  {#if Array.isArray(selected)}
    {#each selected as option}
      <p>{JSON.stringify(option)}</p>
    {/each}
  {:else}
    <p>{JSON.stringify(selected)}</p>
  {/if}

  <p><b>isValid:</b> {isValid}</p>
</div>
