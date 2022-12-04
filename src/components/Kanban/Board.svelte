<script lang="ts">
  import List from "./List.svelte";
  import type { TBoard } from "./board-data";
  import Hammer from "hammerjs";

  import {
    changeElPositionByIndex,
    checkElementsPosition,
    getRelativePosition,
  } from "./utils";

  export let data: TBoard;

  let phHeight = 300;

  $: draggingListIndex = -1;
  $: targetListIndex = -1;
  $: relativeX = -1;
  $: relativeY = -1;
  let dragDirection: string;

  let arrListsEls = [];

  function onListOver(index: number): void {
    targetListIndex = index;
  }

  function resetIndexes(): void {
    draggingListIndex = -1;
    targetListIndex = -1;
    relativeX = -1;
    relativeY = -1;
  }

  function setInitials(node: HTMLDivElement, index: number) {
    let hammertime: HammerManager; // global HammerManager
    arrListsEls.push(node);
    hammertime = new Hammer(node);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("panleft panright panup pandown", (ev: HammerInput) => {
      phHeight = node.offsetHeight;
      if (
        window.innerWidth < ev.center.x ||
        window.innerHeight < ev.center.y ||
        ev.center.x < 0 ||
        ev.center.y < 0
      )
        return;
      if (ev.type == "panleft") dragDirection = "left";
      if (ev.type == "panright") dragDirection = "right";

      node.style.left = `${ev.center.x - relativeX}px`;
      node.style.top = `${ev.center.y + 5}px`;
      if (
        targetListIndex != -1 &&
        targetListIndex != draggingListIndex &&
        checkElementsPosition(
          arrListsEls[draggingListIndex],
          arrListsEls[targetListIndex]
        )
      ) {
        data.lists = changeElPositionByIndex(
          data.lists,
          draggingListIndex,
          targetListIndex
        );
        draggingListIndex = targetListIndex;
        node = arrListsEls[draggingListIndex];
        targetListIndex = -1;
      }
    });

    hammertime.on("panstart", (ev) => {
      draggingListIndex = index;
      [relativeX, relativeY] = [
        ...getRelativePosition(ev.center.x, ev.center.y, node),
      ];
    });

    hammertime.on("panend", () => {
      resetIndexes();
    });
  }
</script>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div class="container" style="background-image: url({data.backgroundImage})">
    <div class="title">{data.title}</div>
    <div class="lists">
      {#each data.lists as list, index (index)}
        <div
          class="lane"
          on:focus
          on:mouseover={() => onListOver(index)}
          on:blur
          on:mouseout={() => (targetListIndex = -1)}
        >
          <div class="list-wrapper">
            {#if draggingListIndex == index}
              <div style="height: {phHeight}px" class="list list-placeholder">
                <div />
              </div>
            {/if}
            <div
              class="list"
              use:setInitials={index}
              class:list-dragging-right={draggingListIndex == index &&
                dragDirection == "right"}
              class:list-dragging-left={draggingListIndex == index &&
                dragDirection == "left"}
            >
              <List data={list} {index} />
            </div>
          </div>
        </div>
      {/each}
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
      align-content: stretch;
      justify-content: start;

      .lane-target {
      }

      .lane:first-child {
        padding-left: 0;
        border-left: 0;
      }

      .lane:last-child {
        padding-right: 0;
        border-right: 0;
      }

      .lane {
        padding: 0.25rem 0.25rem 0 0.25rem;
        height: calc(100% - 0.25rem);

        .list-wrapper {
          height: 100%;

          .list {
            width: 272px;
          }

          .list-placeholder {
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.4);
          }

          .list-dragging-right,
          .list-dragging-left {
            opacity: 0.8;
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;
            position: absolute;
          }

          .list-dragging-right {
            animation-name: toRight;

            @keyframes toRight {
              to {
                transform: rotate(2deg);
              }
            }
          }

          .list-dragging-left {
            animation-name: toLeft;

            @keyframes toLeft {
              to {
                transform: rotate(-2deg);
              }
            }
          }
        }
      }
    }
  }
</style>
