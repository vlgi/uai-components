<script lang="ts">
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
  import { lang } from "../stores";

  // components
  import Modal from "../../Modal/Modal.svelte";
  import CardHandleUsersDropdown from "./CardHandleUsersDropdown.svelte";
  import CardHandleLabelsModal from "./CardHandleLabelsModal.svelte";
  import CardLabel from "./CardLabel.svelte";
  import CodeEditor from "./CodeEditor.svelte";
  import Icon from "../../Icon/Icon.svelte";

  // props
  export let data; // card data
  export let opened = false; // card modal opened

  // local variables
  $: editDescription = false;
  $: handleLabelsModalOpened = false;

  // functions
  import { returnInitialsNames } from "../utils";

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

  function getDonesChecklistItems(checklist): number {
    let dones = 0;
    checklist.items.forEach((item) => {
      if (item.done) dones++;
    });
    return dones / checklist.items.length;
  }
</script>

<Modal bind:opened {...data} --szot-modal-width="700px">
  <div slot="modal-header" class="header" />

  <div slot="modal-content" class="content">
    {#if data.cover}
      <div class="cover" style="background-image: url({data.cover})" />
    {/if}

    <!-- Card general info | title | members | labels -->
    <div class="section">
      <div class="section-icon h1-icon">
        <Icon iconName="card-text-outline" --szot-icon-font-size="25px" />
      </div>
      <div class="section-content">
        <h1
          class="title"
          contenteditable="true"
          bind:textContent={data.title}
        />

        <!-- Members -->
        <h3>{texts.members[$lang]}</h3>
        <div class="section-items">
          <div class="add-item" id="open-avaiable-users">
            <Icon iconName="plus-box" --szot-icon-font-size="25px" />
          </div>
          <CardHandleUsersDropdown bind:data />
          <div class="items-container">
            {#each data.members as member}
              <div
                class="user-avatar"
                style="background-image: url({member.photo});"
                title={`${member.name} (${member.email})`}
              >
                {#if member.photo == ""}{returnInitialsNames(member.name)}{/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Labels -->
        <h3>{texts.labels[$lang]}</h3>
        <div class="section-items">
          <div
            class="add-item"
            on:click={() => (handleLabelsModalOpened = true)}
          >
            <Icon iconName="plus-box" --szot-icon-font-size="25px" />
          </div>
          <CardHandleLabelsModal
            bind:data
            bind:opened={handleLabelsModalOpened}
          />
          <div class="items-container">
            {#each data.labels as label, index}
              <div class="item-wrapper">
                <CardLabel data={label} />
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Card Description -->
    <!-- <div class="section">
      <div class="section-icon h2-icon">
        <Icon iconName="text" --szot-icon-font-size="25px" />
      </div>
      <div class="section-content">
        <h2>{texts.desc[$lang]}</h2>
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
      </div>
    </div> -->

    <!-- Card Attachments -->
    <div class="section">
      <div class="section-icon h2-icon">
        <Icon iconName="attachment" --szot-icon-font-size="27px" />
      </div>
      <div class="section-content">
        <h2>{texts.attachments[$lang]}</h2>
      </div>
    </div>

    <!-- Card Checklists -->
    {#each data.checklists as checklist}
      <div class="section">
        <div class="section-icon h2-icon">
          <Icon
            iconName="checkbox-marked-outline"
            --szot-icon-font-size="25px"
          />
        </div>
        <div class="section-content">
          <h2>{checklist.title}</h2>
          <div class="checklist-progress-bar">
            <span>{(getDonesChecklistItems(checklist) * 100).toFixed(1)}%</span>
            <div class="bar-wrapper">
              <div style="width: {getDonesChecklistItems(checklist) * 100}%;" />
            </div>
          </div>
          {#each checklist.items as item}
            <div class="checklist-item-container">
              <div class="item-icon" on:click={() => (item.done = !item.done)}>
                {#if !item.done}<Icon iconName="checkbox-blank-outline" />{/if}
                {#if item.done}
                  <Icon
                    iconName="checkbox-marked-outline"
                    --szot-icon-color="#5AAC44"
                  />
                {/if}
              </div>
              <span contenteditable="true" bind:textContent={item.title} />

              <div class="item-btn"><Icon iconName="account-plus" /></div>
              <div class="item-btn">
                <Icon iconName="clock-outline" />
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <!-- end modal content -->
  </div>

  <!-- modal footer -->
  <div slot="modal-footer" class="footer">
    <span>My modal footer</span>
  </div>
</Modal>

<style lang="scss">
  @import "./card.scss";
  @import "../index.scss";

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
    margin-top: 1rem;
    margin-bottom: 0.2rem;
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
    border-radius: 10px; // change
    white-space: pre-wrap;
  }

  .preview {
    border-radius: 5px;
    margin: 0 5px; // change
  }

  .content {
    display: grid;
    gap: 1rem;

    h2 {
      font-size: 18px;
    }

    h3 {
      font-size: 16px;
    }

    .cover {
      height: 130px;
      min-height: 130px;
      background-position: center center;
      background-size: contain;
      background-origin: content-box;
      // background-repeat: no-repeat;
      // background-color: rgb(240, 242, 242); // change
    }

    .title {
      font-size: 22px; // change
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .section {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 50px calc(100% - 50px);

      .section-icon {
        display: flex;
        width: 100%;
      }

      .section-icon.h2-icon {
        margin-top: -3px;
      }

      .section-content {
        display: flex;
        flex-direction: column;
        margin-right: 5px; // change

        .add-item {
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }

        .section-items {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 1rem;
          margin-top: 0.2rem;

          .items-container {
            display: flex;
            gap: 0.3rem;
            flex-wrap: wrap;

            .item-wrapper {
              width: fit-content;
            }
          }
        }

        .checklist-progress-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          height: 10px;
          margin: 1rem 0;
          width: 100%;

          span {
            font-size: 12px;
          }

          .bar-wrapper {
            width: 100%;
            border-radius: 5px;
            background-color: #eee;

            div {
              height: 10px;
              background-color: #026aa7;
              border-radius: 5px;
            }
          }
        }

        .checklist-item-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px 0;

          span {
            font-size: 15xp;
            width: 100%;
            margin-left: 5px;
          }

          &:hover {
            background: rgb(245, 245, 245);
            border-radius: 5px;
            cursor: pointer;
          }

          .item-btn {
            // width: 15px;
            // height: 15px;
            padding: 0 5px;
            border-radius: 5px;
            width: fit-content;

            &:hover {
              background: #eee;
            }
          }
        }
      }
    }

    .description {
      cursor: pointer;
    }
  }

  .footer {
    background: #eee;
    color: #333;
    padding: 2rem;
    text-align: center;
    border-radius: 5px; // change
  }
</style>
