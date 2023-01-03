<script lang="ts">
  import { onMount } from "svelte";

  import type {
    TBoard,
    TCustomBoard,
    TCardUser,
    TCardLabel,
  } from "./data/types";

  // components
  import Board from "./Board.svelte";

  // props
  export let style = "";
  export let language = "";
  export let canMoveList: boolean;
  export let canMoveCard: boolean;
  export let customCard;

  // props data
  export let data: TBoard | TCustomBoard = {} as any;
  export let users: TCardUser[] = [];
  export let labels: TCardLabel[] = [];

  $: console.log(data);

  onMount(() => {
    console.log("piroca");
  });

  const props = {
    language,
    canMoveList,
    canMoveCard,
    customCard,
  };
</script>

<div class="screen-simulation" {style}>
  <Board {data} bind:users bind:labels {...props} />
</div>

<style lang="scss">
  .screen-simulation {
    height: 96.5vh;
    width: 100%;
  }
</style>
