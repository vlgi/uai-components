<script lang="ts">
  import Card from "./Card.svelte";
  import type { ComponentProps } from "svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Card> {
    style?: string;
    bodyHtml?: string;
    headerHtml?: string;
    footerHtml?: string;
  }

  export let style = "";

  export let bodyHtml = "";
  export let headerHtml = "";
  export let footerHtml = "";

  $: restProps = $$restProps as ComponentProps<Card>;
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<div
  class="wrapper"
  {style}
>
  {#if headerHtml !== ""}
    <Card
      on:click
      on:keyup
      {...restProps}
    >
      {@html bodyHtml}

      <svelte:fragment slot="header">
        {@html headerHtml}
      </svelte:fragment>

      <svelte:fragment slot="footer">
        {@html footerHtml}
      </svelte:fragment>
    </Card>
  {:else}
    <Card {...restProps}>
      {@html bodyHtml}

      <svelte:fragment slot="footer">
        {@html footerHtml}
      </svelte:fragment>
    </Card>
  {/if}
</div>

<style>
  .wrapper {
    background-color: #e5e5e5;
    padding: 1em;
  }
</style>
