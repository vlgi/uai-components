<script lang="ts">
  type TbadgeStyle = "Primary" | "Secondary" | "Dark" | "Light" | "Custom";
  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "Primary";
  type Tborders = "Outiline" | "None";
  /** Choose whether to have borders or not. */
  export let border: Tborders = "None";
</script>

<span class="badge {badgeStyle} border-{border}">
  <slot />
</span>

<style lang="scss">
  .badge {

    * {
      --font-family: var(--theme-font-family);
      --font-weight: var(--theme-font-weight)
      --font-style: var(--theme-font-style);
      --font-size: var(--theme-font-size);
      --line-height: var(--theme-line-height);

      --max-width: var(--theme-fields-max-width);
      --height: var(--theme-fields-height);
      --padding: var(--theme-fields-padding);
      --border-radius: var(--theme-large-shape);
      --border: var(--theme-small-border);
    }

    position:relative;
    padding-left: var(--padding, 0.6rem);
    padding-right: var(--padding, 0.6rem);

    background:var(--background);
    color:var(--color);

    width: var(--width,6.3125rem);
    max-width: var(--max-width, 7.2rem);
    height: var(--heigth,1.0625rem);
    text-align:center;

    border-radius: var(--border-radius, 1.5rem);

    font-family: var(--font-family,Open Sans);
    font-style: var(--font-style, normal);
    font-weight: var(--font-weight,600);
    font-size: var(--font-size, 0.75rem);
    line-height: var(--line-height, 0.625rem);
  }

  .border-Outiline {
    border: var(--border, 0.0625rem solid #7D7D7D);
  }
  .border-None {
    border: none;
  }

  .Primary {
    --background: var(--theme-primary);
    --color: var(---theme-txt-on-primary-surface);
  }

  .Secondary {
    --background: var(--theme-secondary);
    --color: var(--theme-txt-on-secondary-surface);
  }

  .Dark {
    --background: var(--theme-dark);
    --color: var(--theme-txt-on-dark-surface);
  }

  .Light {
    --background: var(--theme-light);
    --color: var(--theme-txt-on-light-surface);
  }

</style>
