<script lang="ts">
  import { onMount } from "svelte";
  import EmojiPicker from "./EmojiPicker.svelte";
  import Dropdown from "../Dropdown/Dropdown.svelte";
  import Input from "../formFields/Input/Input.svelte";

  export let style = "";
  export let maxRecently = 45;

  let targetEl = null;
  let msg = "";

  onMount(() => {
    targetEl = document.getElementById("emojis-picker-dropdown-example");
  });

  function onTypeMsg(e: InputEvent) {
    msg = (e.target as HTMLInputElement).value;
  }

  $: selectedEmoji = "";
  $: msg = `${msg}${selectedEmoji}`;
</script>

<div class="container">
  <div class="input-target-container">
    <Input
      on:input={onTypeMsg}
      id="emojis-picker-dropdown-example"
      icon="emoticon-happy"
      iconClick={true}
      inputAttributes={{ autocomplete: "off" }}
      label="Message"
      name="message"
      type="text"
      value={msg}
      --uai-input-margin-bottom="0"
      --uai-input-margin-top="0"
    />
    <Dropdown
      targetId="emojis-picker-dropdown-example"
      enableAutAdjust={false}
      dropdownAlignment="bottomRight"
      --uai-dropdown-padding="0"
      opened={true}
    >
      <div
        class="emoji-picker-container"
        {style}
      >
        <EmojiPicker
          bind:selected={selectedEmoji}
          {maxRecently}
          {targetEl}
          opened={true}
          localStorageId="uai-emoji-picker-dropdown-example"
        />
      </div>
    </Dropdown>
  </div>
</div>

<style lang="scss">
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 600px;
    max-height: 90vh;

    .input-target-container {
      width: 100%;
      margin-bottom: 5px;
    }
  }
</style>
