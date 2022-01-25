<script lang="ts">
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

// Type casts the selected as TOption for internal use
let selectedSingle: TOption = null;
$: selectedSingle = selected as TOption;

// Type casts the selected as array for internal use
let selectedMultiple: TOption[] = [];
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
$: selectedMultiple = selected as TOption[];

// Auxiliary variable for holding the index of the selected element
let selectedIndex = -1;
$: selectedIndex = options.indexOf(selected as TOption);

// ====== Internal control ====== //

// Controls the visibility of the dropdown
let dropdownOpen = false;
// Index of the focused option. More useful for multiple select.
let focused = -1;
// The HTML element that wraps all of the select components.
let selectBind: HTMLElement;
// The HTML element that wraps all of the select components.
let searchBind: HTMLInputElement;

// Function to force focus on the search input.
let focusSearch: ()=> void;

// The searched text
let searchQuery: string;
// The results of the search
let filteredOptions: TOption[];

/**
 Toggles the selected state for the option passed. Sets selection to option if single select.
 * @param {TOption} option The option to toggle selected state or set as selected.
*/
function toggleSelected(option: TOption) {
  if (multiple) {
    const index = (selected as TOption[]).indexOf(option);
    if (index === -1) {
      selected = [...(selected as TOption[]), option];
    } else {
      selected = [
        ...(selected as TOption[]).slice(0, index),
        ...(selected as TOption[]).slice(index + 1),
      ];
    }
  } else {
    selected = option;
    focused = options.indexOf(selected);
  }
}

/**
 * Tests if the option is selected.
 * @param {TOption} option The option being tested.
 * @param {TOption | TOption[]} _selected The current selection of items.
 * @returns {boolean} Whether the option is selected or not.
*/
function isOptionSelected(option: TOption, _selected: TOption | TOption[]) {
  if (multiple) return (_selected as TOption[]).includes(option);
  return (_selected as TOption) === option;
}

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
    focused = -1;
  }
}

// ======= Input handling ======= //

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
    if (dropdownOpen) toggleSelected(options[focused]);

    if (!multiple) {
      toggleOpen();
    } else if (!dropdownOpen) {
      toggleOpen(true);
    }
    break;

  case "ArrowDown":
    if (!multiple) {
      toggleSelected(options[Math.min(selectedIndex + 1, options.length - 1)]);
    } else if (dropdownOpen) {
      focused = Math.min(focused + 1, options.length - 1);
    }
    break;
  case "ArrowUp":
    if (!multiple) {
      if (selectedIndex < 0) {
        toggleSelected(options[options.length - 1]);
      } else {
        toggleSelected(options[Math.max(selectedIndex - 1, 0)]);
      }
    } else if (dropdownOpen) {
      if (focused < 0) {
        focused = options.length - 1;
      } else {
        focused = Math.max(focused - 1, 0);
      }
    }
    break;
  default:
    if (key.toUpperCase() >= "A" && key.toUpperCase() <= "Z") {
      if (target !== searchBind) {
        toggleOpen(true);
        setTimeout(() => {
          focused = 0;
          searchQuery = key;
          focusSearch();
        }, 0);
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
 * Handles when an option is clicked.
 * @param {TOption} option The option that was clicked.
 */
function handleOptionClick(option: TOption) {
  toggleSelected(option);
  if (!multiple) {
    toggleOpen(false);
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

    {#if dropdownOpen}
      <!-- Floating box with extra related data -->
      <div class="dropdown-menu">

        <!-- Search input -->
        <SearchInput
          searchable={["text"]}
          items={options}
          bind:searchQuery
          bind:filtered={filteredOptions}
          bind:focus={focusSearch}
          bind:inputBind={searchBind}/>

        <!-- List of all selectable options -->
        <div class="select-menu" role="listbox" tabindex="-1"
          id="{selectAttributes.id}-listbox"
          aria-labelledby="{selectAttributes.id}-label">

            <!-- List all options -->
            {#each options as option, i}
              <div class="select-option" role="option" tabindex="-1"
                class:focused="{i === focused}"
                class:selected="{isOptionSelected(option, selected)}"
                on:click={() => handleOptionClick(option)}>
                {option.text}
              </div>
            {/each}

        </div>

      </div>
    {/if}

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
  .selected {
    background-color: #ddd;
  }
  .focused {
    border: 2px solid red;
  }
  .badge {
    margin: 0.25rem;
  }
</style>
