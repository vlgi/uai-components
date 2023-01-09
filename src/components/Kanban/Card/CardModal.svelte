<script lang="ts">
  import type { TCard, TBoard, TCustomBoard, TCardLabel } from "../data/types";
  import { texts } from "../data/components-texts";

  // stores
  import { lang, allUsers } from "../stores";

  // components
  import Button from "../../formFields/Button/Button.svelte";
  import CardHandleLabelsModal from "./CardHandleLabelsModal.svelte";
  import CardHandleDueDates from "./CardHandleDueDates.svelte";
  import CardHandleUsersModal from "./CardHandleUsersModal.svelte";
  import CardLabel from "./CardLabel.svelte";
  import CardModalAttachments from "./CardModalAttachments.svelte";
  import CardModalChecklists from "./CardModalChecklists.svelte";
  import CardModalComments from "./CardModalComments.svelte";
  import CardModalMenu from "./CardModalMenu.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";

  // functions
  import { getCover } from "../utils";
  import CardModalDescription from "./CardModalDescription.svelte";

  // props
  export let data: TCard; // card data
  export let boardData: TBoard | TCustomBoard;
  export let labelsData: TCardLabel[] = [];
  export let ci: number; // card index
  export let cli: number; // card list index
  export let opened = false; // card modal opened
  export let canMoveCard = true;
  export let canDeleteCard = true;

  $: handleLabelsModalOpened = false;
  $: selectCardUserModalOpened = false;
  $: resetDraggingChecklistsElements = false;
  $: showAdd = false;
  $: attCover = false;
  $: cover = getCover(data.attachments);
</script>

<Modal bind:opened {...data} --szot-modal-width="700px">
  <div class="card-modal-header" slot="modal-header">
    <div class="modal-menu-btn" id="modal-menu">
      <Button icon="dots-horizontal" size="round" buttonStyle="light" />
      <CardModalMenu
        bind:handleLabelsModalOpened
        bind:selectCardUserModalOpened
        bind:showAdd
        bind:data
        bind:boardData
        bind:opened
        {cli}
        {ci}
        {canMoveCard}
        {canDeleteCard}
      />
    </div>
  </div>

  <div
    slot="modal-content"
    class="content"
    on:mouseup={() => (resetDraggingChecklistsElements = true)}
  >
    {#if cover != ""}
      <div class="cover" style="background-image: url({cover})">
        <div
          class="item-btn"
          on:click={() => {
            showAdd = true;
            attCover = true;
          }}
        >
          <Icon iconName="image" --szot-icon-color="white" />
        </div>
      </div>
    {/if}

    <!-- Card general info | title | members | labels -->
    <section>
      <!-- Card header -->
      <div class="section-title modal-title">
        <Icon iconName="card-text-outline" --szot-icon-font-size="20px" />
        <h1
          class="title editable"
          contenteditable="true"
          bind:textContent={data.title}
        />
      </div>
      <div class="section-items">
        <p>{texts.inList[$lang]} - <span>{boardData.lists[cli].title}</span></p>
      </div>

      <!-- Members -->
      {#if data.members.length > 0}
        <div class="section-title"><h3>{texts.members[$lang]}</h3></div>
        <div class="section-items">
          <div
            class="add-btn"
            on:click={() => (selectCardUserModalOpened = true)}
          >
            <Icon iconName="plus-box" --szot-icon-font-size="20px" />
          </div>
          {#each data.members as member}
            <CardUserAvatar
              data={member}
              on:click={() => (selectCardUserModalOpened = true)}
            />
          {/each}
        </div>
      {/if}
      <CardHandleUsersModal
        bind:list={$allUsers}
        bind:data
        bind:opened={selectCardUserModalOpened}
      />

      <!-- Labels -->
      {#if data.labels.length > 0}
        <div class="section-title"><h3>{texts.labels[$lang]}</h3></div>
        <div class="section-items">
          <div
            class="add-btn"
            on:click={() => (handleLabelsModalOpened = true)}
          >
            <Icon iconName="plus-box" --szot-icon-font-size="20px" />
          </div>
          {#each data.labels as label}
            <div
              class="item-wrapper"
              on:click={() => (handleLabelsModalOpened = true)}
            >
              <CardLabel
                bind:boardData
                bind:data={label}
                bind:cardData={data}
              />
            </div>
          {/each}
        </div>
      {/if}
      <CardHandleLabelsModal
        bind:boardData
        bind:labelsData
        bind:data
        bind:opened={handleLabelsModalOpened}
      />
    </section>

    <!-- Card Description -->
    <section>
      <CardModalDescription bind:data={data.desc} />
    </section>

    <!-- Card Attachments -->
    <section>
      <CardModalAttachments
        bind:data={data.attachments}
        bind:showAdd
        bind:isCover={attCover}
      />
    </section>

    <!-- Card Checklists -->
    {#if data.checklists.length > 0}
      <section>
        <CardModalChecklists
          bind:data
          bind:reset={resetDraggingChecklistsElements}
        />
      </section>
    {/if}

    <!-- Card Comments -->
    <section>
      <CardModalComments bind:data={data.comments} />
    </section>

    <!-- end modal content -->
  </div>

  <!-- modal footer -->
  <!-- <div slot="modal-footer" class="footer">
    <span>My modal footer</span>
  </div> -->
</Modal>

<style lang="scss">
  @import "./card-modal.scss";

  :global(.markdown-parse > h1) {
    font-size: 18px;
  }

  :global(.markdown-parse > h2) {
    font-size: 16px;
  }

  :global(.markdown-parse > h3) {
    font-size: 14px;
  }

  :global(.markdown-parse > h4) {
    font-size: 12px;
  }

  :global(.markdown-parse > h1, .markdown-parse > h2, .markdown-parse
      > h3, .markdown-parse > h4) {
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 500;
  }

  :global(.markdown-parse > ol > li) {
    margin-left: 1.8rem; // change
    font-size: 14px;
  }

  :global(.markdown-parse > ul > li) {
    margin-left: 2rem; // change
    font-size: 14px;
  }

  :global(.markdown-parse code) {
    border-radius: var(--radius-pattern);
    white-space: pre-wrap;
  }

  .modal-menu-btn {
    z-index: 2;
  }

  h1,
  h2,
  h3:focus {
    padding: 0 10px;
  }

  .card-modal-header {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }

  .cover {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 130px;
    min-height: 130px;
    background-position: center center;
    background-size: contain;
    background-origin: content-box;
    background-color: rgb(240, 242, 242); // change
    // background-repeat: no-repeat;

    .item-btn {
      margin: 5px;
      z-index: 0;
      background: rgba(0, 0, 0, 0.5);

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .section-items {
    p {
      font-size: 15px;

      span {
        text-decoration: underline;
      }
    }
  }

  .add-btn {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
