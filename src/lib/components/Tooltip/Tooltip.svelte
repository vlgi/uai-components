<script lang="ts">
  //import { tooltip } from './tooltip';
  import Button from "$components/formFields/Button/Button.svelte";
  import SvelteTooltip from "svelte-tooltip";

  type Tposition = "top" | "bottom" | "left" | "right";
  type TTooltipStyle = "dark" | "light";

  export let message: string;
  export let position: Tposition;
  export let tooltipStyle: TTooltipStyle = "dark";
  export let isActive = false;
</script>

<div class="tooltip-container">
  <SvelteTooltip
    tip={message}
    top={position === "top"}
    bottom={position === "bottom"}
    left={position === "left"}
    right={position === "right"}
    active={isActive}
  >
    <Button
      buttonStyleType="not-filled"
      size="round"
      icon="ph:info"
      buttonStyle={tooltipStyle}
    />
  </SvelteTooltip>
</div>

<style lang="scss">
  .tooltip-container {
    color: #ffffff;
  }
</style>
