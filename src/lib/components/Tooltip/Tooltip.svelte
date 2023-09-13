<script lang="ts">
  import SvelteTooltip from "svelte-tooltip";
  import Icon from "../Icon/Icon.svelte";

  type TTipPosition = "top" | "bottom" | "left" | "right";

  export let tip: string;
  export let position: TTipPosition;
  export let iconSize = "";
  export let iconColor = "";
  export let tipBgColor =  "#757575";
  export let isActive = false;
</script>

<div class="tooltip-container">
  <SvelteTooltip
    tip={tip}
    top={position === "top"}
    bottom={position === "bottom"}
    left={position === "left"}
    right={position === "right"}
    active={isActive}
    color={tipBgColor}
  >
    <Icon
      iconName="ph:info"
      --szot-icon-color={iconColor}
      --szot-icon-font-size={iconSize}
    />
  </SvelteTooltip>
</div>

<style lang="scss">
  .tooltip-container {
    cursor: pointer;
    color: var(--szot-tooltip-txt-color, #ffffff);
    font-size: var(--szot-tooltip-txt-font-size, 1rem);
    font-weight: var(--szot-tooltip-txt-font-weight, 400);
  }
</style>
