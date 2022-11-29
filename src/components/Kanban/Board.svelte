<script lang="ts">
  import List from "./List.svelte";
  import type { TBoard } from "./board-data";

  export let data: TBoard;
</script>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div class="container" style="background-image: url({data.backgroundImage})">
    <div class="title">{data.title}</div>
    <div class="lists">
      {#each data.lists as list}<List data={list} />{/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .loading,
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .loading {
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background: white;
  }
  .container {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    background-repeat: no-repeat;
    background-size: cover;

    .title {
      font-weight: bold;
      font-size: 2rem;
      color: var(--szot-board-title-color);
    }

    .lists {
      display: grid;
      grid-auto-flow: column;
      gap: 0.5rem;
      height: 100%;
      width: 100%;
      overflow-x: auto;
      align-content: start;
      justify-content: start;
    }
  }
</style>
