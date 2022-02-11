<script context="module">
  const modalContexts = [];
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";

  // don't show the header
  export let disableHeader = false;

  // open and close the modal (make a bind to sync, or use the close Modal event)
  export let opened = false;

  const dispatcher = createEventDispatcher();
  const id = Symbol("my-self");

  function scrolltoggle(disable: boolean) {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    if (disable) {
      // if any scroll is attempted,
      // set this to the previous value
      window.onscroll = () => {
        window.scrollTo(scrollLeft, scrollTop);
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.onscroll = () => {};
    }
  }

  function onOpen() {
    modalContexts.push(id);
    scrolltoggle(true);
  }

  function closeModal() {
    // close if I'm the most external modal
    if (modalContexts[modalContexts.length - 1] === id) {
      modalContexts.pop();
      opened = false;
      dispatcher("closeModal");
    }

    // if is the last modal remove the scroll lock
    if (modalContexts.length === 0) {
      scrolltoggle(false);
    }
  }

  function handleKey(ev: KeyboardEvent) {
    if (ev.key === "Escape") closeModal();
  }

  $: if (opened) {
    onOpen();
  } else {
    closeModal();
  }

  onDestroy(closeModal);
</script>

<svelte:window on:keydown={handleKey}/>

{#if opened }
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-container" on:click|stopPropagation|preventDefault>
      {#if !disableHeader}
        <header class="modal-header">
          <slot name="modal-header"></slot>
          <button class="modal-close" on:click={ closeModal }>&#10006;</button>
        </header>
      {/if}
      <div class="modal-content">
        <slot name="modal-content"></slot>
      </div>
      <div class="modal-footer">
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-overlay {
    --width: var(--szot-width, fit-content);
    --height: var(--szot-height, fit-content);
    --max-height: var(--szot-max-height, calc(100vh - 1.2rem));
    --max-width: var(--szot-max-width, calc(100vw - 1.2rem));
    --overlay-color: var(--szot-overlay-color, #ccc);
    --overlay-blur: var(--szot-overlay-blur, 2px);
    --z-index: var(--szot-z-index, 9999);
    --close-bg-color: var(--szot-close-bg-color, var(--theme-light-surface));
    --close-txt-color: var(--szot-close-txt-color, var(--theme-txt-on-light-surface));

    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: var(--z-index);
    backdrop-filter: blur(var(--overlay-blur));

    &::before {
      content: '';
      display: block;
      position: absolute;
      inset: 0;
      background: var(--overlay-color);
      opacity: 0.2;
      z-index: 1;
    }

    .modal-container {
      display: grid;
      grid: auto 1fr auto / 1fr;
      background: white;

      width: var(--width);
      height: var(--height);
      max-height: var(--max-height);
      max-width: var(--max-width);
      padding: .6rem;

      border-radius: var(--theme-large-shape);
      box-shadow: var(--theme-high-shadow);

      z-index: 2;
    }

    .modal-header {
      display: grid;
      grid-template-columns: 1fr 50px;
      grid-gap: 10px;
      border-radius: 15px 15px 0 0;
      align-items: center;

      button.modal-close {
        grid-column: 2/3;
        justify-self: center;
        align-self: flex-start;
        border: none;
        padding: 0;
        cursor: pointer;
        color: var(--close-txt-color);
        background-color: var(--close-bg-color);
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--theme-small-shape);
        margin-left: auto;
      }
    }

    .modal-content {
      overflow-y: auto;
      margin: .6rem 0;
    }
  }
</style>
