<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Select from "./Select.svelte";
  import type { TOption } from "./types";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Select> {
    style?: string;
  }

  export let multiple = false;
  export let selected: TOption | TOption[] | null = multiple ? [] : null;
  export let isValid = true;
  export let style = "";

  // Used to force $$restProps be of type ComponentProps<Select>;
  function typeRestProps(restProps: unknown) {
    return restProps as ComponentProps<Select>;
  }
</script>

<div {style}>
  <Select
    {...typeRestProps($$restProps)}
    {multiple}
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
