<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import Button from "../formFields/Button/Button.svelte";

  export let triggerId: string;
  export let triggerStyle = "top:0; left:0";
  export let scrollStyle = "";
  export let containerStyle = "width:300px; height:300px; margin: 100px 300px";
</script>

<div class="container" style={containerStyle}>
  <div class="button-wrapper" id={triggerId} style={triggerStyle}>
    <Button>Open</Button>
  </div>

  <Dropdown targetId={triggerId} {...$$restProps}>
    <span class="item">Item 1</span>
    <span class="item">Item 2</span>
    <span class="item">Item 3 Long text</span>
    <span class="item">Item 4</span>
    <span class="item">Item 5 Long Long Long text</span>
  </Dropdown>

  <div class="add-scroll" style={scrollStyle} />
</div>

<style lang="scss">
  .container {
    overflow: auto;
    position: relative;
    border: solid 2px black;
  }

  .item {
    display: block;
  }

  .button-wrapper {
    position: absolute;
  }
</style>
