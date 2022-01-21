<script lang="ts">
import type { TOption, TSelectAttributes } from "./types";

// True if the select should select multiple values
export let multiple = false;
// Attributes for the HTML select element. id and name are required
export let selectAttributes: TSelectAttributes;
// All possible options that can be selected
export let options: TOption[];
// The label text for this element
export let label: string;

// Exports the selected value(s) for any modes
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
 * Toggles the dropdown open state.
 */
function toggleOpen() {
  dropdownOpen = !dropdownOpen;
}

// ======= Input handling ======= //

/**
   * Handles when the user uses the keyboard.
   * @param {KeyboardEvent} ev The event emmited by the keyboard.
   */
function handleSelectKeypresses(ev: KeyboardEvent) {
  const { key } = ev;

  switch (key) {
  case "Escape":
    dropdownOpen = false;
    break;

  case "Enter":
  case " ":
    if (dropdownOpen) toggleSelected(options[focused]);
    toggleOpen();
    break;

  case "ArrowDown":
    if (!multiple) {
      toggleSelected(options[Math.min(selectedIndex + 1, options.length - 1)]);
    } else {
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
    } else if (focused < 0) {
      focused = options.length - 1;
    } else {
      focused = Math.max(focused - 1, 0);
    }
    break;
  default:
    break;
  }
}

/**
 * Handles when an option is clicked.
 * @param {TOption} option The option that was clicked.
 */
function handleOptionClick(option: TOption) {
  console.log("çlkasjdfçkasj");
  toggleSelected(option);
  if (!multiple) {
    setTimeout(() => {
      dropdownOpen = false;
    }, 0);
  }
}

</script>

<label class="select-label"
  id="{selectAttributes.id}-label"
  for="{selectAttributes.id}-custom">
  {label}
</label>
<div class="select" role="combobox" tabindex="0"
  on:keydown={handleSelectKeypresses}
  on:click={toggleOpen}
  id="{selectAttributes.id}-custom"
  aria-controls="{selectAttributes.id}-listbox"
  aria-labelledby="{selectAttributes.id}-label"
  aria-haspopup="listbox"
  aria-expanded={dropdownOpen ? "true" : "false"}>

    <!-- Select's box that shows which option is selected -->
    <div class="select-box">
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

    <!-- Dropdown with options to select -->
    <div class="select-menu" role="listbox" tabindex="-1"
      class:hidden={!dropdownOpen}
      id="{selectAttributes.id}-listbox"
      aria-labelledby="{selectAttributes.id}-label">

        <!-- List all options -->
        {#each options as option, i}
          <div class="option" role="option" tabindex="-1"
            class:focused="{i === focused}"
            class:selected="{isOptionSelected(option, selected)}"
            on:click={() => handleOptionClick(option)}>
            {option.text}
          </div>
        {/each}

    </div>

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
