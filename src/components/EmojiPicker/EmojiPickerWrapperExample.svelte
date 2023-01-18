<script lang="ts">
  import { onMount } from "svelte";
  import EmojiPicker from "./EmojiPicker.svelte";
  import Input from "../formFields/Input/Input.svelte";

  export let style = "";
  export let opened = true;
  export let maxRecently = 45;

  let targetEl = null;
  let msg = "";

  onMount(() => {
    targetEl = document.getElementById("input-msg");
  });

  function onTypeMsg(e: InputEvent) {
    msg = (e.target as HTMLInputElement).value;
  }

  $: selectedEmoji = "";
  $: msg = `${msg}${selectedEmoji as string}`;
</script>

<div class="container" {style}>
  <div class="input-target-container">
    <Input
      on:click={() => {
        opened = true;
      }}
      on:input={onTypeMsg}
      id="input-msg"
      icon="emoticon-happy"
      iconClick={true}
      inputAttributes={{ autocomplete: "off" }}
      label="Message"
      name="message"
      type="text"
      value={msg}
      --szot-input-margin-bottom="0"
      --szot-input-margin-top="0"
    />
  </div>
  <EmojiPicker
    bind:selected={selectedEmoji}
    bind:opened
    {maxRecently}
    {targetEl}
    localStorageId="szot-ui-emoji-picker-default-example"
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
