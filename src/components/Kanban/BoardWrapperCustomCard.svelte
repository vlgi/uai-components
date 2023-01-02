<script lang="ts">
  import { onMount } from "svelte";
  import { data } from "./data/board-data-custom-card";
  import { users } from "./data/users-data";
  import { labels } from "./data/labels-data";
  import type { TBoard, TCardUser, TCardLabel } from "./data/types";

  // components
  import Board from "./Board.svelte";
  import CustomCardForTest from "./CustomCardForTest.svelte";

  // local variables
  let boardData: TBoard; // board data
  let allUsers: TCardUser[]; // all users
  let allLabels: TCardLabel[]; // all labels

  // simulate a api get request
  onMount(async () => {
    setTimeout(() => {
      boardData = data;
      allUsers = users;
      allLabels = labels;
    }, 1000);
  });
</script>

<div class="screen-simulation">
  <Board
    bind:data={boardData}
    customCard={CustomCardForTest}
    canMoveList={true}
    canMoveCard={true}
    language="en"
    --szot-kanban-board-background-color="pink"
    --szot-kanban-board-title-color="#2F3675"
    --szot-kanban-list-background-color="#F0F1F2"
    --szot-kanban-list-font-color="#2F3675"
    --szot-kanban-radius-pattern="0"
  />
</div>

<style lang="scss">
  .screen-simulation {
    height: 576px;
    width: 1024px;

    height: 1045px;
    width: 1885px;

    height: 720px;
    width: 1280px;

    height: 900px;
    width: 1600px;

    height: 810px;
    width: 1440px;

    height: 96.5vh;
    width: 100%;
  }
</style>
