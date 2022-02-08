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
    --color: var(--szot-color, var(--default-color));
    --background-color: var(--szot-background-color, var(--default-background-color));
    --border: var(--szot-border, var(--default-border));
    --font-size: var(--szot-font-size, .9rem);

    &.primary {
      --default-background-color: var(--theme-primary-surface);
      --default-color: var(--theme-txt-on-primary-surface);
    }

    &.secondary {
      --default-background-color: var(--theme-secondary-surface);
      --default-color: var(--theme-txt-on-secondary-surface);
    }

    &.dark {
      --default-background-color: var(--theme-dark-surface);
      --default-color: var(--theme-txt-on-dark-surface);
    }

    &.light {
      --default-background-color: var(--theme-light-surface);
      --default-color: var(--theme-txt-on-light-surface);
    }
    &.outline {
      --default-border: 0.0563rem solid #5F5F5F;
    }

    font-size: var(--font-size);
    padding-left: var(--theme-fields-padding);
    padding-right: var(--theme-fields-padding);
    text-align: center;

    border: var(--border);
    border-radius: var(--theme-small-shape);

    background-color: var(--background-color);
    color: var(--color);
  }

</style>
