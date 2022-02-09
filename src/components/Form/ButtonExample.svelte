<script lang="ts">
  import { getContext, hasContext } from "svelte";

  import type { TFormContext } from "./types";

  const isInsideContext = hasContext("FormContext");
  const { fireSubmit } = isInsideContext && getContext<TFormContext>("FormContext");

</script>

<button on:click={ () => isInsideContext && fireSubmit() } on:click>
  Submit
</button>

<style lang="scss">
</style>
