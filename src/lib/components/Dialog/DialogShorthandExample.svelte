<script lang="ts">
  import { createEventDispatcher } from "svelte";

  // Import directly from the exported object by this package
  // because the shorthand is injected inside the Dialog svelte class as a static method
  import { Dialog } from "../../index";

  export let type: "confirm" | "confirmCancel" | "info" | "error" | "warning" | "success" =
    "confirmCancel";

  const dispatch = createEventDispatcher();

  function onConfirm() {
    dispatch("confirm");
  }

  function onCancel() {
    dispatch("cancel");
  }

  function openDialog() {
    Dialog[type](
      {
        title: "puts",
        content: "ola",
      },
      onConfirm,
      onCancel
    );
  }
</script>

<button on:click={openDialog}>Open</button>
