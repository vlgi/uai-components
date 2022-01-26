<script lang="ts">

  type TbadgeStyle = "Primary" | "Secondary" | "Dark" | "Light" | "Custom";
  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "Primary";
  type Tborders = "Outiline" | "None";
  /** Choose whether to have borders or not. */
  export let border: Tborders = "None";

</script>

<span class="badge {badgeStyle} border-{border}">
  <slot/>
</span>


<style lang="scss">
  .badge {

    * {
      --font-family: var(--szot-font-family);
      --font-weight: var(--szot-font-weight)
      --font-style: var(--szot-font-style);
      --font-size: var(--szot-font-size);
      --line-height: var(--szot-line-height);

      --max-width: var(--szot-fields-max-width);
      --height: var(--szot-fields-height);
      --padding: var(--szot-fields-padding);
      --border-radius: var(--szot-large-shape);
      --border: var(--szot-small-border);
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

  .border-Outiline{
    border: var(--border, 0.0625rem solid #7D7D7D);
  }

  .Primary {
    --background: var(--szot-primary,#FFFFFF);
    --color: var(--szot-primary-txt,#5F5F5F);
  }

  .Secondary {
    --background: var(--szot-secondary);
    --color: var(--szot-secondary-txt);
  }

  .Dark {
    --background: var(--szot-dark);
    --color: var(--szot-dark-txt);
  }

  .Light {
    --background: var(--szot-light);
    --color: var(--szot-light-txt);
  }

</style>
