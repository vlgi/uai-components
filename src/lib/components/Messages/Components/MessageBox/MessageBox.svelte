<script lang="ts">
  /* eslint-disable */
  /**
   * Disabling lint for this file because him can't handle with $$Generic
   * necessary to make the table columns and table rows be strong typed.
   */
  import { createEventDispatcher } from "svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import Dropdown from "$components/Dropdown/Dropdown.svelte";
  import Textarea from "$components/formFields/Textarea/Textarea.svelte";
  import { isTruthy } from "$helpers/truthy";
  import type { TMessage } from "./types";

  type TMessages = $$Generic<TMessage>;

  type ButtonStyleObj = {
    buttonsStyle?: "primary" | "secondary" | "dark" | "light";
    buttonStyleType?: "filled" | "not-filled" | "outline";
    size?: "round" | "small" | "medium" | "large";
  };

  export let messages: TMessages[] = [];

  // hide edit and delete buttons
  export let showButtons = true;

  // When defined, it displays your user's messages on the right
  export let myUserId = 0;

  export let editInBox = false;

  export let buttonsStyle: "primary" | "secondary" | "dark" | "light" = "dark";

  export let submitButtonEditStyle: ButtonStyleObj = {
    size: "small",
    buttonsStyle: "primary",
    buttonStyleType: "filled",
  };

  export let cancelButtonEditStyle: ButtonStyleObj = {
    size: "small",
    buttonsStyle: "primary",
    buttonStyleType: "outline",
  };

  let messageIdDropdownOpened = null;

  let chatOverlayElement: HTMLElement;

  let messageEditingId = undefined;

  let textEditing = "";

  let windowWidth = 0;

  const dispatch = createEventDispatcher<{
    edit: TMessage;
    delete: TMessage;
    messageEdited: TMessage;
  }>();

  function editMessage(message: TMessage) {
    if (editInBox) {
      textEditing = message.text;
      messageEditingId = message.id;
    } else {
      dispatch("edit", message);
    }
    messageIdDropdownOpened = null;
  }

  function deleteMessage(message: TMessage) {
    dispatch("delete", message);
    messageIdDropdownOpened = null;
  }

  function sendEditedMessage(message: TMessage) {
    message.text = textEditing;
    dispatch("messageEdited", message);
    messageEditingId = undefined;
  }

  /**
   * Returns true if there is something in the image slot, false otherwise.
   */
  function hasImageSlot(): boolean {
    return isTruthy(($$slots as { image: unknown }).image);
  }

  function handleClickOut(ev: Event) {
    if (ev.target === chatOverlayElement) {
      messageIdDropdownOpened = null;
    }
  }
</script>

<div class="container">
  {#each messages as message}
    <div
      class="message-container"
      class:right={myUserId === message.userId}
      class:with-image={message.userImage || hasImageSlot()}
      bind:this={chatOverlayElement}
      on:click={handleClickOut}
      on:keypress={(e) => e.key === "Esc" && handleClickOut(e)}
    >
      {#if message.userImage}
        <div class="image">
          <img
            src={message.userImage}
            alt="{message.userName} img"
          />
        </div>
      {:else if hasImageSlot()}
        <slot
          {message}
          {...message}
          name="image"
        />
      {/if}

      <div class="text-container">
        <div class="header">
          <span class="name">{message.userName}</span>
          {#if message.updateAt}
            <span class="data">{message.updateAt}</span>
          {/if}
        </div>

        <div class="body">
          {#if messageEditingId === message.id}
            <div
              class="editing-box"
              style="--textarea-width:{windowWidth / 2}px"
            >
              <Textarea
                name="message-editing-{message.id}"
                bind:value={textEditing}
              />
              <div class="editing-buttons">
                <Button
                  {...submitButtonEditStyle}
                  on:click={() => sendEditedMessage(message)}
                >
                  Atualizar
                </Button>
                <Button
                  {...cancelButtonEditStyle}
                  on:click={() => (messageEditingId = undefined)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          {:else}
            <p>{message.text}</p>
          {/if}
        </div>
      </div>
      {#if showButtons}
        {#if messageEditingId !== message.id}
          <div
            class="buttons"
            class:not-hidden={messageIdDropdownOpened === message.id}
            id="szot-message-container-{message.id}"
          >
            <Button
              size="round"
              buttonStyle={buttonsStyle}
              buttonStyleType="not-filled"
              icon="mdi:dots-horizontal"
              on:click={() => (messageIdDropdownOpened = message.id)}
            />
          </div>
          <div
            class="dropdown"
            class:not-hidden={messageIdDropdownOpened === message.id}
          >
            <Dropdown
              opened={messageIdDropdownOpened === message.id}
              dropdownAlignment={myUserId === message.userId ? "leftTop" : "rightTop"}
              targetId="szot-message-container-{message.id}"
            >
              <div
                class="buttons dropdown"
                class:not-hidden={messageIdDropdownOpened === message.id}
              >
                <Button
                  buttonStyleType="not-filled"
                  buttonStyle={buttonsStyle}
                  size="small"
                  on:click={() => {
                    editMessage(message);
                  }}
                >
                  Editar
                </Button>
                <Button
                  buttonStyleType="not-filled"
                  buttonStyle={buttonsStyle}
                  size="small"
                  on:click={() => {
                    deleteMessage(message);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </Dropdown>
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} />

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    border: var(--szot-message-box-border, none);
    gap: var(--szot-message-box-gap, 0.5rem);
    background: var(--szot-message-box-background, transparent);
  }

  .message-container {
    --grid: auto min-content;
    &.with-image {
      --grid: min-content auto min-content;
    }
    display: grid;
    justify-content: left;
    grid-template-columns: var(--grid);
    align-items: top;

    .image {
      margin-top: var(--szot-message-box-image-margin-top, 1rem);
      img {
        width: var(--szot-message-box-image-width, 2.25rem);
        height: var(--szot-message-box-image-height, 2.25rem);
        border-radius: var(--szot-message-box-image-border-radius, 5rem);
        margin: 0 0 0 0.5rem;
      }
    }

    .text-container {
      margin: 0.5rem;
      max-width: 100vw;
      overflow-x: hidden;
      word-break: break-word;
      background: var(--szot-message-box-text-background, transparent);
      .header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.25rem;
        width: 100%;

        .name {
          font-weight: 600;
        }

        .data {
          font-size: 0.75rem;
        }
      }
      .body {
        width: 100%;
        padding: 0.25rem;

        .editing-box {
          display: flex;
          flex-direction: column;
          --szot-textarea-margin-bottom: 0.85rem;
          width: var(--szot-textarea-max-width, var(--textarea-width));
          .editing-buttons {
            display: flex;
            justify-content: end;
            gap: 0.5rem;
          }
        }
      }
    }
    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      --szot-button-icon-color: var(--szot-message-box-icon-color);
    }

    &.right {
      justify-content: right;

      .buttons {
        flex-direction: row-reverse;
      }

      img {
        margin: 0 0.5rem 0 0;
      }
    }

    &:not(:hover) {
      .buttons:not(.not-hidden),
      .dropdown:not(.not-hidden) {
        opacity: 0;
      }
    }
  }
</style>
