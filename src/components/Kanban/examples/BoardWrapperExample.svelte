<script lang="ts">
  import type {
    SvelteComponent,
  } from "svelte";

  import type {
    TBoard,
    TCustomCard,
    TCustomBoard,
    TCardUser,
    TCardLabel,
} from "../data/types";

// components
import Board from "../Board/Board.svelte";

  // props
  export let canCreateCard = true; // create card boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteCard = true; // create card boolean
  export let canDeleteList = true; // create list boolean
  export let canMoveCard = true; // move card boolean
  export let canMoveList = true; // move list boolean
  export let customCard: SvelteComponent | boolean = false;
  export let data: TBoard | TCustomBoard;
  export let labels: TCardLabel[] = [];
  export let searchableCardKeys: string[];
  export let style = "";
  export let users: TCardUser[] = [];

  function openResultCardModal(card: TCustomCard): void {
    // eslint-disable-next-line no-alert
    alert(
      `You have an awesome custom card!:
      \n######################
      \nTitle: ${card.title}
      \n######################`,
    );
  }

  const propsDefault = {
    canCreateCard,
    canCreateList,
    canDeleteCard,
    canDeleteList,
    canMoveCard,
    canMoveList,
    customCard,
    searchableCardKeys,
  };

  let props = { ...propsDefault };

  const propsCustom = {
    ...props,
    clickSearchResultFunction: openResultCardModal,
  };

  $: if (customCard) props = { ...propsCustom };

</script>

<div class="screen-simulation" {style}>
  <Board bind:data bind:users bind:labels { ...props } />
</div>

<style lang="scss">
  .screen-simulation {
    height: 96.5vh;
    width: 100%;
  }
</style>
