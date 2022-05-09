<script lang="ts">
  import BadgePillClickable from "./BadgePillClickable.svelte";

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark";

  export let label = "";

  export let checked = false;

  export let iconPosition: TIconPosition = "none";

  export let badgeStyle: TBadgeStyle = "dark";

  export let style = "";
</script>

<div {style}>
  <BadgePillClickable
    {label}
    name="test"
    {checked}
    {iconPosition}
    {badgeStyle}
    on:checkItem
    {...$$restProps}
  />
</div>
