<script lang="ts">
  import type { ComponentProps } from "svelte";
  import SearchInput from "./SearchInput.svelte";
  import { complexDesserts } from "./fixtures";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Props = ComponentProps<SearchInput<(typeof complexDesserts)[0]>>;

  // Used to force $$restProps be of type ComponentProps<SearchInput>;
  function typeRestProps(restProps: unknown) {
    return restProps as ComponentProps<SearchInput<(typeof complexDesserts)[0]>>;
  }

  export let items: typeof complexDesserts;
  let filtered = complexDesserts;

</script>

<SearchInput
  bind:filtered
  {items}
  on:change
  on:input
  {...typeRestProps($$restProps)}
/>

<header>
  <b>Results</b>
</header>
{#each filtered as filter}
  <p>{JSON.stringify(filter)}</p>
{/each}
