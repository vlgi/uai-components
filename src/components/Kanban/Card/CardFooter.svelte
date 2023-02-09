<script lang="ts">
  import { texts } from "../data/components-texts";
  import type { TDefautCard } from "../data/types";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";

  // props
  export let data: TDefautCard;
</script>

<div class="card-footer">
  <div class="card-footer-info">
    {#if data.desc !== ""}
      <div class="card-footer-item" title={texts.hasDesc}>
        <Icon iconName="text" --szot-icon-font-size="15px"/>
      </div>
    {/if}
    {#if data.comments.length > 0}
      <div class="card-footer-item" title={texts.hasComments}>
        <Icon iconName="chat-outline" --szot-icon-font-size="15px"/>
        <span>
          {data.comments.length}
        </span>
      </div>
    {/if}
    {#if data.allChecklistsItems.length > 0}
      <div class="card-footer-item" title={texts.hasChecklists}>
        <Icon iconName="checkbox-marked-outline" --szot-icon-font-size="15px"/>
        <span>
          {data.allDoneChecklistsItems.length} /
          {data.allChecklistsItems.length}
        </span>
      </div>
    {/if}
    {#if data.attachments.length > 0}
      <div class="card-footer-item" title={texts.hasAttachments}>
        <Icon iconName="attachment" --szot-icon-font-size="15px"/>
        <span>
          {data.attachments.length}
        </span>
      </div>
    {/if}
  </div>
  <div class="card-footer-users">
    {#if data.members.length > 0}
      {#each data.members.slice(0, 3).reverse() as member}
        <div class="user-avatar-container">
          <CardUserAvatar data={member} />
        </div>
      {/each}
      {#if data.members.length > 3 }
        <div class="user-avatar-container">
          <CardUserAvatar number={data.members.length - 3} />
        </div>
      {/if}
    {/if}
  </div>
</div>

<style lang="scss">
  .card-footer {
    display: flex;
    justify-content: space-between;
    padding: 5px; // change

    .card-footer-info {
      display: grid;
      grid-auto-flow: column;
      gap: .6rem; // change

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
        margin-left: -17px;
      }
    }
  }
</style>
