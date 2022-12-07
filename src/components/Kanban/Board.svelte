<script lang="ts">
  import type { TBoard } from "./board-data";

  import {
    getMousePosition,
    changeElementPosition,
    getMouseDirection,
    switchElsPositionByIndex,
    checkElementsPosition,
    getRelativePosition,
  } from "./utils";

  export let data: TBoard;

  let type = ""; // dragging element type
  let pos = { x: 0, y: 0 }; // mouse position
  let di = -1; // dragging element index
  let pi = -1; // dragging element parent index
  let ti = -1; // target element index
  let pti = -1; // parent target index
  let phh = 80; // dragging element placeholder height
  let phw = "100%"; // dragging element placeholder width
  let el: Element; // dragging html element
  let tEl: Element; // target html element
  let relPos = { x: 0, y: 0 }; // relative element mouse position
  let dir: string; // dragging direction

  // checks if target list is empty
  $: isTargetListEmpty = data?.lists[pti]?.cards.length > 0 ? false : true;

  // checks card changing position conditions in a empty list
  $: checkEmptyList = isTargetListEmpty && ti == -1 && pti != -1;

  // checks card changing position conditions in a populated list
  $: checkPopulatedList = ti != -1 && checkElementsPosition(el, tEl);

  // condition for card positions to be modified
  $: canCardPosBeChanged =
    type == "card" && pi != -1 && (checkEmptyList || checkPopulatedList);

  // condition for lists positions to be modified
  $: canListPosBeChanged =
    type == "list" && ti != -1 && ti != di && checkElementsPosition(el, tEl);

  $: console.log(data ? data : "nada");

  function printStuff(nameFun) {
    console.log("- - - - - - - - - - -");
    console.log(nameFun);
    console.log("- - - - - - - - - - -");
    console.log(`type:`, type);
    console.log(`di:`, di);
    console.log(`ti:`, ti);
    console.log(`pti:`, pti);
    console.log(`pi:`, pi);
    console.log(`phh:`, phh);
    console.log(`phw:`, phw);
    console.log(`el:`, el);
    console.log(`tEl:`, tEl);
  }

  // set values on card over (card-space over)
  function onCardOver(e, i: number, pIndex: number): void {
    if (di != -1 && pi != pti) {
      if (type == "card") ti = i;
      if (type == "card") tEl = e.target;
    }
  }

  // set values on list over (lane over)
  function onListOver(e, i: number): void {
    if (di != -1 && pi != i) {
      if (type == "card" && pti != i) pti = i;
      if (type == "list") ti = i;
      if (type == "list") tEl = e.target;
      if (isTargetListEmpty && type == "card") ti = -1;
    }
  }

  // reset all variables to initial state
  function reset(): void {
    [di, ti, pi, pti, phw, relPos] = [-1, -1, -1, -1, "100%", { x: 0, y: 0 }];
  }

  // get drag element values
  function getDragElement(e, i: number, pIndex: number, t: string): void {
    [type, di, el, dir, phh] = [t, i, e.target, "right", e.target.clientHeight];
    if (pIndex > -1) pi = pIndex;
    relPos = getRelativePosition(e.clientX, e.clientY, el);
    if (type == "card") phw = `${el.clientWidth}px`;
    changeElementPosition(e, el, { x: relPos.x, y: 10 });
  }

  // move mouse/element listener and change position
  function moveEl(e): void {
    pos = getMousePosition(e);
    if (di != -1 && el) {
      dir = getMouseDirection(e);
      changeElementPosition(e, el, { x: relPos.x, y: 10 });
      changeData();
    }
  }

  // change cards data (order and list parent)
  function changeCards(): void {
    const card = data.lists[pi].cards[di];
    const targetIndex = pti != -1 ? pti : pi;
    const targetList = data.lists[targetIndex].cards;
    if (pti != -1 && !isTargetListEmpty) {
      // different lists already populated
      targetList.splice(ti, 0, card);
      data.lists[pi].cards.splice(di, 1);
      data.lists[targetIndex].cards = [...targetList];
    } else if (pti == -1 && ti != -1) {
      // same list
      data.lists[pi].cards = switchElsPositionByIndex(targetList, di, ti);
    } else if (ti == -1) {
      // empty list
      data.lists[targetIndex].cards = [card];
    }
    el = document.getElementById(`${type}-${ti}-${targetIndex}`);
    [di, ti, pi, pti] = [ti, -1, targetIndex, -1];
  }

  // change lists data (order)
  function changeLists(): void {
    data.lists = switchElsPositionByIndex(data.lists, di, ti);
    tEl.classList.add(`to-${dir}`);
    el = document.getElementById(`${type}-${ti}`);
    [di, ti] = [ti, -1];
  }

  function changeData(): void {
    if (canListPosBeChanged) changeLists();
    if (canCardPosBeChanged) changeCards();
  }
</script>

{#if !data}<div class="loading">loading...</div>
{:else}
  <div
    class="board-container"
    style="background-image: url({data.backgroundImage})"
    on:mouseup={reset}
  >
    <div class="board-header">
      <input class="board-title editable" bind:value={data.title} />
    </div>
    <div class="board-lists" on:mousemove={moveEl} on:blur>
      {#each data.lists as list, li (li)}
        <div
          class="lane lane-{li}"
          on:focus
          on:mouseover|self={(e) => onListOver(e, li)}
          on:blur
          on:mouseout={() => (ti = -1)}
        >
          <div class="list-wrapper">
            {#if di == li && type == "list"}
              <div style="height: {phh}px" class="list-placeholder">
                <div />
              </div>
            {/if}
            <div
              class="list"
              id="list-{li}"
              on:mousedown|self={(e) => getDragElement(e, li, -1, "list")}
              class:to-right={di == li && dir == "right" && type == "list"}
              class:to-left={di == li && dir == "left" && type == "list"}
            >
              <div class="list-header">
                <input class="list-title editable" bind:value={list.title} />
              </div>
              <div class="list-cards">
                {#each list.cards as card, ci}
                  <div
                    class="card-space card-list-{li} card-space-{ci}"
                    on:focus
                    on:mouseover|self={(e) => onCardOver(e, ci, li)}
                    on:blur
                    on:mouseout={() => (ti = -1)}
                  >
                    <div class="card-wrapper">
                      {#if di == ci && pi == li && type == "card"}
                        <div class="card-placeholder" style="height: {phh}px" />
                      {/if}
                      <div
                        class="card"
                        id="card-{ci}-{li}"
                        style="width: {phw}"
                        class:to-right={di == ci &&
                          dir == "right" &&
                          type == "card" &&
                          pi == li}
                        class:to-left={di == ci &&
                          dir == "left" &&
                          type == "card" &&
                          pi == li}
                        on:mousedown|self={(e) =>
                          getDragElement(e, ci, li, "card")}
                      >
                        {card.title}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
              <div class="list-footer">Bottom</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .loading,
  .board-container {
    display: flex;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .loading {
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background: white;
  }

  .board-container {
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

    .board-title,
    .board-lists {
      padding: 1rem;
    }

    .editable {
      cursor: pointer;
      outline: none;
      padding: 0;
      background: none;
      border: none;
      border-radius: 5px;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      padding: 1rem;
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;

      &:focus {
        border-radius: 5px;
        background: rgba(236, 235, 213, 0.8) !important;
        color: darkblue !important;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.3) !important;
      }
    }

    .board-header {
      .board-title {
        width: fit-content;
        // background: red;
        font-weight: bold;
        font-size: 2rem;
        padding: 1rem;
        color: var(--szot-board-title-color);
      }
    }

    .board-lists {
      display: grid;
      grid-template-rows: 100%; /* changed */
      justify-content: start;
      gap: 2rem;
      grid-auto-flow: column;
      // background-color: pink;
      max-height: fit-content;
      overflow-x: auto;

      .lane:first-child {
        padding-left: 0;
        border-left: 0;
      }

      .lane:last-child {
        padding-right: 0;
        border-right: 0;
      }

      .lane {
        display: grid;
        grid-template-rows: 100%; /* changed */
        padding: 2rem 2rem 0 2rem;
        background-color: lightcoral;
        border-radius: 5px;

        .list-wrapper {
          display: grid;
          grid-template-rows: 100%; /* changed */
          background-color: red;
          border-radius: 5px;

          .list,
          .list-placeholder {
            align-self: stretch;
            width: 272px;
            padding-top: 0.5rem;
            border-radius: 5px;
            position: static;
          }

          .list-placeholder {
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.4);
          }

          .list {
            display: grid;
            align-content: start;
            background-color: rgba(20, 20, 20, 0.3);
            cursor: grab;
            bottom: 0;
            background-color: var(--szot-list-background-color);
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
              rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            border-radius: 5px;
            background-color: blue;
            border-radius: 5px;

            .list-header,
            .list-footer {
              &:hover {
                cursor: pointer;
              }
            }

            .list-header {
              top: 0;
              padding: 2rem;
              .list-title {
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--szot-list-title-color);
                background-color: lightblue;
              }
            }

            .list-footer {
              height: fit-content;
              background-color: purple;
              color: white;
              border-radius: 5px;
              bottom: 0;
            }

            .list-cards {
              display: grid;
              gap: 0.5rem;
              padding: 0 0.5rem 0.5rem 0.5rem;
              align-content: start;
              overflow-y: auto;

              .card-space {
                flex-direction: column;
                padding: 2rem;
                background-color: greenyellow;

                .card-wrapper {
                  background-color: red;
                  .card,
                  .card-placeholder {
                    border-radius: 5px;
                  }

                  .card-placeholder {
                    background-color: rgba(0, 0, 0, 0.4);
                  }

                  .card {
                    padding: top;
                    background-color: lightseagreen;
                    height: 150px;
                    cursor: pointer;
                    padding: 5px 8px;
                    width: 100%;

                    span {
                      color: white;
                      font-weight: bold;
                    }

                    &:hover {
                      opacity: 0.8;
                    }
                  }
                }
              }
            }
          }

          .to-right,
          .to-left {
            opacity: 0.8;
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease;
            position: absolute;
            cursor: grabbing;
            height: auto;
          }

          .to-right {
            animation-name: toRight;

            @keyframes toRight {
              to {
                transform: rotate(2deg);
              }
            }
          }

          .to-left {
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
