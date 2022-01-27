<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import type { IIcons } from "../Icon/IIcons";

  type Tsize = "small" | "medium" | "large";
  /** choose a preset size for the button */
  export let size: Tsize = "medium";
  /** choose an icon from the list */
  export let icon: IIcons = "none";
  type Tborders = "None" | "Outline";
  /** choose whether to have borders on the button */
  export let border: Tborders = "None";
  type TborderStyle =
    | "Primary"
    | "Secondary"
    | "Dark"
    | "Light"
    | "Custom"
    | "Disabled";
  /** choose default theme colors, "Custom" to set a custom color, or disabled disable button */
  export let buttonStyle: TborderStyle = "Primary";
  type Tbackground = boolean;
  /** choose whether or not to have a background color */
  export let background: Tbackground = true;
  type TpositionIcon = "left" | "right";
  export let positionIcon: TpositionIcon = "left";
</script>

{#if `${size}` === "floating" && `${icon}` !== "none"}
  <button
    class="button {size} background-{background} button-style-{buttonStyle} border-{border}"
  >
    <div class="icone"><Icon iconName={icon} /></div>
  </button>
{:else if `${icon}` !== "none" && `${size}` !== "floating"}
  <button
    class="button {size} background-{background} button-style-{buttonStyle} border-{border}"
  >
    <div class="icone-{positionIcon}"><Icon iconName={icon} /></div>
    <div class="texto-{positionIcon}"><slot /></div>
  </button>
{:else}
  <button
    class="button {size} background-{background} button-style-{buttonStyle} border-{border}"
  >
    <slot />
  </button>
{/if}

<style lang="scss">
  * {
    --font-family: var(--theme-font-family);
    --border-radius: var(--theme-large-shape, 1.5rem);
    --border: var(--theme-medium-border, none);
  }
  .button {
    position: relative;
    display: block;

    text-transform: var(--text-transform, capitalize);
    cursor: pointer;
    color: var(--color, #ffffff);
    background-color: var(--background-color, #333333);
    outline: none;
    border: var(--border, none);
    font-family: var(--font-family, Open Sans);
    text-align: var(--text-align, center);
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;
    overflow: hidden;
  }
  .button:hover {
    transition: background-color 0.3s;
    opacity: var(--opacity-hover, 85%);
  }

  .button:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: var(--effect-color-after-click, rgba(184, 182, 182, 0.2));

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .button:active:before {
    width: 120%;
    padding-top: 120%;
    transition: width 0.2s ease-out, padding-top 0.2s ease-out;
  }
  .floating {
    border-radius: 17px;
    padding: 0;
    width: 30.56px;
    height: 31.36px;

    .icone {
      position: absolute;
      top: 0.45rem;
      left: 0.35rem;
    }
  }
  .large {
    border-radius: var(--border-radius, 2.5625rem);
    padding: var(--padding, 0.625rem 2.1875rem);

    font-size: var(--font-size-large, 24px);
    font-style: var(--font-style-large, normal);
    font-weight: var(--font-weight-large, bold);
    line-height: var(--line-height-large, 2rem);

    .icone-right {
      position: absolute;
      right: 0;
      margin: 0 1rem;
    }
    .texto-right {
      position: relative;
      transform: var(--texto-transform-translate, translate(-0.6rem, 0));
    }
    .icone-left {
      position: absolute;
      left: 0;
      margin: 0 1rem;
    }
    .texto-left {
      position: relative;
      transform: var(--texto-transform-translate, translate(0.6rem, 0));
    }
  }
  .medium {
    border-radius: var(--border-radius, 1.4375rem);
    padding: var(--padding, 0.5625rem 3.4688rem);

    font-size: var(--font-size, 1rem);
    font-style: var(--font-style, normal);
    font-weight: var(--font-weight, 600);
    line-height: var(--line-height, 1.875rem);

    .icone-left {
      position: absolute;
      left: 0;
      margin: 0.15rem 1rem;
    }
    .texto-left {
      position: relative;
      transform: var(--texto-transform-translate, translate(0.5rem, 0rem));
    }
    .icone-right {
      position: absolute;
      right: 0;
      margin: 0.15rem 1rem;
    }
    .texto-right {
      position: relative;
      transform: var(--texto-transform-translate, translate(-0.5rem, 0rem));
    }
  }
  .small {
    border-radius: var(--border-radius, 1.4375rem);
    padding: var(--padding, 0.3125rem 0.625rem);

    font-size: var(--font-size-small, 1rem);
    font-style: var(--font-style-small, normal);
    font-weight: var(--font-weight-small, 600);
    line-height: var(--line-height-small, 1.875rem);

    .icone-left {
      position: absolute;
      left: -0.5rem;
      margin: 0.15rem 1rem;
    }
    .texto-left {
      position: relative;
      margin-left: var(--margin-left-with-icon, 1.5625rem);
    }

    .icone-right {
      position: absolute;
      right: -0.5rem;
      margin: 0.15rem 1rem;
    }
    .texto-right {
      position: relative;
      margin-right: var(--margin-left-with-icon, 1.5rem);
    }
  }
  .border-Outline {
    --border: 2px solid #333333;
  }
  .border-None {
    --border: none;
  }
  .button-style-Primary {
    --background-color: var(--theme-primary);
    --color: var(---theme-txt-on-primary-surface);
  }
  .button-style-Secondary {
    --background-color: var(--theme-secondary);
    --color: var(--theme-txt-on-secondary-surface);
  }
  .button-style-Dark {
    --background-color: var(--theme-dark);
    --color: var(--theme-txt-on-dark-surface);
  }
  .button-style-Light {
    --background-color: var(--theme-light);
    --color: var(--theme-txt-on-light-surface);
  }
  .background-false {
    --background-color: none;
    --background-none: none;
    --opacity-hover: 60%;
  }
  .button-style-Disabled {
    --color: #b1b1b1;
    --background-color: var(--background-none, #7d7d7d);
    --effect-color-after-click: none;
    --opacity-hover: 100%;

    cursor: initial;
    border-color: #b1b1b1;
  }
</style>
