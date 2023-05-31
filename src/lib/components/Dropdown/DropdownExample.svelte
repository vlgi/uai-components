<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Dropdown from "./Dropdown.svelte";
  import Button from "../formFields/Button/Button.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Dropdown> {
    triggerStyle?: string;
    scrollStyle?: string;
    containerStyle?: string;
  }

  export let triggerStyle = "top:0; left:0";
  export let scrollStyle = "";
  export let containerStyle = "width:300px; height:300px; margin: 100px 300px";

  // Used to force $$restProps be of type ComponentProps<Dropdown>;
  $: restProps = $$restProps as ComponentProps<Dropdown>;
</script>

<div
  class="container"
  style={containerStyle}
>
  <div
    class="button-wrapper"
    id={restProps.targetId}
    style={triggerStyle}
  >
    <Button>Open</Button>
  </div>

  <Dropdown {...restProps}>
    <span class="item">Item 1</span>
    <span class="item">Item 2</span>
    <span class="item">Item 3 Long text</span>
    <span class="item">Item 4</span>
    <span class="item">Item 5 Long Long Long text</span>
  </Dropdown>

  <div
    class="add-scroll"
    style={scrollStyle}
  />
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
