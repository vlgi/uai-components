<script lang="ts">
  import EmojiPicker from "./EmojiPicker.svelte";
  import Input from "../formFields/Input/Input.svelte";

  export let style = "";
  export let opened = true;
  export let maxRecently = 45;

  let targetEl = null;
  let msg = "";

  function onTypeMsg(e: InputEvent) {
    msg = (e.target as HTMLInputElement).value;
  }

  $: selectedEmoji = "";
  $: msg = `${msg}${selectedEmoji}`;
</script>

<div
  class="container"
  {style}
>
  <div class="input-target-container">
    <Input
      on:click={() => {
        opened = true;
      }}
      on:input={onTypeMsg}
      bind:inputElement={targetEl}
      icon="mdi:emoticon-happy"
      iconClick={true}
      inputAttributes={{ autocomplete: "off" }}
      label="Message"
      name="message"
      type="text"
      value={msg}
      --uai-input-margin-bottom="0"
      --uai-input-margin-top="0"
    />
  </div>
  <EmojiPicker
    bind:selected={selectedEmoji}
    bind:opened
    {maxRecently}
    {targetEl}
    localStorageId="uai-emoji-picker-default-example"
  />
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
