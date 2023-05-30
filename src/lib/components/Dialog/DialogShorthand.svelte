<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Dialog } from "../../index";

  export let type: "confirm"|"confirmCancel"|"info"|"error"|"warning"|"success" = "confirmCancel";

  const dispatch = createEventDispatcher();

  function onConfirm() {
    dispatch("confirm");
  }

  function onCancel() {
    dispatch("cancel");
  }

  function openDialog() {
    Dialog[type]({
      title: "puts",
      content: "ola",
    }, onConfirm, onCancel);
  }
</script>

<button on:click={openDialog}>Open</button>
