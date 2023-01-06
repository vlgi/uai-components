<script lang="ts">
  import "highlight.js/styles/base16/solarized-dark.css";
  import hljs from "highlight.js";
  import { marked } from "marked";
  import { tick } from "svelte";

  import type { TCard, TBoard, TCustomBoard, TCardLabel } from "../data/types";
  import { texts } from "../data/components-texts";
  import { checklist } from "../data/empty-data";

  // stores
  import { lang, allUsers } from "../stores";

  // components
  import Dropdown from "../../Dropdown/Dropdown.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import CardChecklists from "./CardChecklists.svelte";
  import CardHandleLabelsModal from "./CardHandleLabelsModal.svelte";
  import CardHandleUsersModal from "./CardHandleUsersModal.svelte";
  import CardLabel from "./CardLabel.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";
  import CodeEditor from "./CodeEditor.svelte";
  import ThumbPreview from "./ThumbPreview.svelte";
  import CardAttachments from "./CardAttachments.svelte";
  import CardComments from "./CardComments.svelte";

  // functions
  import { getCover } from "../utils";

  // props
  export let data: TCard; // card data
  export let boardData: TBoard | TCustomBoard;
  export let labelsData: TCardLabel[] = [];
  export let cli: number; // card list index
  export let opened = false; // card modal opened

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lan) {
      const language = hljs.getLanguage(lan) ? lan : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false,
  });

  async function enableEditing(): Promise<any> {
    editDescription = true;
    await tick();
    hljs.highlightAll();
  }

  async function disableEditing(): Promise<any> {
    editDescription = false;
    await tick();
    hljs.highlightAll();
  }

  async function addChecklist(): Promise<any> {
    const emptyChecklist = { ...checklist };
    data.checklists = [...data.checklists, emptyChecklist];
    await tick();
    const i = data.checklists.length - 1;
    const el: HTMLElement = document.querySelector(`.checklist-title-${i}`);
    el.focus();
  }

  $: editDescription = false;
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
      <Dropdown
        targetId="modal-menu"
        enableAutAdjust={false}
        dropdownAlignment="bottomRight"
        --szot-dropdown-padding="0"
      >
        <div class="drop-menu-container">
          <div class="drop-menu-section">
            {texts.cardAction[$lang]}
          </div>
          <div class="divider" />
          <div class="item" on:click={() => (selectCardUserModalOpened = true)}>
            {texts.addMember[$lang]}
          </div>
          <div class="item" on:click={() => (handleLabelsModalOpened = true)}>
            {texts.addLabel[$lang]}
          </div>
          <div class="item" on:click={addChecklist}>
            {texts.addChecklist[$lang]}
          </div>
          <div class="item" on:click={() => (showAdd = !showAdd)}>
            {texts.addAttachment[$lang]}
          </div>
        </div>
      </Dropdown>
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
      <div class="section-title">
        <Icon iconName="text" --szot-icon-font-size="20px" />
        <h2>{texts.desc[$lang]}</h2>
      </div>

      {#if !editDescription && data.desc != ""}
        <div class="description markdown-parse" on:click={enableEditing}>
          {@html marked.parse(data.desc)}
        </div>
      {:else if !editDescription && data.desc == ""}
        <div class="no-desc" on:click={enableEditing}>
          {texts.addDescription[$lang]}...
        </div>
      {:else if editDescription}
        <div
          style="padding: 0 10px;"
          on:keydown={(e) =>
            e.key == "Enter" && !e.shiftKey && disableEditing()}
        >
          <CodeEditor
            on:focusout={() => (editDescription = false)}
            bind:data={data.desc}
            lang={"Markdown"}
          />
        </div>
      {/if}
    </section>

    <!-- Card Attachments -->
    <section>
      <CardAttachments
        bind:data={data.attachments}
        bind:showAdd
        bind:isCover={attCover}
      />
    </section>

    <!-- Card Checklists -->
    {#if data.checklists.length > 0}
      <section>
        <CardChecklists
          bind:data
          bind:reset={resetDraggingChecklistsElements}
        />
      </section>
    {/if}

    <!-- Card Comments -->
    <section>
      <CardComments bind:data={data.comments} />
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

  .no-desc,
  .description {
    cursor: pointer;
  }

  .description {
    margin: 0 5px;
  }

  .no-desc {
    background: #eee;
    padding: 5px 10px;
    min-height: 70px;
    border-radius: var(--radius-pattern);
    font-size: 15px;
  }

  .footer {
    background: #eee;
    color: #333;
    padding: 2rem;
    text-align: center;
    border-radius: var(--radius-pattern);
  }

  .add-btn {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
