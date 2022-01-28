<script lang="ts">
  type TbadgeStyle = "Primary" | "Secondary" | "Dark" | "Light" | "Outline" | "Custom";
  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "Primary";
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
  .Primary {
    --szot-background-color: var(--theme-primary);
    --szot-color: var(--theme-txt-on-primary-surface);
  }

  .Secondary {
    --szot-background-color: var(--theme-secondary);
    --szot-color: var(--theme-txt-on-secondary-surface);
  }

  .Dark {
    --szot-background-color: var(--theme-dark);
    --szot-color: var(--theme-txt-on-dark-surface);
  }

  .Light {
    --szot-background-color: var(--theme-light);
    --szot-color: var(--theme-txt-on-light-surface);
  }
  .Outline {
    border: var(--szot-border, 0.0563rem solid #5F5F5F);
  }

</style>
