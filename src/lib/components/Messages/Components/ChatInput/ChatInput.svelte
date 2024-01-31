<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import Textarea from "$components/formFields/Textarea/Textarea.svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import EmojiPicker from "$components/EmojiPicker/EmojiPicker.svelte";
  import Dropdown from "$components/Dropdown/Dropdown.svelte";

  export let inputStyle: "input" | "textarea" = "input";

  export let alowChangeStyle = true;

  export let showEmojiPicker = true;

  export let showSendButton = true;

  // textarea variables

  export let name: string;
  export let value = ``;
  export let placeholder = "";
  export let label = "";
  export let maxRows = 0;

  export let buttonsStyle: "primary" | "secondary" | "dark" | "light" = "dark";

  let targetEl = null;
  let emojiPickerOpened = false;

  const dispatch = createEventDispatcher<{
    submit: null;
  }>();

  function changeinputStyle() {
    if (inputStyle === "input") {
      inputStyle = "textarea";
    } else {
      inputStyle = "input";
    }
  }

  function submitInput() {
    dispatch("submit");
  }

  function handleTextareaKeyPress(event: KeyboardEvent) {
    if (inputStyle === "input" && event.key === "Enter") {
      event.preventDefault();
      submitInput();
    }
  }

  function toogleEmojiPicker() {
    emojiPickerOpened = !emojiPickerOpened;
  }

  onMount(() => {
    targetEl = document.getElementById(name);
  });

  $: selectedEmoji = "";
  $: value = `${value}${selectedEmoji}`;
</script>

<div
  class="container"
  class:input-style={inputStyle === "input"}
>
  <div class="textarea">
    <Textarea
      {name}
      {label}
      {placeholder}
      {maxRows}
      bind:value
      on:change
      on:input
      on:keypress
      on:keypress={handleTextareaKeyPress}
      {...$$restProps}
    />
  </div>

  <div class="buttons">
    {#if showSendButton}
      <div>
        <Button
          size="round"
          icon="fluent:send-24-filled"
          buttonStyle={buttonsStyle}
          buttonStyleType="not-filled"
          on:click={submitInput}
        />
      </div>
    {/if}

    {#if alowChangeStyle}
      <div>
        <Button
          size="round"
          icon="heroicons-solid:pencil-alt"
          buttonStyle={buttonsStyle}
          buttonStyleType="not-filled"
          on:click={changeinputStyle}
        />
      </div>
    {/if}

    {#if showEmojiPicker}
      <div id="{name}-dropdown-emoji">
        <Button
          size="round"
          icon="mdi:emoji"
          buttonStyle={buttonsStyle}
          buttonStyleType="not-filled"
          on:click={toogleEmojiPicker}
        />
      </div>
    {/if}
  </div>
</div>

{#if showEmojiPicker}
  <Dropdown
    targetId="{name}-dropdown-emoji"
    enableAutAdjust={true}
    dropdownAlignment="bottomRight"
    opened={emojiPickerOpened}
  >
    <div class="emoji-picker-container">
      <EmojiPicker
        bind:selected={selectedEmoji}
        bind:opened={emojiPickerOpened}
        maxRecently={20}
        {targetEl}
        localStorageId="uai-emoji-picker-dropdown-example"
      />
    </div>
  </Dropdown>
{/if}

<style lang="scss">
  .container {
    --uai-textarea-margin-bottom: 0.75rem;
    --uai-textarea-max-width: var(--uai-ui-chat-max-width, 100vw);
    --uai-textarea-max-height: var(--uai-ui-chat-max-height);
    &.input-style {
      --uai-textarea-max-height: var(--uai-ui-chat-max-height, 2.5rem);
    }
    .buttons {
      display: flex;
      flex-direction: var(--uai-ui-chat-buttons-flex-direction, row-reverse);
      --uai-button-icon-color: var(--uai-chat-input-icon-color);
    }
  }
</style>
