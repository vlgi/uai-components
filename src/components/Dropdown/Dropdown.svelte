<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { TPosition } from "./types";
  import { actionOutClick } from "../../actions/clickOutside/clickOutside";
  import {
    getDropdownPosition,
    getValidDropdownAlignments,
    getBestValidAlignment,
  } from "./dropdownPositionHelper";

  export let opened = false;

  // the trigger element (the element must be able to dispatch click, hover events and id unique)
  export let targetId: string;

  // the dropdown position relative to the trigger
  export let dropdownAlignment: TPosition = "bottomRight";

  // Helps throttle the scroll event
  let ticking = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;

  function open() {
    opened = true;
  }

  function close() {
    opened = false;
  }

  function setDropdownPosition(_dropdownAlignment: TPosition, count = 0) {
    const triggerRect = triggerElement.getBoundingClientRect();
    const dropdownRect = dropdownElement.getBoundingClientRect();

    const validAlignments = getValidDropdownAlignments(
      triggerElement,
      dropdownRect,
    );

    if (count > 1) throw new Error("Infinit loop at setDropdownPosition");

    if (validAlignments.includes(_dropdownAlignment)) {
      const { top, left } = getDropdownPosition(_dropdownAlignment, triggerRect, dropdownRect);

      // initialize not visible to not conflict with "getValidDropdownAlignments" function
      dropdownElement.style.visibility = "visible";
      dropdownElement.style.top = `${top}px`;
      dropdownElement.style.left = `${left}px`;
    } else if (validAlignments.length > 0) {
      const betterAlignment = getBestValidAlignment(_dropdownAlignment, validAlignments);
      setDropdownPosition(betterAlignment, count + 1);
    } else {
      // if there's no valid position, make the dropdown invisible
      dropdownElement.style.visibility = "hidden";
    }
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
  <div class="dropdown" bind:this={dropdownElement} use:actionOutClick on:actionOutClick={close}>
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

    // initialize not visible to not conflict with "getValidDropdownAlignments" function
    visibility: hidden;
  }
</style>
