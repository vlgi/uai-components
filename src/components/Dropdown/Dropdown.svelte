<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { TPosition } from "./types";
  import { getDropdownPosition } from "./dropdownPositionHelper";

  export let opened = true;

  // the trigger element (the element must be able to dispatch click, hover events and id unique)
  export let targetId: string;

  // the dropdown position relative to the trigger
  export let dropdownAlignment: TPosition = "bottomRight";

  // Helps throttle the scroll event
  let ticking = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;

  function setDropdownPosition(_dropdownAlignment: TPosition) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const dropdownRect = dropdownElement.getBoundingClientRect();

    console.log(triggerRect, {
      offsetTop: triggerElement.offsetTop,
      offsetLeft: triggerElement.offsetLeft,
    });

    const { left, top } = getDropdownPosition(_dropdownAlignment, triggerRect, dropdownRect);

    // TODOD - verify if the current position is visible

    dropdownElement.style.top = `${top}px`;
    dropdownElement.style.left = `${left}px`;
  }

  /**
   * Throttles the scroll event to avoid creating performance issues.
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
   *
   * param {Event} ev The event object sent by the scroll event.
   */
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setDropdownPosition(dropdownAlignment);
        ticking = false;
      });

      ticking = true;
    }
  }

  function open() {
    opened = true;
  }

  function close() {
    opened = false;
  }

  /**
   * On open, and after dropdown element be mounted, set the initial position.
   * Every time that dropdownAlignment change set the position too
  */
  $: if (dropdownElement) setDropdownPosition(dropdownAlignment);

  // Set this reactive to handle with opened being changed without click on the trigger
  $: if (opened) {
    document.addEventListener("scroll", handleScroll, true);
  } else {
    document.removeEventListener("scroll", handleScroll, true);
  }

  onMount(() => {
    triggerElement = document.querySelector(`#${targetId}`);
    if (!triggerElement) throw new Error(`Trigger element not found with id: ${targetId}`);
    triggerElement.addEventListener("click", open);
  });

  onDestroy(() => {
    close();
    triggerElement.removeEventListener("click", open);
  });
</script>

{#if opened}
  <div class="dropdown" bind:this={dropdownElement}>
    <slot></slot>
  </div>
{/if}

<style lang="scss">
  .dropdown {
    --bg-color: var(--szot-bg-color, red);

    position: fixed;

    width: fit-content;
    height: fit-content;
    padding: var(--theme-global-medium-padding);
    box-shadow: var(--theme-medium-shadow);
    border-radius: var(--theme-medium-shape);

    background: var(--bg-color);
  }
</style>
