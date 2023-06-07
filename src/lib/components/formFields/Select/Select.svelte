<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy } from "svelte";
  import type { TFormContext } from "../../Form/types";

  import OptionsList from "./OptionsList/OptionsList.svelte";
  import SearchInput from "../SearchInput/SearchInput.svelte";
  import Badge from "../../Badge/Badge.svelte";
  import { keyboardControls } from "./keyboardControls/actionKeyboardControls";
  import type { TOption, TOptionsListBinds } from "./types";
  import type { TbadgeStyle, TbadgeStyleType } from "../../Badge/types";
  import { actionWatchSize } from "$actions/watchSize/watchSize";
  import { isTruthy } from "$helpers/truthy";

  // True if the select should select multiple values
  export let multiple = false;
  // Whether the field needs to have at least `min` value
  export let required = false;
  // Change it to true to disable the component
  export let disabled = false;
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
   * name attribute for the HTML select element
   * @type {string}
   */
  export let name: string;
  /**
   * id attribute for the HTML select element
   * @type {string}
   */
  export let id: string = name;
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

  // At the multiple select, this will set the badge style
  export let badgeStyle: TbadgeStyle = selectStyle;

  export let badgeStyleType: TbadgeStyleType = "outline";

  export let inputStyle: TSelectStyle = selectStyle;

  export let inputBorder: TSelectBorders = "outline";

  /**
   * Other attributes for the HTML input element of the SearchInput
   */
  export let inputAttributes: Record<string, string> = {};

  export let showSearchInput = true;

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
  let focusSearch: () => void;

  // The searched text
  let searchQuery: string;
  // The results of the search
  let filteredOptions: TOption[];

  let wrapperElement: HTMLElement;
  let clipPathVariables = {
    labelWidth: "0px",
    labelHeight: "0px",
  };
  let labelComponent: HTMLElement;
  let applyClipPath = false;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } =
    isInsideContext && getContext<TFormContext>("FormContext");

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
    if (!disabled) {
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
    if (document.activeElement !== searchBind && showSearchInput) {
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

  function handleBadgeRemoval(ev: MouseEvent | KeyboardEvent, option: TOption) {
    const remove = selectedMultiple.indexOf(option);
    selected = [...selectedMultiple.slice(0, remove), ...selectedMultiple.slice(remove + 1)];
    ev.stopPropagation();
    ev.preventDefault();
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    selected = _value as TOption | TOption[] | null;
  }

  function handleLabelResize(ev: CustomEvent<ResizeObserverSize>) {
    clipPathVariables = {
      ...clipPathVariables,
      labelHeight: `${ev.detail.blockSize}px`,
      labelWidth: `${ev.detail.inlineSize}px`,
    };
  }

  $: if (forceInvalid) validate();
  $: selectedSingle = Array.isArray(selected) ? null : selected;
  $: selectedMultiple = Array.isArray(selected) ? selected : [];

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (wrapperElement && isInsideContext) {
    setFieldValue(name, selected, isValid);
  }

  $: if (wrapperElement && labelComponent) {
    clipPathVariables = {
      ...clipPathVariables,
    };
  }

  $: applyClipPath =
    dropdownOpen || (selected && (!Array.isArray(selected) || selected?.length !== 0));

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

<div
  class="select-wrapper"
  bind:this={wrapperElement}
  class:select-disabled={disabled}
  style="
    --label-height: {clipPathVariables.labelHeight};
    --label-width: {clipPathVariables.labelWidth};
  "
  class:apply-clip-path={applyClipPath}
  class:filled={isTruthy(selected)}
>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    tabindex="0"
    class="select border-{selectBorder} style-{selectStyle}"
    class:error={!isVisuallyValid}
    class:select-inFocus={dropdownOpen}
    on:focus={() => toggleOpen()}
    use:keyboardControls={{ multiple, dropdownOpen }}
    on:actiontoggleSelectedOfFocused={optionsListBinds.toggleSelectedOfFocused}
    on:actionFocusPrevious={optionsListBinds.focusPrevious}
    on:actionFocusNext={optionsListBinds.focusNext}
    on:actionToggleDropdown={handleToggleDropdown}
    on:actionType={handleTyping}
  >
    <!-- Floating label for the select -->
    <label
      class="select-label"
      class:required
      id="{id}-label"
      for="{id}-custom"
      on:click={() => toggleOpen()}
      on:keypress={(e) => e.key === "Enter" && toggleOpen()}
      class:floated={dropdownOpen || isFilled(selected)}
      bind:this={labelComponent}
      use:actionWatchSize
      on:actionResize={handleLabelResize}
    >
      <div class="label-text">
        {label}
      </div>
    </label>

    <!-- Select's box that shows which option is selected -->
    <div
      class="select-box select-{dropdownOpen}"
      role="combobox"
      tabindex="-1"
      class:select-disabled={disabled}
      class:selected-multiple={multiple && isFilled(selected)}
      on:click={() => toggleOpen()}
      on:keypress={(e) => e.key === "Enter" && toggleOpen()}
      id="{id}-custom"
      aria-controls="{id}-listbox"
      aria-labelledby="{id}-label"
      aria-haspopup="listbox"
      aria-expanded={dropdownOpen ? "true" : "false"}
    >
      {#if multiple && selectedMultiple.length > 0}
        {#each selectedMultiple as option}
          <span class="badge badge-{badgeStyleType}">
            <Badge
              {badgeStyle}
              {badgeStyleType}
            >
              {option.text}
              <span
                on:click={(ev) => handleBadgeRemoval(ev, option)}
                on:keypress={(e) => e.key === "Enter" && handleBadgeRemoval(e, option)}
                >&times;</span
              >
            </Badge>
          </span>
        {/each}
      {:else if !multiple && selectedSingle}
        {selectedSingle ? selectedSingle.text : ""}
      {:else}
        <span
          class="fade-out"
          class:faded={!dropdownOpen}>Selecione</span
        >
      {/if}
    </div>

    <!-- Floating box with extra related data -->
    <div
      class="select-dropdown-menu"
      class:with-search-input={showSearchInput}
      class:closed={!dropdownOpen}
      class:with-borders={selectBorder === "bottom"}
    >
      {#if showSearchInput}
        <div class="search-input">
          <SearchInput
            searchable={["text"]}
            items={options}
            name=""
            {disabled}
            {inputStyle}
            border={inputBorder}
            bind:searchQuery
            bind:filtered={filteredOptions}
            bind:focus={focusSearch}
            bind:inputElement={searchBind}
            {inputAttributes}
          />
        </div>
      {/if}

      <!-- List of all selectable options -->
      <OptionsList
        id="{id}-listbox"
        labelledBy="{id}-label"
        options={filteredOptions || options}
        on:changeSelected={handleSelectedChange}
        on:changeSelected
        bind:selected
        bind:focused
        bind:unfocusItems={optionsListBinds.unfocusItems}
        bind:focusNext={optionsListBinds.focusNext}
        bind:focusPrevious={optionsListBinds.focusPrevious}
        bind:toggleSelectedOfFocused={optionsListBinds.toggleSelectedOfFocused}
      />
    </div>

    <!-- For form compatibility -->
    <select
      class="hidden"
      {...selectAttributes}
      {id}
      {name}
      {disabled}
      {multiple}
      value={selected}
    >
      {#each options as option}
        <option value={option}>
          {option.text}
        </option>
      {/each}
    </select>

    <div
      class="select-arrow"
      class:flipped={dropdownOpen}
      on:click={() => toggleOpen()}
      on:keypress={(e) => e.key === "Enter" && toggleOpen()}
    >
      <div class="select-arrow-aux" />
    </div>
  </div>
  <p
    class="error-text"
    class:invisible={isVisuallyValid}
  >
    {#if required}
      É necessário selecionar {min} {min <= 1 ? "valor" : "valores"}.
    {:else}
      Valor inválido.
    {/if}
  </p>
</div>

<style lang="scss">
  @use "$styles/mixins" as m;
  * {
    --component-color: var(--theme-color);
    --margin-top: var(--szot-select-margin-top, 0.5rem);
    --component-background-color: var(--szot-select-background-color, transparent);
    --component-border-radius: var(--szot-select-border-radius, var(--theme-small-shape));
    --component-padding-vertical: var(--szot-select-padding-vertical, var(--theme-fields-padding));
    --component-padding-horizontal: var(
      --szot-select-padding-horizontal,
      var(--theme-fields-padding)
    );
    --component-border: var(--szot-select-border, var(--theme-small-border));
    --label-margin-right: var(--select-label-margin-right, 1.3rem);
    --message-left-spacing: var(--szot-select-message-left-spacing, 1rem);
    --open-transition-duration: var(--szot-select-open-transition-duration, 200ms);
    --component-label-color: var(--szot-select-label-color, var(--component-color));
    --component-border-color: var(--szot-select-border-color, var(--component-color));
    --select-badge-color: var(--szot-select-badge-color, var(--szot-select-label-color));
    --search-input-border-color: var(
      --szot-select-search-input-border-color,
      var(--component-border-color)
    );
    --text-color: var(--szot-select-text-color, var(--theme-dark-txt));
    --input-placeholder-color: var(--szot-select-input-placeholder-color, var(--text-color));
    --border-width: var(--component-border);
  }

  .select-wrapper {
    &.apply-clip-path {
      .select::before {
        @include m.clip-path-border(
          var(--border-width),
          var(--label-width),
          var(--label-height),
          0px,
          var(--component-padding-horizontal)
        );
      }
    }

    &.filled {
      --component-border-color-filled: var(
        --szot-select-border-color-filled,
        var(--component-border-color)
      );
    }
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
    max-width: 90%;
    outline: none;
  }

  .select {
    position: relative;
    width: 100%;
    outline: none;
    margin-top: var(--margin-top);
    max-width: var(--szot-select-max-width, 100%);
    // hack the specificity
    &.select.select {
      --default-border-color-focus: var(
        --component-border-color-filled,
        var(--component-border-color)
      );
      @include m.border(
        var(--component-border),
        var(--select-focus-color, var(--default-border-color-focus))
      );
    }

    &.border {
      &-outline {
        @include m.border(
          var(--component-border),
          var(--component-border-color-filled, var(--component-border-color))
        );
        border-radius: var(--component-border-radius);
      }
      &-bottom {
        border-bottom: var(--component-border) solid;
      }
    }

    &.style {
      &-primary {
        --theme-color: var(--theme-primary-txt);
      }
      &-secondary {
        --theme-color: var(--theme-secondary-txt);
      }
      &-dark {
        --theme-color: var(--theme-dark-txt);
      }
      &-light {
        --theme-color: var(--theme-light-txt);
      }
    }
    &-inFocus {
      --select-focus-color: var(--szot-select-border-color-focus);
    }

    &-label {
      position: absolute;
      top: var(--component-padding-vertical);
      left: var(--component-padding-horizontal);
      background: var(--component-background-color);
      @include m.form-field-label-size;
      max-width: 75%;
      text-overflow: ellipsis;

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
      &.required {
        .label-text::after {
          content: "*";
          display: inline;
        }
      }
    }

    &-box {
      border-radius: var(--component-border-radius);
      padding: var(--component-padding-vertical) var(--component-padding-horizontal);
      @include m.text-color(var(--text-color));
      cursor: pointer;
    }

    &-disabled {
      cursor: initial;
      opacity: 0.75;
      outline: none;
    }
    &-dropdown-menu {
      display: grid;
      grid-template-rows: 1fr;
      gap: var(--component-padding-vertical);

      &.with-search-input {
        grid-template-rows: auto 1fr;
      }

      overflow: hidden;
      max-height: 10rem;

      border-radius: 0 0 var(--component-border-radius) var(--component-border-radius);
      padding: 0 var(--component-padding-horizontal);

      transition: max-height var(--open-transition-duration),
        padding var(--open-transition-duration);

      .search-input {
        --szot-input-background-color: var(--component-background-color);
        --szot-input-border-color: var(--text-color);
        --szot-input-placeholder-color: var(--input-placeholder-color);
        --szot-input-margin-bottom: 0;
        --szot-input-text-color: var(--text-color);
      }

      &.with-borders {
        padding-top: var(--component-padding-vertical);
        @include m.border(
          var(--component-border),
          var(--component-border-color-filled, var(--component-border-color))
        );
        border-bottom: none;
        border-radius: 0;

        transition: max-height var(--open-transition-duration),
          padding var(--open-transition-duration), border var(--open-transition-duration);

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
      &-aux {
        width: var(--component-arrow-size);
        height: var(--component-arrow-size);

        transform: rotate(45deg);

        &::before,
        &::after {
          content: "";
          display: block;
          position: absolute;
          background: var(
            --select-focus-color,
            var(--component-border-color-filled, var(--component-border-color))
          );
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

  .badge {
    --szot-badge-color: var(--select-badge-color);
    --szot-badge-border-color: var(
      --szot-select-badge-border-color,
      var(--select-focus-color, var(--default-border-color-focus))
    );
  }

  .error-text {
    margin-left: var(--message-left-spacing);
    @include m.form-field-error-text();
    @include m.text-color(var(--theme-error));
  }

  .disabled {
    cursor: normal;
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
      --szot-select-label-color: var(--theme-error);
      --szot-select-border-color: var(--theme-error);

      .badge {
        --szot-badge-color: var(--theme-error);
        --szot-badge-border-color: var(--theme-error);

        &-filled {
          --szot-badge-background-color: var(--theme-error);
          --szot-badge-color: var(--theme-txt-on-signal-color);
          --szot-badge-border-color: transparent;
        }
      }

      .search-input {
        --szot-input-text-color: var(--theme-error);
      }
    }
    .select-arrow-aux {
      &::before,
      &::after {
        background: var(--theme-error);
      }
    }
  }
</style>
