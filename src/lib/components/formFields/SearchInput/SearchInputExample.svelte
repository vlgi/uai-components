<script lang="ts">
  import type { ComponentProps } from "svelte";
  import SearchInput from "./SearchInput.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = ComponentProps<SearchInput>;

  // Used to force $$restProps be of type ComponentProps<SearchInput>;
  $: restProps = $$restProps as ComponentProps<SearchInput>;

  /**
   * TODO - I don't know why, but after update the stack
   * this component only works if this 3 props are exported.
   * And the reactivity doesn't work. But select, that use this component
   * works perfectly.
   */
  export let filtered: unknown[] = [];
  export let items: unknown[] = [];
  export let searchable: string[] = [];
</script>

<SearchInput
  bind:filtered
  {items}
  {searchable}
  {...restProps}
/>

<header>
  <b>Results</b>
</header>
{#each filtered as filter}
  <p>{JSON.stringify(filter)}</p>
{/each}
