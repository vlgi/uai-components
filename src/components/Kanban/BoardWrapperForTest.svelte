<script lang="ts">
  import { onMount } from "svelte";
  import { data } from "./data/board-data";
  import { users } from "./data/users-data";
  import { labels } from "./data/labels-data";
  import type { TBoard, TCardUser, TCardLabel } from "./data/types";

  // components
  import Board from "./Board.svelte";

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
    bind:users={allUsers}
    bind:labels={allLabels}
    language="br"
    --szot-board-title-color="white"
    --szot-list-title-color="#666"
    --szot-list-background-color="#f5f5f5"
    --szot-card-background-color="#f9f9f9"
    --szot-radius="15px"
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
