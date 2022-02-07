<script lang="ts">
  type TbadgeStyle = "primary" | "secondary" | "dark" | "light" | "outline" | "custom";
  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "primary";
</script>

<span class="badge {badgeStyle}">
  <slot />
</span>

<style lang="scss">
  .badge {
    padding-left: var(--theme-fields-padding);
    padding-right: var(--theme-fields-padding);
    text-align: center;

    border: var(--szot-border,none);
    border-radius: var(--theme-large-shape);

    background-color: var(--szot-background-color );
    color: var(--szot-color,#5F5F5F);

    &.primary {
      --szot-background-color: var(--theme-primary);
      --szot-color: var(--theme-txt-on-primary-surface);
    }

    &.secondary {
      --szot-background-color: var(--theme-secondary);
      --szot-color: var(--theme-txt-on-secondary-surface);
    }

    &.dark {
      --szot-background-color: var(--theme-dark);
      --szot-color: var(--theme-txt-on-dark-surface);
    }

    &.light {
      --szot-background-color: var(--theme-light);
      --szot-color: var(--theme-txt-on-light-surface);
    }
    &.outline {
      border: var(--szot-border, 0.0563rem solid #5F5F5F);
    }
  }

</style>
