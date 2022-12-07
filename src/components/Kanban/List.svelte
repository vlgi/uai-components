<script lang="ts">
  import Card from "./Card.svelte";
  import type { TList } from "./board-data";
  import { setElementPan } from "./utils";

  export let data: TList;
  export let index: number;
</script>

<div class="container">
  <div class="header">
    <div class="title">{data.title}</div>
  </div>
  <div class="kaban-cards">
    {#each data.cards as card, index}
      <div class="card-wrapper">
        <!-- <div class="card card-placeholder" /> -->
        <div class="card">
          <span>{card.title}</span>
          <!-- <Card data={card} /> -->
        </div>
      </div>
    {/each}
  </div>
  <div class="footer">Bottom</div>
</div>

<style lang="scss">
  .container {
    background-color: var(--szot-list-background-color);
    display: grid;
    height: fit-content;
    max-height: 100%;
    overflow-y: auto;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 5px;
    top: 0;

    .header,
    .footer {
      padding: 0.25rem 0.5rem;
    }

    .header {
      .title {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--szot-list-title-color);
        // background: blue;
      }
    }

    .footer {
      bottom: 0;
    }

    .header,
    .footer {
      position: sticky;
      background: inherit;
      &:hover {
        cursor: pointer;
      }
    }

    .kaban-cards {
      display: grid;
      gap: 0.5rem;
      background: inherit;
      padding: 0 0.5rem 0.5rem 0.5rem;
      align-content: start;

      .card-wrapper {
        .card-placeholder {
          height: 150px;
        }

        .card {
          background: lightseagreen;
          width: 100%;
          height: 80px;
          cursor: pointer;
          padding: 5px 8px;

          span {
            color: white;
            font-weight: bold;
          }

          &:hover {
            opacity: 0.8;
          }
        }

        .card-dragging {
          position: absolute;
        }
      }
    }
  }
</style>
