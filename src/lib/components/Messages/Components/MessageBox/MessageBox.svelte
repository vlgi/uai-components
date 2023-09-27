<script lang="ts">
  /* eslint-disable */
  /**
   * Disabling lint for this file because him can't handle with $$Generic
   * necessary to make the table columns and table rows be strong typed.
   */
  import { createEventDispatcher } from "svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import Dropdown from "$components/Dropdown/Dropdown.svelte";
  import { isTruthy } from "$helpers/truthy";
  import type { TMessage } from "./types";

  type TMessages = $$Generic<TMessage>;

  export let messages: TMessages[] = [];

  // hide edit and delete buttons
  export let showButtons = true;

  // When defined, it displays your user's messages on the right
  export let myUserId = 0;

  export let buttonsStyle: "primary" | "secondary" | "dark" | "light" = "dark";

  let messageIdDropdownOpened = null;

  let chatOverlayElement: HTMLElement;

  const dispatch = createEventDispatcher<{
    edit: TMessage;
    delete: TMessage;
  }>();

  function editMessage(message: TMessage) {
    dispatch("edit", message);
    messageIdDropdownOpened = null;
  }

  function deleteMessage(message: TMessage) {
    dispatch("delete", message);
    messageIdDropdownOpened = null;
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
          <p>{message.text}</p>
        </div>
      </div>
      {#if showButtons}
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
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    border: var(--szot-message-box-border, none);
    gap: var(--szot-message-box-gap, 0.5rem);
    background: var(--szot-message-box-background, transparent);
  }

  .message-container {
    display: grid;
    justify-content: left;
    grid-template-columns: min-content auto min-content;
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
