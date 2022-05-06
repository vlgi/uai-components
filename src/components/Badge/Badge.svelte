<script lang="ts">
  import type { TbadgeStyle, TbadgeStyleType } from "./types";

  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "primary";

  export let badgeStyleType: TbadgeStyleType = "filled";
</script>

<span class="badge {badgeStyle} {badgeStyleType}">
  <span class="text"><slot /></span>
</span>

<style lang="scss">
  @use 'src/styles/mixins' as m;
  .badge {
    --color: var(--szot-badge-color, var(--default-color));
    --background-color: var(--szot-badge-background-color, var(--default-background-color));
    --border: var(--szot-badge-border, var(--default-border));
    --border-color: var(--szot-badge-border-color, var(--default-border-color));
    --font-size: var(--szot-badge-font-size, .9rem);

    &.primary {
      --default-background-color: var(--theme-primary-surface);
      --default-color: var(--theme-txt-on-primary-surface);
      --default-border-color: var(--theme-primary-surface);
    }

    &.secondary {
      --default-background-color: var(--theme-secondary-surface);
      --default-color: var(--theme-txt-on-secondary-surface);
      --default-border-color: var(--theme-secondary-surface);
    }

    &.dark {
      --default-background-color: var(--theme-dark-surface);
      --default-color: var(--theme-txt-on-dark-surface);
      --default-border-color: var(--theme-dark-surface);
    }

    &.light {
      --default-background-color: var(--theme-light-surface);
      --default-color: var(--theme-txt-on-light-surface);
      --default-border-color: var(--theme-light-surface);
    }

    &.filled {
      --border-color: transparent;
    }
    &.outline {
      --default-color: var(--border-color);
      --default-background-color: transparent;
      --default-border: var(--theme-small-border);
    }

    &.not-filled {
      --default-color: var(--default-border-color);
      --border-color: transparent;
      --default-background-color: transparent;
    }

    font-size: var(--font-size);
    padding-left: var(--theme-fields-padding);
    padding-right: var(--theme-fields-padding);
    text-align: center; 
    @include m.border(var(--border), var(--border-color));
    border-radius: var(--theme-small-shape);
    background: var(--background-color);
    display: inline-block;

    .text {
      white-space: nowrap;
      @include m.text-color(var(--color));
    }
  }

</style>
