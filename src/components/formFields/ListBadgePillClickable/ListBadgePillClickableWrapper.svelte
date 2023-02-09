<script lang="ts">
  import ListBadgePillClickable from "./ListBadgePillClickable.svelte";

  type TBadgeProps = {
    value: string;
    checked: boolean;
    label?: string;
  };

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";
  type TDirection = "column" | "row";

  export let badgeItems: TBadgeProps[] = [];

  export let forceInvalid = false;

  export let values: Array<string> = [];

  export let iconPosition: TIconPosition = "none";

  export let badgeStyle: TBadgeStyle = "dark";

  export let direction: TDirection = "row";

  export let style = "";
</script>

<div {style}>
  <ListBadgePillClickable
    {badgeItems}
    {forceInvalid}
    name={"test"}
    bind:values
    {iconPosition}
    {badgeStyle}
    {direction}
    {...$$restProps}
    on:checkItem
  />
</div>

<p>{JSON.stringify(values)}</p>
