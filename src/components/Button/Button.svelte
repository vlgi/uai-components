<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  type Tsize = "small" | "medium" | "large";
  type Tborders = "None" | "Outline" | "Custom";
  type TborderStyle =
    | "Primary"
    | "Secondary"
    | "Dark"
    | "Light"
    | "Custom"
    | "Disabled";
  type TpositionIcon = "left" | "right";
  type TbuttonType = "submit" | "reset" | "button";

  // choose a preset size for the button
  export let size: Tsize = "medium";
  // choose an icon from the list
  export let icon = "none";
  // choose whether to have borders on the button
  export let border: Tborders = "None";
  // choose default theme colors, "Custom" to set a custom color, or disabled disable button
  export let buttonStyle: TborderStyle = "Primary";
  // choose whether or not to have a background color
  export let notbackground = false;
  // choose which side the icon should be on
  export let positionIcon: TpositionIcon = "left";
  // set the button type
  export let type: TbuttonType = "button";
  // set the button name
  export let name = "button";
</script>

{#if `${size}` === "floating" && `${icon}` !== "none"}
  <button
    { type }
    { name }
    class="button { size } button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "Disabled"}
  >
    <div class="icone"><Icon iconName={ icon } /></div>
  </button>
{:else if `${icon}` !== "none" && `${size}` !== "floating"}
  <button
    { type }
    { name }
    class="button { size } button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "Disabled"}
  >
    <div class="icone-{ positionIcon }"><Icon iconName={ icon } /></div>
    <div class="texto-{ positionIcon }"><slot /></div>
  </button>
{:else }
  <button
    { type }
    { name }
    class="button { size } button-style-{ buttonStyle } border-{ border }"
    class:notbackground
    disabled={ buttonStyle === "Disabled"}
  >
    <slot />
  </button>
{/if }

<style lang="scss">
  .button {
    position: relative;
    display: block;
    outline: none;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;

    font-family: var(--theme-font-family);
    font-size: var(--theme-p-font-size);
    font-style: var(--theme-p-font-style);
    font-weight: var(--theme-p-font-weight);
    line-height: var(--theme-p-line-height);
    text-transform: var(--szot-text-transform, capitalize);

    color: var(--szot-color, #ffffff);
    background-color: var(--szot-background-color, #333333);
    border: var(--szot-border);
  }
  .button:hover {
    transition: background-color 0.3s;
    opacity: var(--szot-opacity-hover, 85%);
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
    background-color: var(
      --szot-effect-color-after-click,
      rgba(184, 182, 182, 0.2)
    );

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
    border-radius: var(--theme-large-shape, 2.5625rem);
    padding: 0.625rem 2.1875rem;
    .icone-right {
      position: absolute;
      right: 0;
      margin: 0 1rem;
    }
    .texto-right {
      position: relative;
      transform: translate(-0.6rem, 0);
    }
    .icone-left {
      position: absolute;
      left: 0;
      margin: 0 1rem;
    }
    .texto-left {
      position: relative;
      transform: translate(0.6rem, 0);
    }
  }
  .medium {
    border-radius: var(--theme-large-shape, 1.4375rem);
    padding: 0.5625rem 3.4688rem;

    .icone-left {
      position: absolute;
      left: 0;
      margin: 0rem 1rem;
    }
    .texto-left {
      position: relative;
      transform: translate(0.5rem, 0rem);
    }
    .icone-right {
      position: absolute;
      right: 0;
      margin: 0rem 1rem;
    }
    .texto-right {
      position: relative;
      transform: translate(-0.5rem, 0rem);
    }
  }
  .small {
    border-radius: var(--theme-large-shape, 1.4375rem);
    padding: 0.3125rem 0.625rem;

    .icone-left {
      position: absolute;
      left: -0.5rem;
      margin: 0rem 1rem;
    }
    .texto-left {
      position: relative;
      margin-left: 1.5625rem;
    }

    .icone-right {
      position: absolute;
      right: -0.5rem;
      margin: 0rem 1rem;
    }
    .texto-right {
      position: relative;
      margin-right: 1.5rem;
    }
  }

  .border-Outline {
    --szot-border: var(--theme-medium-border);
  }
  .border-None {
    --szot-border: none;
  }
  .button-style-Primary {
    --szot-background-color: var(--theme-primary);
    --szot-color: var(--theme-txt-on-primary-surface);
  }
  .button-style-Secondary {
    --szot-background-color: var(--theme-secondary);
    --szot-color: var(--theme-txt-on-secondary-surface);
  }
  .button-style-Dark {
    --szot-background-color: var(--theme-dark);
    --szot-color: var(---theme-txt-on-dark-surface);
  }
  .button-style-Light {
    --szot-background-color: var(--theme-light);
    --szot-color: var(--theme-txt-on-light-surface);
  }
  .notbackground {
    --szot-background-color: none;
    --background-none: none;
    --szot-opacity-hover: 60%;
    --szot-color: var(--theme-txt-on-light-surface, #ffc7a756);
  }
  .button-style-Custom {
    color: var(--szot-color-custom, --theme-txt-on-light-surface);
  }
  .button-style-Disabled {
    --szot-color: #b1b1b1;
    --szot-background-color: var(--background-none, #7d7d7d);
    --effect-color-after-click: none;
    --szot-opacity-hover: 100%;

    cursor: initial;
    border-color: #b1b1b1;
  }
</style>
