<script lang="ts">
  import type { TCard } from "../data/types";
  import { tick } from "svelte";
  import { marked } from "marked";
  import { texts } from "../data/components-texts";
  import hljs from "highlight.js";
  import "highlight.js/styles/base16/solarized-dark.css";

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
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

  // stores
  import { lang, allUsers, board } from "../stores";

  // // components
  import CardChecklists from "./CardChecklists.svelte";
  import CardHandleLabelsModal from "./CardHandleLabelsModal.svelte";
  import CardHandleUsersModal from "./CardHandleUsersModal.svelte";
  import CardLabel from "./CardLabel.svelte";
  import CardUserAvatar from "./CardUserAvatar.svelte";
  import CodeEditor from "./CodeEditor.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";

  // props
  export let data: TCard; // card data
  export let cli: number; // card list index
  export let opened = false; // card modal opened

  // local variables
  $: editDescription = false;
  $: handleLabelsModalOpened = false;
  $: selectCardUserModalOpened = false;
  $: resetDraggingChecklistsElements = false;

  async function enableEditing() {
    editDescription = true;
    await tick();
    hljs.highlightAll();
  }

  async function disableEditing() {
    editDescription = false;
    await tick();
    hljs.highlightAll();
  }
</script>

<Modal bind:opened {...data} --szot-modal-width="700px">
  <div slot="modal-header" class="header" />

  <div
    slot="modal-content"
    class="content"
    on:mouseup={() => (resetDraggingChecklistsElements = true)}
  >
    {#if data.cover}
      <div class="cover" style="background-image: url({data.cover})" />
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
        <p>{texts.inList[$lang]} - <span>{$board.lists[cli].title}</span></p>
      </div>

      <!-- Members -->
      <div class="section-title"><h3>{texts.members[$lang]}</h3></div>
      <div class="section-items">
        <div
          class="add-btn"
          on:click={() => (selectCardUserModalOpened = true)}
        >
          <Icon iconName="plus-box" --szot-icon-font-size="20px" />
        </div>
        {#each data.members as member}
          <CardUserAvatar data={member} />
        {/each}
      </div>
      <CardHandleUsersModal
        bind:list={$allUsers}
        bind:data
        bind:opened={selectCardUserModalOpened}
      />

      <!-- Labels -->
      <div class="section-title"><h3>{texts.labels[$lang]}</h3></div>
      <div class="section-items">
        <div class="add-btn" on:click={() => (handleLabelsModalOpened = true)}>
          <Icon iconName="plus-box" --szot-icon-font-size="20px" />
        </div>
        {#each data.labels as label}
          <div class="item-wrapper">
            <CardLabel bind:data={label} bind:cardData={data} />
          </div>
        {/each}
      </div>
      <CardHandleLabelsModal bind:data bind:opened={handleLabelsModalOpened} />
    </section>

    <!-- Card Description -->
    <section>
      <div class="section-title">
        <Icon iconName="text" --szot-icon-font-size="20px" />
        <h2>{texts.desc[$lang]}</h2>
      </div>

      {#if !editDescription}
        <div class="description markdown-parse" on:click={enableEditing}>
          {@html marked.parse(data.desc)}
        </div>
      {/if}
      {#if editDescription}
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
      <div class="section-title">
        <Icon iconName="attachment" --szot-icon-font-size="20px" />
        <h2>{texts.attachments[$lang]}</h2>
      </div>
    </section>

    <!-- Card Checklists -->
    <section>
      <CardChecklists bind:data bind:reset={resetDraggingChecklistsElements} />
    </section>

    <!-- end modal content -->
  </div>

  <!-- modal footer -->
  <!-- <div slot="modal-footer" class="footer">
    <span>My modal footer</span>
  </div> -->
</Modal>

<style lang="scss">
  @import "../index.scss";
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

  :global(.markdown-parse > h1, .markdown-parse > h2, .markdown-parse > h3) {
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
    border-radius: var(--szot-radius);
    white-space: pre-wrap;
  }

  h1,
  h2,
  h3:focus {
    padding: 0 10px;
  }

  .cover {
    height: 130px;
    min-height: 130px;
    background-position: center center;
    background-size: contain;
    background-origin: content-box;
    background-color: rgb(240, 242, 242); // change
    // background-repeat: no-repeat;
  }

  .section-items {
    p {
      font-size: 15px;

      span {
        text-decoration: underline;
      }
    }
  }

  .description {
    margin: 0 5px;
  }

  .footer {
    background: #eee;
    color: #333;
    padding: 2rem;
    text-align: center;
    border-radius: var(--szot-radius);
  }

  .add-btn {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
