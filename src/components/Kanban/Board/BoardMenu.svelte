<script lang="ts">
  import { tick, onMount, onDestroy } from "svelte";

  import type {
    TBoard,
    TCustomBoard,
  } from "../data/types";

  import { texts } from "../data/components-texts";

  // components
  import Input from "../../formFields/Input/Input.svelte";
  import Dropdown from "../../Dropdown/Dropdown.svelte";

  export let data: TBoard | TCustomBoard; // board data
  export let dropDownTarget: string;
  export let titleColor = "var(--board-title-color)";

  let inpt: HTMLInputElement; // input file element for board background image
  let showAdd = false;
  let showDropdown = false;

  function handleInputEl() {
    showAdd = false;
  }

  function initializeInput() {
    document.body.onfocus = handleInputEl;
  }

  function getFile(e: Event) {
    const files = Array.from((e.target as HTMLInputElement).files)
      .map((f) => URL.createObjectURL(f));
    [data.backgroundImage] = files;
    showDropdown = false;
  }

  function changeBoardColor(e: Event) {
    titleColor = (e.target as HTMLInputElement).value;
  }

  onMount(async () => {
    await tick();
    inpt = document.getElementById("input-image") as HTMLInputElement;
  });

  onDestroy(() => {
    document.body.removeEventListener("onfocus", handleInputEl);
  });

  $: if (showAdd) inpt.click();

</script>

<Dropdown
  targetId={dropDownTarget}
  enableAutAdjust={false}
  dropdownAlignment="bottomRight"
  --szot-dropdown-padding="0"
  bind:opened={showDropdown}
  >
  <div class="drop-menu-container">
    <div class="drop-menu-section">{texts.boardAction}</div>
    <div class="divider" />

    <div class="item" on:click={() => {
      showAdd = true;
    }}>
      {texts.changeBoardBackgroundImage}
    </div>
    <div class="divider" />

    <div class="item">
      {texts.changeBoardColor}
      <Input
        name="board-color"
        label={texts.boardTitleColor}
        type="color"
        --szot-input-margin-top="15px"
        --szot-input-margin-bottom="0"
        on:change={changeBoardColor}
        bind:value={titleColor}
      />
    </div>
  </div>
</Dropdown>

<input
  type="file"
  id="input-image"
  style="display: none;"
  on:change={getFile}
  on:click={initializeInput}
/>

<style lang="scss">
  @use "src/components/Kanban/menu.scss";
  .item {
    display: grid;
    grid-template-columns: 100%;
  }

</style>
