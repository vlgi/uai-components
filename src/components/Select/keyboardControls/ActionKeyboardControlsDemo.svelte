<script lang="ts">
import { simpleDesserts } from "../fixtures";

import OptionsList from "../OptionsList/OptionsList.svelte";
import type { TOptionsListBinds } from "../types";

import { keyboardControls } from "./actionKeyboardControls";

let multiple = false;
let dropdownOpen = false;
let text = "";

let selected;
let focused;

const optionsListBinds: TOptionsListBinds = {};

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

function handleTyping(ev: CustomEvent<string>) {
  const key = ev.detail;
  text = key;
}
function handleToggleDropdown(ev: CustomEvent<boolean | undefined>) {
  toggleOpen(ev.detail);
}

</script>

<label for="">Multiple:</label>
<input type="checkbox" name="" id="" bind:checked={multiple} />
<label for="">Dropdown Open:</label>
<input type="checkbox" name="" id="" bind:checked={dropdownOpen} />

<div tabindex="0"
  use:keyboardControls={{ multiple, dropdownOpen }}
  on:actiontoggleSelectedOfFocused={() => optionsListBinds?.toggleSelectedOfFocused()}
  on:actionFocusPrevious={() => optionsListBinds?.focusPrevious()}
  on:actionFocusNext={() => optionsListBinds?.focusNext()}
  on:actionToggleDropdown={handleToggleDropdown}
  on:actionType={handleTyping}>

  <div>Selected: {JSON.stringify(selected)}</div>

  <input type="text" bind:value={text} />


    <div class:hidden={!dropdownOpen}>
      <OptionsList
        id="doce-listbox"
        labelledBy="doce-label"
        options={simpleDesserts}
        bind:selected
        bind:focused
        bind:focusNext={optionsListBinds.focusNext}
        bind:focusPrevious={optionsListBinds.focusPrevious}
        bind:toggleSelectedOfFocused={optionsListBinds.toggleSelectedOfFocused}
        bind:unfocusItems={optionsListBinds.unfocusItems}
        />
    </div>


</div>

<style>
  .hidden {
    display: none;
  }
</style>
