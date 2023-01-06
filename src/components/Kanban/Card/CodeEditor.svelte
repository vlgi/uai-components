<script lang="ts">
  import hljs from "highlight.js";
  import "highlight.js/styles/base16/solarized-dark.css";
  import { tick } from "svelte";

  import {
    getCaretCharacterOffsetWithin,
    setCurrentCursorPosition,
  } from "../utils";

  // props
  export let data: string;
  export let lang: string;

  async function highlightOnEditing(e): Promise<any> {
    await tick();
    let pos = getCaretCharacterOffsetWithin(e.target);
    hljs.highlightElement(e.target);
    setCurrentCursorPosition(pos, e.target);
  }
</script>

<!-- svelte-ignore a11y-autofocus -->
<pre>
    <code
    contenteditable="true"
    class="language-{lang} preview hljs"
    autofocus
    bind:textContent={data}
    on:keypress={highlightOnEditing}
    on:focusout
  />
</pre>

<style lang="scss">
  .preview {
    border-radius: var(--radius-pattern);
  }
</style>
