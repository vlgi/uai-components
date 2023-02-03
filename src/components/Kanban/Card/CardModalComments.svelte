<script lang="ts">
  import { onMount } from "svelte";
  import type { TCardUser, TCardComment, TLoggedUser } from "../data/types";
  import { texts } from "../data/components-texts";
  import { isSameDay, isToday, compareObjects } from "../utils";

  // stores
  import { logged } from "../stores";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";
  import Input from "../../formFields/Input/Input.svelte";
  // import EmojiPicker from "../../EmojiPicker/EmojiPicker.svelte";

  export let data: TCardComment[]; // comments array

  let msg = "";
  let targetEl = null;
  const loggedUser = $logged as TLoggedUser;
  const selectedEmoji = "";

  function checkIfIsTheLoggedUser(user: TCardUser): boolean {
    if (compareObjects(loggedUser.user, user)) return true;
    return false;
  }

  function onTypeMsg(e: InputEvent): void {
    msg = (e.target as HTMLInputElement).value;
  }

  function sendMsg(e: KeyboardEvent | MouseEvent): void {
    if (e.type === "keypress" && (e as KeyboardEvent).key !== "Enter") return;
    if (msg === "") return;
    const comment: TCardComment = {
      text: msg,
      user: loggedUser.user,
      date: new Date(),
    };
    data = [...data, comment];
    msg = "";
    showEmoji = false;
  }

  function removeMsg(): void {
    if (indexToDelete === -1) return;
    const msgs = [...data];
    msgs.splice(indexToDelete, 1);
    data = [...msgs];
    openAlertModal = false;
  }

  onMount(() => {
    targetEl = document.getElementById("input-msg");
  });

  $: openAlertModal = false;
  $: indexToDelete = -1;


  $: msg = `${msg}${selectedEmoji}`;
  $: showEmoji = false;
</script>

<Modal bind:opened={openAlertModal} --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeCommentAlert}</h3>
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => {
        openAlertModal = false;
      }}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
      on:click={removeMsg}
    >
      {texts.removeComment}
    </Button>
  </div>
</Modal>

{#if data.length > 0}
  <div class="section-title">
    <Icon
      iconName="comment-text-multiple-outline"
      --szot-icon-font-size="20px"
    />
    <h2>{texts.comments}</h2>
  </div>
{/if}

<div class="comments">
  {#each data as comment, index}
    {#if index === 0}
      {#if isToday(new Date(comment.date))}
        <span class="msg-date">Today</span>
      {:else}
        <span class="msg-date">
          {new Date(comment.date).toLocaleDateString("pt-BR")}
        </span>
      {/if}
    {:else if index > 0 && !isSameDay(new Date(comment.date), new Date(data[index - 1].date))}
      {#if isToday(new Date(comment.date))}
        <span class="msg-date">Today</span>
      {:else}
        <span class="msg-date">
          {new Date(comment.date).toLocaleDateString("pt-BR")}
        </span>
      {/if}
    {/if}
    <div
      class="comment-container"
      class:right={checkIfIsTheLoggedUser(comment.user)}
    >
      {#if !checkIfIsTheLoggedUser(comment.user)}
        <div class="user-avatar">
          <CardUserAvatar data={comment.user} info={true} />
        </div>
        <div class="msg-arrow">
          <Icon iconName="triangle" --szot-icon-color="#eee" />
        </div>
      {/if}
      {#if checkIfIsTheLoggedUser(comment.user)}
        <div
          class="item-btn"
          on:click={() => {
            indexToDelete = index;
            openAlertModal = true;
          }}
        >
          <Icon
            iconName="trash-can"
            --szot-icon-font-size="20px"
            --szot-icon-color="#bbb"
          />
        </div>
      {/if}
      <div class="msg-container">
        {#if checkIfIsTheLoggedUser(comment.user)}
          <div
            class="comment-text comment-editable editable"
            contenteditable="true"
            bind:textContent={comment.text}
          />
        {:else}
          <div class="comment-text">
            {comment.text}
          </div>
        {/if}
      </div>

      {#if checkIfIsTheLoggedUser(comment.user)}
        <div class="msg-arrow">
          <Icon iconName="triangle" --szot-icon-color="#c4f2c3" />
        </div>
        <div class="user-avatar">
          <CardUserAvatar data={comment.user} info={true} />
        </div>
      {/if}
    </div>
  {/each}
</div>
<div class="msg-input">
  <CardUserAvatar data={loggedUser.user} info={true} />
  <div class="input-container" on:keypress={sendMsg}>
    <Input
      on:click={() => {
        showEmoji = true;
      }}
      on:input={onTypeMsg}
      id="input-msg"
      icon="emoticon-happy"
      iconClick={true}
      inputAttributes={{ autocomplete: "off" }}
      label={texts.addComment}
      name="comment"
      type="text"
      value={msg}
      --szot-input-margin-bottom="0"
      --szot-input-margin-top="0"
    />
  </div>
  <div class="emojis-selector-container">
    <!-- <EmojiPicker
      bind:selected={selectedEmoji}
      bind:opened={showEmoji}
      localStorageId="szot-ui-kanban-default-card-coments-emoji-picker"
      {targetEl}
      --szot-emojis-picker-position="absolute"
    /> -->
  </div>
  <div class="send-msg-btn" on:click={sendMsg}>
    <Icon iconName="send-outline" />
  </div>
</div>

<style lang="scss">
  @use "src/components/Kanban/styles.scss";
  @use "src/components/Kanban//Card/card-modal-styles.scss";
  .msg-date {
    align-self: center;
    font-size: 12px;
    color: #666;
    font-style: italic;
    margin-top: 10px;
  }

  .item-btn {
    margin: 0 2px;
  }

  .comments {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .comment-container {
      display: flex;
      align-items: center;

      .msg-arrow {
        transform: rotate(-70deg);
        margin-right: -10px;
      }

      .msg-container {
        background: #eee;
        border-radius: var(--radius-pattern);
        max-width: 70%;
        font-size: 13px;
        z-index: 1;

        .comment-text {
          outline: 0px solid transparent;
          padding: 7px 10px;
        }

        .comment-date {
          font-size: 10px;
          color: #333;
          font-style: italic;
          padding: 0 10px 7px 10px;
          text-align: end;
        }

        .comment-editable {
          cursor: pointer;
          border-radius: var(--radius-pattern);
          background: #c4f2c3;
          &:hover {
            background: #addfac;
          }
        }
      }
    }
    .right {
      justify-content: flex-end;

      .msg-arrow {
        transform: rotate(70deg);
        margin-left: -10px;
        margin-right: 0;
      }
    }
  }

  .msg-input {
    display: grid;
    grid-template-columns: 30px calc(100% - 80px) 1px 20px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;

    .emojis-selector-container {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      z-index: 2;
      margin-bottom: 50px;
      margin-left: -50px;
      padding: 10px;
    }

    .send-msg-btn {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
