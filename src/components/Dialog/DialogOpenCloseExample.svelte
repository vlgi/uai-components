<script lang="ts">
  import Dialog from "./Dialog.svelte";

  export let opened = false;

  function openDialog() {
    opened = true;
  }
</script>

<button on:click={openDialog}>Open</button>
<Dialog bind:opened title="my dialog title" content="hi! please confirme to go on."/>
