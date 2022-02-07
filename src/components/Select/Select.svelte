<script lang="ts">
import OptionsList from "./OptionsList/OptionsList.svelte";
import SearchInput from "./SearchInput/SearchInput.svelte";
import { keyboardControls } from "./keyboardControls/actionKeyboardControls";
import type { TOption, TOptionsListBinds, TSelectAttributes } from "./types";

// True if the select should select multiple values
export let multiple = false;
// Attributes for the HTML select element. id and name are required
export let selectAttributes: TSelectAttributes;
// All possible options that can be selected
export let options: TOption[];
// The label text for this element
export let label: string;

// The selected value(s) for any select mode
export let selected: TOption | TOption[] | null = multiple ? [] : null;

// ====== Internal control ====== //

// Type casts the selected as TOption for internal use
let selectedSingle: TOption;
// Type casts the selected as array for internal use
let selectedMultiple: TOption[];

// Controls the visibility of the dropdown
let dropdownOpen = false;
// Index of the focused option. Used for keyboard navigation.
let focused = -1;
// The HTML input element used for the search.
let searchBind: HTMLInputElement;

// The OptionsList component's focus state control functions.
const optionsListBinds: TOptionsListBinds = {};

// Function to force focus on the search input.
let focusSearch: ()=> void;

// The searched text
let searchQuery: string;
// The results of the search
let filteredOptions: TOption[];

/**
 * Toggles or sets the dropdown open state.
 * @param {boolean} open Whether or not it should be open. If nullish it will
 *                       just change the value.
 */
function toggleOpen(open?: boolean) {
  const lastState = dropdownOpen;
  if (open !== undefined && open !== null) {
    dropdownOpen = open;
  } else {
    dropdownOpen = !dropdownOpen;
  }

  // If it changed state to opened
  if (lastState !== dropdownOpen && dropdownOpen) {
    optionsListBinds?.unfocusItems();
  }
}

/**
 * Tests if there is something selected on the input
 * @param {TOption | TOption[]} _selected the selected item or items.
 */
function isFilled(_selected: TOption | TOption[]) {
  if (Array.isArray(_selected)) {
    return _selected.length > 0;
  }
  return _selected !== null && _selected !== undefined;
}

/**
 * Handles when the selected changes.
 */
function handleSelectedChange() {
  if (!multiple) {
    toggleOpen(false);
    searchQuery = "";
  }
}

function handleTyping(ev: CustomEvent<string>) {
  const key = ev.detail;

  // If not on the search input focus
  if (document.activeElement !== searchBind) {
    // Opens the dropdown and focus on the search input
    toggleOpen(true);
    setTimeout(() => {
      focusSearch();
      searchQuery = key;
      focused = 0; // Selects the first search result
    }, 0);
  } else {
    // Selects the first search result when typing on the search input
    focused = 0;
  }
}
function handleToggleDropdown(ev: CustomEvent<boolean | undefined>) {
  toggleOpen(ev.detail);
}
function handleBadgeRemoval(ev: MouseEvent, option: TOption) {
  const remove = selectedMultiple.indexOf(option);
  selected = [
    ...selectedMultiple.slice(0, remove),
    ...selectedMultiple.slice(remove + 1),
  ];
  ev.stopPropagation();
  ev.preventDefault();
}

$: selectedSingle = Array.isArray(selected) ? null : selected;
$: selectedMultiple = Array.isArray(selected) ? selected : [];

</script>

<div class="select" tabindex="0"
  use:keyboardControls={{ multiple, dropdownOpen }}
  on:actionToggleFocused={() => optionsListBinds?.toggleFocused()}
  on:actionFocusPrevious={() => optionsListBinds?.focusPrevious()}
  on:actionFocusNext={() => optionsListBinds?.focusNext()}
  on:actionToggleDropdown={handleToggleDropdown}
  on:actionType={handleTyping}>

    <!-- Floating label for the select -->
    <label class="select-label"
      id="{selectAttributes.id}-label"
      for="{selectAttributes.id}-custom"
      on:click={() => toggleOpen()}
      class:floated={dropdownOpen || isFilled(selected)}>
      {label}
    </label>

    <!-- Select's box that shows which option is selected -->
    <div class="select-box" role="combobox" tabindex="-1"
      class:selected-multiple={multiple && isFilled(selected)}
      on:click={() => toggleOpen()}
      id="{selectAttributes.id}-custom"
      aria-controls="{selectAttributes.id}-listbox"
      aria-labelledby="{selectAttributes.id}-label"
      aria-haspopup="listbox"
      aria-expanded={dropdownOpen ? "true" : "false"}>

      {#if multiple && selectedMultiple.length > 0}
        {#each selectedMultiple as option}
          <span class="badge" on:click|preventDefault|stopPropagation>
            {option.text} <span on:click={(ev) => handleBadgeRemoval(ev, option)}>&times;</span>
          </span>
        {/each}
      {:else if !multiple && selectedSingle}
        {selectedSingle ? selectedSingle.text : ""}
      {:else}
        Selecione
      {/if}

    </div>

    <!-- Floating box with extra related data -->
    <div class="select-dropdown-menu" class:closed={!dropdownOpen}>

      <!-- Search input -->
      <SearchInput
        searchable={["text"]}
        items={options}
        bind:searchQuery
        bind:filtered={filteredOptions}
        bind:focus={focusSearch}
        bind:inputBind={searchBind}/>

      <!-- List of all selectable options -->
      <OptionsList
        id="{selectAttributes.id}-listbox"
        labelledBy="{selectAttributes.id}-label"
        options={filteredOptions}
        on:changeSelected={handleSelectedChange}
        bind:selected
        bind:focused
        bind:unfocusItems={optionsListBinds.unfocusItems}
        bind:focusNext={optionsListBinds.focusNext}
        bind:focusPrevious={optionsListBinds.focusPrevious}
        bind:toggleFocused={optionsListBinds.toggleFocused}
        />

    </div>

    <!-- For form compatibility -->
    <select class="hidden"
      {...selectAttributes}
      disabled
      {multiple}
      value={selected}>
      {#each options as option}
        <option value={option}>
          {option.text}
        </option>
      {/each}
    </select>

    <div class="select-arrow" class:flipped={dropdownOpen}
      on:click={() => toggleOpen()}>
      <div class="select-arrow-aux"></div>
    </div>
</div>


<style lang="scss">
  .hidden {
    display: none;
  }
  .badge {
    display: inline-block;
    font-size: 0.875rem;
    border: 1px solid var(--theme-fields-outline);
    border-radius: 25px;
    padding: 1px 5px;
    margin: 0.25rem;
    span {
      font-size: 1.3em;
      line-height: 0.875rem;
      vertical-align: -10%;
      cursor: pointer;
    }
  }

  .select {

    --component-background-color: var(--szot-background-color, white);
    --component-padding-vertical: 0.6875rem;
    --component-padding-horizontal: 1rem;
    --component-border-radius: var(--szot-border-radius, 1.5625rem);

    position: relative;

    background-color: var(--component-background-color);
    color: var(--theme-dark-txt);

    border: 0.0625rem solid var(--theme-fields-outline);
    border-radius: var(--component-border-radius);


    &-label {
      position: absolute;
      top: var(--component-padding-vertical);
      left: var(--component-padding-horizontal);
      background-color: var(--component-background-color);

      transform-origin: 0 30%;

      transition: top 200ms, transform 200ms;
      &.floated {
        top: -0.7em;
        transform: scale(0.8);
      }
    }

    &-box {
      border-radius: var(--component-border-radius);
      padding: var(--component-padding-vertical) var(--component-padding-horizontal);

      cursor: pointer;

      &.selected-multiple {
        padding: calc(0.6 * var(--component-padding-vertical)) calc(0.6 * var(--component-padding-horizontal));
      }
    }

    &-dropdown-menu {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--component-padding-vertical);

      overflow: hidden;
      max-height: 10rem;

      border-radius: 0 0 var(--component-border-radius) var(--component-border-radius);
      padding: 0 var(--component-padding-horizontal);

      transition: max-height 200ms, padding 200ms;
      &.closed {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &-arrow {
      --component-arrow-size: 0.5rem;
      width: var(--component-arrow-size);
      height: var(--component-arrow-size);

      position: absolute;

      top: calc(var(--component-padding-vertical) + calc(1rem - var(--component-arrow-size)) / 2);
      right: var(--component-padding-horizontal);

      transition: transform 200ms;
      transform-origin: 50% 75%;
      &.flipped {
        transform: rotate(180deg);
      }
      &-aux{
        width: var(--component-arrow-size);
        height: var(--component-arrow-size);

        transform: rotate(45deg);

        &::before, &::after {
          content: '';
          display: block;
          position: absolute;
          background-color: var(--theme-fields-outline);
        }

        &::before {
          width: 100%;
          height: 0.1rem;
          bottom: 0;
        }
        &::after {
          width: 0.1rem;
          height: 100%;
          right: 0;
        }
      }

    }
  }
</style>
