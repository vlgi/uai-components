<script lang="ts">
  type TbadgeStyle = "primary" | "secondary" | "dark" | "light" | "outline";
  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "primary";
</script>

<span class="badge {badgeStyle}">
  <slot />
</span>

<style lang="scss">
  .badge {
    --badge-color: var(--szot-color, var(--badge-default-color));
    --badge-background-color: var(--szot-background-color, var(--badge-default-background-color));
    --badge-border: var(--szot-border, var(--badge-default-border));

    &.primary {
      --badge-default-background-color: var(--theme-primary);
      --badge-default-color: var(--theme-txt-on-primary-surface);
    }

    &.secondary {
      --badge-default-background-color: var(--theme-secondary);
      --badge-default-color: var(--theme-txt-on-secondary-surface);
    }

    &.dark {
      --badge-default-background-color: var(--theme-dark);
      --badge-default-color: var(--theme-txt-on-dark-surface);
    }

    &.light {
      --badge-default-background-color: var(--theme-light);
      --badge-default-color: var(--theme-txt-on-light-surface);
    }
    &.outline {
      --badge-default-border: 0.0563rem solid #5F5F5F;
    }

    padding-left: var(--theme-fields-padding);
    padding-right: var(--theme-fields-padding);
    text-align: center;

    border: var(--badge-border);
    border-radius: var(--theme-small-shape);

    background-color: var(--badge-background-color);
    color: var(--badge-color);
  }

</style>
