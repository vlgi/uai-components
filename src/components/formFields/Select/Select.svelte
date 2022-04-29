<script lang="ts">
import {
  onMount, getContext, hasContext, onDestroy,
} from "svelte";
import type { TFormContext } from "../../Form/types";

import OptionsList from "./OptionsList/OptionsList.svelte";
import SearchInput from "./SearchInput/SearchInput.svelte";
import Badge from "../../Badge/Badge.svelte";
import { keyboardControls } from "./keyboardControls/actionKeyboardControls";
import type { TOption, TOptionsListBinds } from "./types";
import type { TbadgeStyle } from "../../Badge/types";

// True if the select should select multiple values
export let multiple = false;
// Whether the field needs to have at least `min` value
export let required = false;
/**
 * If the select is multiple and required, it defines the minimum quantity
 * that needs to be selected for the select to be valid.
 */
export let min = 1;
// Whether the field has a valid value
export let isValid = true;
// Whether the field should show as invalid
export let forceInvalid = false;
/**
 * id attribute for the HTML select element
 * @type {string}
 */
export let id: string;
/**
 * name attribute for the HTML select element
 * @type {string}
 */
export let name: string;
// Attributes for the HTML select element
export let selectAttributes: Record<string, string> = {};
/**
 * All possible options that can be selected
 * @type {array}
 */
export let options: TOption[];
/**
 * The label text for this element
 * @type {string}
 */
export let label: string;

// The selected value(s) for any select mode
export let selected: TOption | TOption[] | null = multiple ? [] : null;

// At the multiple select, this will set the badge style
export let badgeStyle: TbadgeStyle = "outline";

type TSelectBorders = "bottom" | "outline";
/**
 * Choose border type of the select component.
 */
export let selectBorder: TSelectBorders = "outline";

type TSelectStyle = "primary" | "secondary" | "dark" | "light";

/**
 * Choose one of the theme styles.
 */
export let selectStyle: TSelectStyle = "dark";

// ====== Internal control ====== //

// Type casts the selected as TOption for internal use
let selectedSingle: TOption;
// Type casts the selected as array for internal use
let selectedMultiple: TOption[];

// Controls if the select should style as invalid
let isVisuallyValid = true;

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

let wrapperElement: HTMLElement;

const isInsideContext = hasContext("FormContext");
const {
  setFieldValue,
  addFieldToContext,
  removeFieldFromContext,
} = isInsideContext && getContext<TFormContext>("FormContext");

function validate() {
  isValid = true;
  if (forceInvalid) {
    isValid = false;
  } else if (required) {
    if (multiple) {
      isValid = Array.isArray(selected) && selected.length >= min;
    } else {
      isValid = selected !== null && selected !== undefined;
    }
  }

  isVisuallyValid = isValid;
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
    optionsListBinds?.unfocusItems();
  }

  // If it changed state to closed
  if (lastState !== dropdownOpen && !dropdownOpen) {
    validate();
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

// function to form context force input value
function forceValue(_value: unknown) {
  selected = _value as TOption | TOption[] | null;
}

$: if (forceInvalid) validate();
$: selectedSingle = Array.isArray(selected) ? null : selected;
$: selectedMultiple = Array.isArray(selected) ? selected : [];

// run only after mounted, because setFieldValue, must become after addFieldToContext
$: if (wrapperElement && isInsideContext) {
  setFieldValue(name, selected, isValid);
}

onMount(() => {
  if (isInsideContext) {
    addFieldToContext(name, selected, isValid, required, wrapperElement, validate, forceValue);
  }
});

onDestroy(() => {
  if (isInsideContext) {
    removeFieldFromContext(name);
  }
});
</script>

<div class="select-wrapper" bind:this={wrapperElement}>
  <div class="select border-{selectBorder} style-{selectStyle}" tabindex="0"
    class:error={!isVisuallyValid}
    use:keyboardControls={{ multiple, dropdownOpen }}
    on:actiontoggleSelectedOfFocused={optionsListBinds.toggleSelectedOfFocused}
    on:actionFocusPrevious={optionsListBinds.focusPrevious}
    on:actionFocusNext={optionsListBinds.focusNext}
    on:actionToggleDropdown={handleToggleDropdown}
    on:actionType={handleTyping}
  >

      <!-- Floating label for the select -->
      <label class="select-label"
        id="{id}-label"
        for="{id}-custom"
        on:click={() => toggleOpen()}
        class:floated={dropdownOpen || isFilled(selected)}>
        <div class="label-text">
          {label}
        </div>
      </label>

      <!-- Select's box that shows which option is selected -->
      <div class="select-box" role="combobox" tabindex="-1"
        class:selected-multiple={multiple && isFilled(selected)}
        on:click={() => toggleOpen()}
        id="{id}-custom"
        aria-controls="{id}-listbox"
        aria-labelledby="{id}-label"
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen ? "true" : "false"}>

        {#if multiple && selectedMultiple.length > 0}
          {#each selectedMultiple as option}
            <span class="badge">
              <Badge {badgeStyle}>
                {option.text} <span on:click={(ev) => handleBadgeRemoval(ev, option)}>&times;</span>
              </Badge>
            </span>
          {/each}
        {:else if !multiple && selectedSingle}
          {selectedSingle ? selectedSingle.text : ""}
        {:else}
          <span class="fade-out" class:faded={!dropdownOpen}>Selecione</span>
        {/if}

      </div>

      <!-- Floating box with extra related data -->
      <div
        class="select-dropdown-menu"
        class:closed={!dropdownOpen}
        class:with-borders={selectBorder === "bottom"}
      >

        <!-- Search input -->
        <div class="searchInput">
          <SearchInput
            searchable={["text"]}
            items={options}
            bind:searchQuery
            bind:filtered={filteredOptions}
            bind:focus={focusSearch}
            bind:inputBind={searchBind}/>
        </div>
        <!-- List of all selectable options -->
        <OptionsList
          id="{id}-listbox"
          labelledBy="{id}-label"
          options={filteredOptions}
          on:changeSelected={handleSelectedChange}
          bind:selected
          bind:focused
          bind:unfocusItems={optionsListBinds.unfocusItems}
          bind:focusNext={optionsListBinds.focusNext}
          bind:focusPrevious={optionsListBinds.focusPrevious}
          bind:toggleSelectedOfFocused={optionsListBinds.toggleSelectedOfFocused}
          />

      </div>

      <!-- For form compatibility -->
      <select class="hidden"
        {...selectAttributes}
        { id }
        { name }
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
  <p class="error-text" class:invisible={isVisuallyValid}>
    {#if required}
      É necessário selecionar {min} {min <= 1 ? "valor" : "valores"}.
    {:else}
      Valor inválido.
    {/if}
  </p>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;
  * {
    --margin-top: var(--szot-select-margin-top, 0.5rem);
    --component-background-color: var(--szot-select-background-color, white);
    --component-border-radius: var(--szot-select-border-radius, var(--theme-small-shape));
    --component-padding-vertical: var(--szot-select-padding-vertical, var(--theme-fields-padding));
    --component-padding-horizontal: var(--szot-select-padding-horizontal, var(--theme-fields-padding));
    --component-border: var(--theme-small-border);
    --message-left-spacing: var(--szot-select-message-left-spacing, 1rem);
    --open-transition-duration: var(--szot-select-open-transition-duration, 200ms);
    --component-label-color: var(--szot-select-label-color, var(--component-color));
    --component-border-color: var(--szot-select-border-color, var(--component-color));
  }

  .hidden {
    display: none;
  }
  .invisible {
    visibility: hidden;
  }
  .fade-out {
    transition: opacity var(--open-transition-duration);
    &.faded {
      opacity: 0;
    }
  }

  .select-box {
    display: flex;
    flex-flow: row wrap;
    gap: 0.2rem;
  }

  .select {
    position: relative;
    width: 100%;
    margin-top: var(--margin-top);
    max-width: var(--szot-select-max-width, var(--theme-fields-max-width));
    // hack the specificity
    &.select.select {
      @include m.border(var(--component-border), var(--component-border-color));
    }

    &.border {
      &-outline {
        @include m.border(var(--component-border), var(--component-border-color));
        border-radius: var(--component-border-radius);
      }
      &-bottom {
        border-bottom: var(--component-border) solid;
      }
    }

    &.style {
      &-primary {
        --component-color: var(--theme-primary-txt);
      }
      &-secondary {
        --component-color: var(--theme-secondary-txt);
      }
      &-dark {
        --component-color: var(--theme-dark-txt);
      }
      &-light {
        --component-color: var(--theme-light-txt);
      }
    }

    &-label {
      position: absolute;
      top: var(--component-padding-vertical);
      left: var(--component-padding-horizontal);
      background: var(--component-background-color);
      @include m.form-field-label-size;

      transform-origin: 0 30%;

      transition: top var(--open-transition-duration), font-size var(--open-transition-duration);
      &.floated {
        top: -0.7em;
        padding: 0 0.3125rem;
        @include m.form-field-label-floated-size;
      }
      .label-text {
        @include m.text-color(var(--component-label-color));
      }
    }

    &-box {
      border-radius: var(--component-border-radius);
      padding: var(--component-padding-vertical) var(--component-padding-horizontal);
      @include m.text-color(var(--component-label-color));
      cursor: pointer;
    }

    &-dropdown-menu {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--component-padding-vertical);

      overflow: hidden;
      max-height: 10rem;

      border-radius: 0 0 var(--component-border-radius) var(--component-border-radius);
      padding: 0 var(--component-padding-horizontal);

      transition: max-height var(--open-transition-duration), padding var(--open-transition-duration);

      .searchInput {
        @include m.border(var(--component-border), var(--component-border-color));
        border-radius: var(--theme-small-shape);
      }
      &.with-borders {
        padding-top: var(--component-padding-vertical);
        @include m.border(var(--component-border), var(--component-border-color));
        border-bottom: none;
        border-radius: 0;

        transition:
          max-height var(--open-transition-duration),
          padding var(--open-transition-duration),
          border var(--open-transition-duration);

        &.closed {
          border-top-width: 0;
        }
      }

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

      transition: transform var(--open-transition-duration);
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
          background: var(--component-border-color);
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
  .error-text{
    margin-left: var(--message-left-spacing);
    @include m.form-field-error-text();
    @include m.text-color(var(--theme-error));
  }
  .error {
    label {
      .label-text {
        @include m.text-color(var(--theme-error));
      }
    }
    // hack the specificity
    &.error.error {
      --component-color: var(--theme-error);
    }
    .select-arrow-aux {
      &::before, &::after {
        background-color: var(--theme-error);
      }
    }
  }
</style>
