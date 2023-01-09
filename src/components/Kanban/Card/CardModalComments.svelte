<script lang="ts">
  import { texts } from "../data/components-texts";

  // stores
  import { lang, logged } from "../stores";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";
  import Input from "../../formFields/Input/Input.svelte";

  export let data;

  let msg = "";

  function checkIfIsTheLoggedUser(user): boolean {
    if (JSON.stringify($logged.user) === JSON.stringify(user)) return true;
    return false;
  }

  function onTypeMsg(e): void {
    msg = e.target.value;
  }

  function sendMsg(): void {
    if (msg == "") return;
    const comment = {
      text: msg,
      user: $logged.user,
      date: new Date(),
    };
    data = [...data, comment];
    msg = "";
  }

  function removeMsg(): void {
    if (indexToDelete == -1) return;
    const msgs = [...data];
    msgs.splice(indexToDelete, 1);
    data = [...msgs];
    openAlertModal = false;
  }

  $: openAlertModal = false;
  $: indexToDelete = -1;
</script>

<Modal bind:opened={openAlertModal} --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeCommentAlert[$lang]}</h3>
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => (openAlertModal = false)}
      size="medium"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      {texts.cancel[$lang]}
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
      on:click={removeMsg}
    >
      {texts.removeComment[$lang]}
    </Button>
  </div>
</Modal>

{#if data.length > 0}
  <div class="section-title">
    <Icon iconName="chat-plus-outiline" --szot-icon-font-size="20px" />
    <h2>{texts.comments[$lang]}</h2>
  </div>
{/if}

<div class="comments">
  {#each data as comment, index}
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
            class="comment-text comment-editable"
            contenteditable="true"
            bind:textContent={comment.text}
          />
        {:else}
          <div class="comment-text">
            {comment.text}
          </div>
        {/if}
        <div class="comment-date">{comment.date}</div>
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
  <CardUserAvatar data={$logged.user} info={true} />
  <Input
    name="comment"
    label={texts.addComment[$lang]}
    type="text"
    value={msg}
    on:input={(e) => onTypeMsg(e)}
    on:change={sendMsg}
    --szot-input-margin-top="0"
    --szot-input-margin-bottom="0"
  />
  <div class="send-msg" on:click={sendMsg}>
    <Icon iconName="send-outline" />
  </div>
</div>

<style lang="scss">
  @import "./card-modal.scss";

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
        max-width: 80%;
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
          &:hover {
            background: #addfac;
            border-radius: var(--radius-pattern) var(--radius-pattern) 0 0;
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

      .msg-container {
        background: #c4f2c3;
      }
    }
  }

  .msg-input {
    display: grid;
    grid-template-columns: 30px calc(100% - 80px) 20px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;

    .send-msg {
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
