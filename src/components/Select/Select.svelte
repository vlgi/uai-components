<script lang="ts">
import OptionsList from "./OptionsList/OptionsList.svelte";
import SearchInput from "./SearchInput/SearchInput.svelte";
import type { TOption, TSelectAttributes } from "./types";

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
// The HTML element that wraps all of the select components.
let selectBind: HTMLElement;
// The HTML element that wraps all of the select components.
let searchBind: HTMLInputElement;

// The OptionsList component's focus state control functions.
const optionsListBinds: {
  unfocusItems?: ()=> void,
  focusNext?: ()=> void,
  focusPrevious?: ()=> void,
  toggleFocused?: ()=> void,
} = {};

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

// ======= Input handling ======= //

function isAlphanumeric(text: string): boolean {
  return text.length === 1
  && (
    (text[0].toUpperCase() >= "A" && text[0].toUpperCase() <= "Z")
    || (text[0].toUpperCase() >= "0" && text[0].toUpperCase() <= "9")
  );
}

/**
 * Handles when the user uses the keyboard.
 * @param {KeyboardEvent} ev The event emmited by the keyboard.
 */
function handleSelectKeypresses(ev: KeyboardEvent) {
  const { key, target } = ev;

  let shouldPreventPropagation = true;

  switch (key) {
  case "Escape":
    toggleOpen(false);
    break;

  case " ":
    if (target === searchBind) break;
  // eslint-disable-next-line no-fallthrough
  case "Enter":
    if (dropdownOpen) optionsListBinds?.toggleFocused();

    if (!multiple) {
      toggleOpen();
    } else if (!dropdownOpen) {
      toggleOpen(true);
    }
    break;

  case "ArrowDown":
    optionsListBinds?.focusNext();
    break;
  case "ArrowUp":
    optionsListBinds?.focusPrevious();
    break;
  default:
    if (isAlphanumeric(key)) {
      // If not on the search input focus
      if (target !== searchBind) {
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
      break;
    }
    shouldPreventPropagation = false;
    break;
  }

  if (shouldPreventPropagation) {
    ev.stopPropagation();
  }
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

/**
 * Handles when a blur event happens
 * @param {TOption} option The option that was clicked.
 */
function handleBlur(ev: FocusEvent) {
  const newFocus = ev.relatedTarget as HTMLElement;
  if (!selectBind.contains(newFocus)) {
    toggleOpen(false);
  }
}

$: selectedSingle = Array.isArray(selected) ? null : selected;
$: selectedMultiple = Array.isArray(selected) ? selected : [];

</script>

<div class="select" tabindex="0"
  bind:this={selectBind}
  on:focusout={handleBlur}
  on:keydown={handleSelectKeypresses}>

    <!-- Floating label for the select -->
    <label class="select-label"
      id="{selectAttributes.id}-label"
      for="{selectAttributes.id}-custom">
      {label}
    </label>

    <!-- Select's box that shows which option is selected -->
    <div class="select-box" role="combobox" tabindex="-1"
      on:click={() => toggleOpen()}
      id="{selectAttributes.id}-custom"
      aria-controls="{selectAttributes.id}-listbox"
      aria-labelledby="{selectAttributes.id}-label"
      aria-haspopup="listbox"
      aria-expanded={dropdownOpen ? "true" : "false"}>

      {#if !selected || selectedMultiple.length <= 0}
        Selecione
      {:else if multiple}
        {#each selectedMultiple as option}
          <span class="badge">{option.text}</span>
        {/each}
      {:else}
        {selectedSingle ? selectedSingle.text : ""}
      {/if}

    </div>

    <!-- Floating box with extra related data -->
    <div class="dropdown-menu" class:hidden={!dropdownOpen}>

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
</div>


<style>
  .hidden {
    display: none;
  }
  .badge {
    margin: 0.25rem;
  }
</style>
