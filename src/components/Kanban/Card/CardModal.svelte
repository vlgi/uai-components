<script lang="ts">
  import type {
    TDefautCard, TBoard, TCardLabel,
} from "../data/types";
  import { texts } from "../data/components-texts";

  // stores
  import { allUsers } from "../stores";

  // components
  import Button from "../../formFields/Button/Button.svelte";
  import CardHandleLabelsModal from "./CardHandleLabelsModal.svelte";
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

  // props
  export let data: TDefautCard; // card data
  export let boardData: TBoard;
  export let labelsData: TCardLabel[] = [];
  export let ci: number; // card index
  export let cli: number; // card list index
  export let opened = false; // card modal opened
  export let canMoveCard = true;
  export let canDeleteCard = true;

  let handleLabelsModalOpened = false;
  let selectCardUserModalOpened = false;
  let resetDraggingChecklistsElements = false;
  let showAdd = false;
  let attCover = false;
  let edittingDesc = false;
  let cover = "";

  $: cover = getCover(data.attachments);
</script>

<Modal bind:opened {...data} --szot-modal-width="700px" on:closeModal>
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
    on:mouseup={() => {
      resetDraggingChecklistsElements = true;
    }}
  >
    {#if cover !== ""}
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

    <!-- Card general info: title | members | labels -->
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
        <p>{texts.inList} - <span>{boardData.lists[cli].title}</span></p>
      </div>

      <!-- Members -->
      {#if data.members.length > 0}
        <div class="section-title"><h3>{texts.members}</h3></div>
        <div class="section-items">
          <div
            class="add-btn"
            on:click={() => {
              selectCardUserModalOpened = true;
            }}
          >
            <Icon iconName="plus-box" --szot-icon-font-size="20px" />
          </div>
          {#each data.members as member}
            <CardUserAvatar
              data={member}
              on:click={() => {
                selectCardUserModalOpened = true;
              }}
            />
          {/each}
        </div>
      {/if}
      <CardHandleUsersModal
        bind:list={$allUsers}
        bind:data={data.members}
        bind:opened={selectCardUserModalOpened}
      />

      <!-- Labels -->
      {#if data && data.labels.length > 0}
        <div class="section-title"><h3>{texts.labels}</h3></div>
        <div class="section-items">
          <div
            class="add-btn"
            on:click={() => {
              handleLabelsModalOpened = true;
            }}
          >
            <Icon iconName="plus-box" --szot-icon-font-size="20px" />
          </div>
          {#each data.labels as label}
            <div
              class="item-wrapper"
              on:click={() => {
                handleLabelsModalOpened = true;
              }}
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
    <section style="margin-top: 10px;" >
      <div class="section-title"><h3>{texts.desc}</h3></div>
      {#if data.desc !== "" || edittingDesc}
        <div
          contenteditable="true"
          bind:textContent={data.desc}
          class="card-description editable"
        />
      {:else if data.desc === ""}
        <div class="card-description"
          on:click={() => {
            edittingDesc = true;
          }}
        >
          {texts.addDescription}
        </div>
      {/if}
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
    <section>
      <CardModalChecklists
        bind:data
        bind:reset={resetDraggingChecklistsElements}
      />
    </section>

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
  @use "src/components/Kanban/styles.scss";
  @use "src/components/Kanban//Card/card-modal-styles.scss";

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

  .card-description {
    white-space: pre-line;
    padding: 10px;
    background: #eee;
    border-radius: var(--radius-pattern);
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
