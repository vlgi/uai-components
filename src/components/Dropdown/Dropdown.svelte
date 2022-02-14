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

  /**
   * Set to false to disable auto ajust.
   * This will make the dropdown always visible.
   */
  export let enableAutAdjust = true;

  // Helps throttle the scroll event
  let ticking = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;
  let selectedDropdownAlignment: TPosition;

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

    if (validAlignments.includes(_dropdownAlignment) || !enableAutAdjust) {
      const { top, left } = getDropdownPosition(_dropdownAlignment, triggerRect, dropdownRect);
      selectedDropdownAlignment = _dropdownAlignment;

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
  <div
    class="dropdown dropdown-{selectedDropdownAlignment}"
    bind:this={dropdownElement}
    use:actionOutClick
    on:actionOutClick={close}
  >
    <slot></slot>
  </div>
{/if}

<style lang="scss">
  .dropdown {
    --bg-color: var(--szot-bg-color, white);
    --padding: var(--szot-padding, var(--theme-global-medium-padding));
    --shadow: var(--szot-shadow, var(--theme-low-shadow));
    --border-radius: var(--szot-border-radius, var(--theme-medium-shape));

    // internal variables
    --arrow-size: 0.625rem;

    // Set arrow position based on dropdown position
    &-bottomRight {
      --arrow-top: calc(var(--arrow-size) * -1);
      --arrow-right: calc(var(--arrow-size) * 2);
      --arrow-rotation: 0deg;
      --margin: calc(var(--arrow-size) * .7);
    }
    &-bottomLeft {
      --arrow-top: calc(var(--arrow-size) * -1);
      --arrow-left: calc(var(--arrow-size) * 2);
      --arrow-rotation: 0deg;
      --margin: calc(var(--arrow-size) * .7) calc(var(--arrow-size) * -.7);
    }
    &-topRight {
      --arrow-bottom: calc(var(--arrow-size) * -1);
      --arrow-right: calc(var(--arrow-size) * 2);
      --arrow-rotation: 180deg;
      --margin: calc(var(--arrow-size) * -.7) calc(var(--arrow-size) * .7);
    }
    &-topLeft {
      --arrow-bottom: calc(var(--arrow-size) * -1);
      --arrow-left: calc(var(--arrow-size) * 2);
      --arrow-rotation: 180deg;
      --margin: calc(var(--arrow-size) * -.7);
    }
    &-rightBottom {
      --arrow-left: calc(var(--arrow-size) * -1.4);
      --arrow-bottom: calc(var(--arrow-size) * 2);
      --arrow-rotation: -90deg;
      --margin: calc(var(--arrow-size) * .7) calc(var(--arrow-size) * .4);
    }
    &-rightTop {
      --arrow-left: calc(var(--arrow-size) * -1.4);
      --arrow-top: calc(var(--arrow-size) * 2);
      --arrow-rotation: -90deg;
      --margin: calc(var(--arrow-size) * -.7) calc(var(--arrow-size) * .4);
    }
    &-leftBottom {
      --arrow-right: calc(var(--arrow-size) * -1.4);
      --arrow-bottom: calc(var(--arrow-size) * 2);
      --arrow-rotation: 90deg;
      --margin: calc(var(--arrow-size) * .7) calc(var(--arrow-size) * -.4);
    }
    &-leftTop {
      --arrow-right: calc(var(--arrow-size) * -1.4);
      --arrow-top: calc(var(--arrow-size) * 2);
      --arrow-rotation: 90deg;
      --margin: calc(var(--arrow-size) * -.7) calc(var(--arrow-size) * -.4);
    }

    position: fixed;

    width: fit-content;
    height: fit-content;
    padding: var(--padding);
    filter: drop-shadow(var(--shadow));
    border-radius: var(--border-radius);
    margin: var(--margin);

    background: var(--bg-color);

    // initialize not visible to not conflict with "getValidDropdownAlignments" function
    visibility: hidden;

    // arrow
    &::before {
      content: "";
      display: block;
      position: absolute;

      border-left: solid var(--arrow-size) transparent;
      border-right: solid var(--arrow-size) transparent;
      border-top: solid 0 ;
      border-bottom: solid var(--arrow-size) var(--bg-color);

      top: var(--arrow-top, unset);
      left: var(--arrow-left, unset);
      bottom: var(--arrow-bottom, unset);
      right: var(--arrow-right, unset);

      transform: rotateZ(var(--arrow-rotation));
    }
  }
</style>
