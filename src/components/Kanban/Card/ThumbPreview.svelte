<script lang="ts">
  import { checkIfIsAnImageExt } from "../../../helpers/utils";

  // props
  export let file = "";
  export let radius = "5px";
  export let w = "125px";
  export let h = "75px";

  function getExtension(f: string): string {
    const arr = f.split(".");
    if (arr.length > 1) return arr.pop();
    return "";
  }

  $: type = getExtension(file);
</script>

<div
  class="thumb-container"
  style="background-image: url({file}); border-radius: {radius}; width: {w}; height: {h}"
>
  {#if !checkIfIsAnImageExt(file)}<span>{type}</span>{/if}
</div>

<style lang="scss">
  .thumb-container {
    display: flex;
    align-items: center;
    background-color: #eee;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    color: #bbb;
    font-size: 20px;
    font-weight: 800;
    justify-content: center;
    outline: 0;
  }
</style>
