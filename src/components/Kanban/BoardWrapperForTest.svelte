<script lang="ts">
  import { onMount } from "svelte";
  import { data } from "./board-data";
  import Board from "./Board.svelte";
  import type { TBoard } from "./board-data";

  let boardData: TBoard;

  onMount(async () => {
    setTimeout(() => {
      boardData = data;
    }, 1000);
  });
</script>

<div class="screen-simulation">
  <Board
    bind:data={boardData}
    --szot-board-title-color="white"
    --szot-list-title-color="#666"
    --szot-list-background-color="#f5f5f5"
    --szot-card-background-color="black"
  />
</div>

<style lang="scss">
  .screen-simulation {
    height: 576px;
    width: 1024px;
    height: 720px;
    width: 1280px;
    height: 100vh;
    width: 100%;
  }
</style>
