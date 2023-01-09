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
  export let style = "";
  export let language = "";
  export let searchableCardKeys: string[];
  export let customCard;
  export let data: TBoard | TCustomBoard = {} as any;
  export let users: TCardUser[] = [];
  export let labels: TCardLabel[] = [];
  export let canMoveCard = true; // move card boolean
  export let canCreateCard = true; // create card boolean
  export let canDeleteCard = true; // create card boolean
  export let canMoveList = true; // move list boolean
  export let canCreateList = true; // create list boolean
  export let canDeleteList = true; // create list boolean

  const props = {
    language,
    customCard,
    canMoveCard,
    canCreateCard,
    canDeleteCard,
    canMoveList,
    canCreateList,
    canDeleteList,
    searchableCardKeys,
  };
</script>

<div class="screen-simulation" {style}>
  <Board bind:data bind:users bind:labels {...props} />
</div>

<style lang="scss">
  .screen-simulation {
    height: 96vh;
    width: 100%;
  }
</style>
