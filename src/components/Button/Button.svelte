<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  type Tsize = "small" | "medium" | "large";
  type Tborders = "none" | "outline" | "custom";
  type TborderStyle =
    | "primary"
    | "secondary"
    | "dark"
    | "light"
    | "custom"
    | "disabled";
  type TpositionIcon = "left" | "right";
  type TbuttonType = "submit" | "reset" | "button";

  // choose a preset size for the button
  export let size: Tsize = "medium";
  // choose an icon from the list
  export let icon: string | undefined;
  // choose whether to have borders on the button
  export let border: Tborders = "none";
  // choose default theme colors, "Custom" to set a custom color, or disabled disable button
  export let buttonStyle: TborderStyle = "primary";
  // choose whether or not to have a background color
  export let notbackground = false;
  // choose which side the icon should be on
  export let positionIcon: TpositionIcon = "left";
  // set the button type
  export let type: TbuttonType = "button";
  // set the button name
  export let name = "button";
  // set as floating button (size doesn't work with this)
  export let floating = false;
</script>

{#if floating && icon }
  <button
    { type }
    { name }
    class="button floating button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "disabled" }
  >
    <div class="icon"><Icon iconName={ icon } /></div>
  </button>
{:else if icon && !floating }
  <button
    { type }
    { name }
    class="button { size } button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "disabled" }
  >
    <div class="icon-{ positionIcon }"><Icon iconName={ icon } /></div>
    <div class="texto-{ positionIcon }"><slot /></div>
  </button>
{:else }
  <button
    { type }
    { name }
    class="button { size } button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "disabled" }
  >
    <slot />
  </button>
{/if } 

<style lang="scss">
  .button {
    --default-opacity-hover: 85%;
    --default-effect-color: rgba(184, 182, 182, 0.2);
    --opacity-hover: var(--szot-opacity-hover, var(--default-opacity-hover));
    --background-color: var(--szot-background-color,var(--default-background-color));
    --color: var(--szot-color, var(--default-color));
    --border: var(--szot-border, var(--default-border));
    --effect-color-after-click: var(--szot-effect-color-after-click,var(--default-effect-color));
    --text-transform: (--szot-text-transform, capitalize);
    --border-radius: var(--szot-border-radius, var(--theme-small-shape));
    --font-size: var(--szot-font-size, 0.9rem);

    --padding-large: var(--szot-padding, 0.625rem 2.1875rem);
    --padding-medium: var(--szot-padding, 0.5625rem 3.4688rem);
    --padding-small: var(--szot-padding, 0.3125rem 0.625rem);

    --margin-icon: var(--szot-margin-icon, -0.1rem 1rem);

    --float-icon-top: var(--szot-icon-top, 0.4rem);
    --float-icon-left: var(--szot-icon-left, 0.35rem);
    &.border-outline {
      --default-border: var(--theme-small-border);
    }
    &.border-None {
      --default-border: none;
    }
    &.button-style-primary {
      --default-background-color: var(--theme-primary-surface);
      --default-color: var(--theme-txt-on-primary-surface);
    }
    &.button-style-secondary {
      --default-background-color: var(--theme-secondary-surface);
      --default-color: var(--theme-txt-on-secondary-surface);
    }
    &.button-style-dark {
      --default-background-color: var(--theme-dark-surface);
      --default-color: var(---theme-txt-on-dark-surface);
    }
    &.button-style-light {
      --default-background-color: var(--theme-light-surface);
      --default-color: var(--theme-txt-on-light-surface);
    }
    &.notbackground {
      --default-background-color: none;
      --background-none: none;
      --default-opacity-hover: 60%;
      --default-color: var(--theme-txt-on-light-surface);
    }
    &.floating {
      border-radius: 17px;
      padding: 0;
      width: 30.56px;
      height: 31.36px;

      .icon {
        position: absolute;
        top: var(--float-icon-top);
        left: var(--float-icon-left);
      }
    }
    &.large {
      border-radius: var(--border-radius);
      padding: var(--padding-large);
      .icon-right {
        position: absolute;
        right: 0;
        margin: var(--margin-icon);
      }
      .texto-right {
        position: relative;
        transform: translate(-0.6rem, 0);
      }
      .icon-left {
        position: absolute;
        left: 0;
        margin: var(--margin-icon);
      }
      .texto-left {
        position: relative;
        transform: translate(0.6rem, 0);
      }
    }
    &.medium {
      border-radius: var(--border-radius);
      padding: var(--padding-medium);

      .icon-left {
        position: absolute;
        left: 0;
        margin: var(--margin-icon);
      }
      .texto-left {
        position: relative;
        transform: translate(0.5rem, 0rem);
      }
      .icon-right {
        position: absolute;
        right: 0;
        margin: var(--margin-icon);
      }
      .texto-right {
        position: relative;
        transform: translate(-0.5rem, 0rem);
      }
    }
    &.small {
      border-radius: var(--border-radius);
      padding: var(--padding-small);

      .icon-left {
        position: absolute;
        left: -0.5rem;
        margin: var(--margin-icon);
      }
      .texto-left {
        position: relative;
        margin-left: 1.5625rem;
      }

      .icon-right {
        position: absolute;
        right: -0.5rem;
        margin: var(--margin-icon);
      }
      .texto-right {
        position: relative;
        margin-right: 1.5rem;
      }
    }
    &.button-style-disabled {
      --default-color: #b1b1b1;
      --default-background-color: var(--background-none, #7d7d7d);
      --disabled-opacity-hover: 100%;
      --default-effect-color: var(--default-background-color);
      cursor: initial;
      border-color: #b1b1b1;
    }

    text-transform: var(--text-transform);
    color: var(--color);
    background-color: var(--background-color);
    border: var(--border);

    position: relative;
    display: block;
    outline: none;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: var(--font-size);

    &:hover {
      transition: background-color 0.3s;
      opacity: var(--opacity-hover);
    }
    &:before {
      background-color: var(--effect-color-after-click);
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 0;
      padding-top: 0;
      border-radius: 100%;

      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    &:active:before {
      width: 120%;
      padding-top: 120%;
      transition: width 0.2s ease-out, padding-top 0.2s ease-out;
    }
  }
</style>
