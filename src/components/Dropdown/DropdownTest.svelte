<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import Button from "../formFields/Button/Button.svelte";

  export let triggerId: string;
  export let triggerPosition: { top: number, left: number };
  export let scrollSize = { x: 0, y: 0 };
</script>

<div class="container">
  <div
    class="button-wrapper"
    id={triggerId}
    style="top:{triggerPosition.top}px; left:{triggerPosition.left}px"
  >
    <Button>Open</Button>
  </div>

  <Dropdown targetId={triggerId} {...$$restProps}>
    Olá
  </Dropdown>

  <div
    class="add-scroll"
    style="width:{scrollSize.x}px; height:{scrollSize.y}px"
    ></div>
</div>

<style lang="scss">

  .container {
    width: 300px;
    height: 300px;
    overflow: auto;
    position: relative;
  }

  .button-wrapper {
    position: absolute;
  }
</style>
