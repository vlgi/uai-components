<script lang="ts">
  import "highlight.js/styles/base16/solarized-dark.css";
  import hljs from "highlight.js";
  import { marked } from "marked";
  import { tick } from "svelte";

  import { texts } from "../data/components-texts";

  // stores
  import { lang } from "../stores";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import CodeEditor from "./CodeEditor.svelte";

  export let data: string; // card description

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

  $: editDescription = false;
</script>

<div class="section-title">
  <Icon iconName="text" --szot-icon-font-size="20px" />
  <h2>{texts.desc[$lang]}</h2>
</div>

{#if !editDescription && data != ""}
  <div class="description markdown-parse" on:click={enableEditing}>
    {@html marked.parse(data)}
  </div>
{:else if !editDescription && data == ""}
  <div class="no-desc" on:click={enableEditing}>
    {texts.addDescription[$lang]}...
  </div>
{:else if editDescription}
  <div
    style="padding: 0 10px;"
    on:keydown={(e) => e.key == "Enter" && !e.shiftKey && disableEditing()}
  >
    <CodeEditor
      on:focusout={() => (editDescription = false)}
      bind:data
      lang={"Markdown"}
    />
  </div>
{/if}

<style lang="scss">
  @import "./card-modal.scss";

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
</style>
