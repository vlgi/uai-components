<script lang="ts">
import { longDesserts } from "../fixtures";
import { infiniteScroll } from "./actionInfiniteScroll";


let max = 7;
const step = 7;

export let distFromBottom = 0;
</script>

<div class="infiniteScroll"
  use:infiniteScroll={{ distFromBottom }}
  on:actionLoadMore={() => {
    max += step;
  }}>
  {#each longDesserts.slice(0, max) as dessert}
    <p>{dessert.text}</p>
  {/each}
</div>

<style>
  .infiniteScroll {
    max-height: 5rem;
    overflow-y: auto;
  }
</style>
