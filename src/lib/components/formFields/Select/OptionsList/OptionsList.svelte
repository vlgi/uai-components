<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { infiniteScroll } from "../infiniteScroll/actionInfiniteScroll";

  import type { TOption } from "../types";

  // Dispatches this component's events.
  const dispatch = createEventDispatcher();

  /**
   * The id of the listbox.
   * @type {string}
   */
  export let id: string;
  /**
   * The id of the label referent to the listbox.
   * @type {string}
   */
  export let labelledBy: string;

  /**
   * Options to be displayed.
   * @type {array}
   */
  export let options: TOption[];
  /**
   * Options elements references
   */
  const optionsBinds: HTMLElement[] = [];
  /**
   * Selected options.
   * @type {object}
   */
  export let selected: TOption | TOption[];

  /**
   * The index of the option that is selected
   */
  export let focused = -1;

  /**
   * The number of items loaded each time the list is scrolled to the bottom.
   */
  export let infiniteScrollStep = 10;
  /**
   * The number of items loaded when the component mounts.
   */
  export let infiniteScrollInitialCount = 10;

  /**
   * if true, disable the handleLoadMore function. Used to fix number of
   * elements displayed
   */
  export let disableLoadMore = false;

  /**
   * if true, hide list of options
   */
  export let hideOptions = false;

  /**
   * The number of items shown on the list.
   */
  let shownUpperLimit = infiniteScrollInitialCount;

  /**
   * Tests if the option is selected.
   * @param {TOption} option The option being tested.
   * @param {TOption | TOption[]} _selected The current selection of items.
   * @returns {boolean} Whether the option is selected or not.
   */
  function isOptionSelected(option: TOption, _selected: TOption | TOption[]) {
    if (Array.isArray(_selected)) return _selected.includes(option);
    return _selected === option;
  }

  // ======= Selected management ======= //

  /**
 Toggles the selected state for the option passed. Sets selection to option if single select.
 * @param {TOption} option The option to toggle selected state or set as selected.
*/
  function toggleSelected(option: TOption) {
    if (Array.isArray(selected)) {
      // If multiple select mode

      const index = selected.indexOf(option);
      if (index === -1) {
        // Add the option as selected if not already selected
        selected = [...selected, option];
      } else {
        // Remove the option if it is already selected
        selected = [...selected.slice(0, index), ...selected.slice(index + 1)];
      }
    } else {
      // If single select mode just always set as selected
      selected = option;
    }

    // Fired when the selected options change
    dispatch("changeSelected", option);
  }

  // ======= Focused management ======= //

  /**
   * Set focus to no options.
   */
  export const unfocusItems = (): void => {
    focused = -1;
  };

  /**
   * Set focus to the next index in the options list.
   */
  export const focusNext = (): void => {
    focused = Math.min(focused + 1, options.length - 1);
  };

  /**
   * Set focus to the previous index in the options list.
   */
  export const focusPrevious = (): void => {
    if (focused < 0) {
      focused = options.length - 1;
    } else {
      focused = Math.max(focused - 1, 0);
    }
  };

  /**
   * Toggles the currently focused option select state
   */
  export const toggleSelectedOfFocused = (): void => {
    if (focused >= 0 && focused < options.length) {
      toggleSelected(options[focused]);
    }
  };

  // ======= Infinite scroll management ======= //

  /**
   * Handles when the infinite scroll requests to load more items on the list
   */
  function handleLoadMore() {
    if (!disableLoadMore) {
      shownUpperLimit += infiniteScrollStep;
    }
  }

  $: if (focused >= 0 && focused < options.length) {
    if (!optionsBinds[focused]) {
      handleLoadMore();
    }
    setTimeout(() => {
      optionsBinds[focused].scrollIntoView({ block: "nearest", inline: "start" });
    }, 0);
  }

  // Resets the infinite scroll if the options change
  $: if (options) {
    shownUpperLimit = infiniteScrollInitialCount;
  }
</script>

<div
  class="select-menu"
  role="listbox"
  tabindex="-1"
  {id}
  aria-labelledby={labelledBy}
  use:infiniteScroll={{ distFromBottom: 30 }}
  on:actionLoadMore={handleLoadMore}
>
  <!-- List all options -->
  {#if options && !hideOptions}
    {#each options.slice(0, shownUpperLimit) as option, i}
      <div
        class="select-option"
        role="option"
        aria-selected={isOptionSelected(option, selected) ? "true" : "false"}
        tabindex="-1"
        bind:this={optionsBinds[i]}
        class:focused={i === focused}
        class:selected={isOptionSelected(option, selected)}
        on:click={() => {
          toggleSelected(option);
          focused = -1;
        }}
        on:keypress={(e) => {
          if (e.key === "Enter") {
            toggleSelected(option);
            focused = -1;
          }
        }}
      >
        <div class="text">
          {option.text}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use "$styles/mixins" as m;

  .select {
    &-menu {
      overflow-y: auto;
      overflow-x: hidden;
      :global() {
        --uai-scroll-bar-color: var(--component-color);
        --uai-scroll-bar-hover-color: var(--component-color);
        --uai-scroll-background-color: transparent;
      }
    }

    &-option {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0.25rem;
      padding: 0.15rem 0.5rem;
      border-radius: var(--theme-small-shape);
      cursor: pointer;
      transition: background-color 200ms;

      .text {
        @include m.text-color(var(--uai-select-text-color, var(--theme-dark-txt)));
      }

      &.selected {
        .text {
          @include m.text-color(var(--uai-select-text-color, var(--theme-dark-txt)));
          opacity: 0.5;
        }
      }

      &.focused,
      &:hover {
        background: var(--uai-optionsList-focused-color, #f2f2f2);
      }
    }
  }
</style>
