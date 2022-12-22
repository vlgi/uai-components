<script lang="ts">
  import { tick } from "svelte";
  import hljs from "highlight.js";
  import "highlight.js/styles/base16/solarized-dark.css";

  // props
  export let data: string;
  export let lang: string;

  // functions
  import {
    getCaretCharacterOffsetWithin,
    setCurrentCursorPosition,
  } from "../utils";

  async function highlightOnEditing(e) {
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
    border-radius: 10px; // change
  }
</style>
