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
    position: relative;
    max-width: var(--theme-fields-max-width);
    height: var(--theme-fields-height);
    padding-left: var(--theme-fields-padding);
    padding-right: var(--theme-fields-padding);
    text-align: center;

    border: var(--szot-border,none);
    border-radius: var(--theme-large-shape);

    font-family: var(--theme-font-family);
    font-style: var(--theme-p-font-style);
    font-weight: var(--theme-p-font-weight);
    font-size: var(--theme-p-font-size);
    line-height: var(--theme-p-line-height);

    background-color: var(--szot-background-color );
    color: var(--szot-color,#5F5F5F);
  }
  .primary {
    --szot-background-color: var(--theme-primary);
    --szot-color: var(--theme-txt-on-primary-surface);
  }

  .secondary {
    --szot-background-color: var(--theme-secondary);
    --szot-color: var(--theme-txt-on-secondary-surface);
  }

  .dark {
    --szot-background-color: var(--theme-dark);
    --szot-color: var(--theme-txt-on-dark-surface);
  }

  .light {
    --szot-background-color: var(--theme-light);
    --szot-color: var(--theme-txt-on-light-surface);
  }
  .outline {
    border: var(--szot-border, 0.0563rem solid #5F5F5F);
  }

</style>
