<script lang="ts">
  import { texts } from "../data/components-texts";

  // stores
  import { lang } from "../stores";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";

  // props
  export let data;
</script>

<div class="card-footer">
  <div class="card-footer-info">
    {#if data.desc != ""}
      <div class="card-footer-item" title={texts.hasDesc[$lang]}>
        <Icon iconName="text" />
      </div>
    {/if}
    {#if data.comments.length > 0}
      <div class="card-footer-item" title={texts.hasComments[$lang]}>
        <Icon iconName="chat-outline" />
        <span>
          {data.comments.length}
        </span>
      </div>
    {/if}
    {#if data.allChecklistsItems.length > 0}
      <div class="card-footer-item" title={texts.hasChecklists[$lang]}>
        <Icon iconName="checkbox-marked-outline" />
        <span>
          {data.allDoneChecklistsItems.length} /
          {data.allChecklistsItems.length}
        </span>
      </div>
    {/if}
    {#if data.attachments.length > 0}
      <div class="card-footer-item" title={texts.hasAttachments[$lang]}>
        <Icon iconName="attachment" />
        <span>
          {data.attachments.length}
        </span>
      </div>
    {/if}
  </div>
  <div class="card-footer-users">
    {#if data.members.length > 0}
      {#each data.members.slice(0, 5).reverse() as member}
        <div class="user-avatar-container">
          <CardUserAvatar data={member} />
        </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .card-footer {
    display: flex;
    justify-content: space-between;
    background-color: var(--card-background-color);
    padding: 5px; // change
    border-radius: 0 0 var(--radius-pattern) var(--radius-pattern);

    .card-footer-info {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem; // change

      .card-footer-item {
        display: grid;
        grid-auto-flow: column;
        gap: 0.2rem; // change
        align-items: center;

        span {
          height: fit-content;
          font-size: 12px; // change
        }
      }
    }

    .card-footer-users {
      display: grid;
      grid-auto-flow: column;

      .user-avatar-container {
        margin-left: -15px;
      }
    }
  }
</style>
