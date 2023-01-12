<script lang="ts">
  import type {
    TBoard,
    TCustomBoard,
    TCardUser,
    TCardLabel,
  } from "../data/types";

  // components
  import Board from "../Board.svelte";

  // props
  export let canCreateCard = true; // create card boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteCard = true; // create card boolean
  export let canDeleteList = true; // create list boolean
  export let canMoveCard = true; // move card boolean
  export let canMoveList = true; // move list boolean
  export let customCard;
  export let data: TBoard | TCustomBoard = {} as any;
  export let labels: TCardLabel[] = [];
  export let language = "";
  export let searchableCardKeys: string[];
  export let style = "";
  export let users: TCardUser[] = [];

  const props = {
    canCreateCard,
    canCreateList,
    canDeleteCard,
    canDeleteList,
    canMoveCard,
    canMoveList,
    customCard,
    language,
    searchableCardKeys,
  };

  // @ts-ignore
  $: if (customCard) props.clickSearchResultFunction = openResultCardModal;

  function openResultCardModal(): void {
    if (customCard) return alert("You have an awsome custom card!");
  }
</script>

<div class="screen-simulation" {style}>
  <Board bind:data bind:users bind:labels {...props} />
</div>

<style lang="scss">
  .screen-simulation {
    height: 96.5vh;
    width: 100%;
  }
</style>
