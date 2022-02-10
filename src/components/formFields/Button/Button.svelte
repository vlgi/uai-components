<script lang="ts">
  import { getContext, hasContext } from "svelte";
  import type { TFormContext } from "../../Form/types";
  import Icon from "../../Icon/Icon.svelte";

  type TSize = "small" | "medium" | "large" | "round";
  type TButtonStyleType = "filled" | "not-filled" | "outline";
  type TButtonStyle = "primary" | "secondary" | "dark" | "light";
  type TPositionIcon = "left" | "right";
  type TButtonType = "submit" | "reset" | "button";

  // choose a preset size for the button
  export let size: TSize = "medium";
  // choose whether to have borders on the button
  export let buttonStyleType: TButtonStyleType = "filled";
  // choose default theme colors or disabled disable button
  export let buttonStyle: TButtonStyle = "primary";
  // disable the button
  export let disabled = false;
  // choose which side the icon should be on
  export let positionIcon: TPositionIcon = "left";
  // set the button type
  export let type: TButtonType = "button";
  // set the button name
  export let name = "button";

  /**
   *  choose an icon from the list
   *  @type {string}
   */
  export let icon: string|null = null;

  // set as round button (size doesn't work with this)
  let round: boolean;

  const isInsideContext = hasContext("FormContext");
  const { fireSubmit } = isInsideContext && getContext<TFormContext>("FormContext");

  function submitForm() {
    if (isInsideContext && type === "submit") {
      // eslint-disable-next-line no-void
      void fireSubmit();
    }
  }

  $: round = (size === "round");
</script>

<button
  {type}
  {name}
  class="button {size} button-style-{buttonStyle} button-style-type-{buttonStyleType}"
  class:disabled
  {disabled}
  on:click={submitForm}
  on:click
>
  {#if round}
    <div class="icon"><Icon iconName={icon} /></div>
  {:else if icon && !round}
    <div class="icon-{positionIcon}"><Icon iconName={icon} /></div>
    <div class="texto-{positionIcon}"><slot /></div>
  {:else}
    <slot />
  {/if}
</button>

<style lang="scss">
  .button {
    // internal variables
    --default-opacity-hover: 85%;
    --default-effect-color: rgba(184, 182, 182, 0.2);
    // external variables
    --opacity-hover: var(--szot-opacity-hover, var(--default-opacity-hover));
    --background-color: var(
      --szot-background-color,
      var(--default-background-color)
    );
    --color: var(--szot-color, var(--default-color));
    --border: var(--szot-border, var(--default-border));
    --effect-color-after-click: var(
      --szot-effect-color-after-click,
      var(--default-effect-color)
    );
    --text-transform: (--szot-text-transform, capitalize);
    --border-radius: var(--szot-border-radius, var(--theme-small-shape));
    --font-size: var(--szot-font-size, 0.9rem);

    --padding-large: var(--szot-padding, 0.625rem 2.1875rem);
    --padding-medium: var(--szot-padding, 0.5625rem 3.4688rem);
    --padding-small: var(--szot-padding, 0.3125rem 0.625rem);

    --margin-icon: var(--szot-margin-icon, -0.1rem 1rem);

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
      --default-color: var(--theme-txt-on-dark-surface);
    }
    &.button-style-light {
      --default-background-color: var(--theme-light-surface);
      --default-color: var(--theme-txt-on-light-surface);
    }
    &.round {
      border-radius: 1.0625rem;
      padding: 0;
      width: 1.91rem;
      height: 1.96rem;

      .icon {
        position: absolute;
        top: 20%;
        left: 18%;
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
    &.button-style-type-outline {
      --default-border: var(--theme-small-border);
      --default-background-color: none;
      --default-opacity-hover: 60%;
      --default-color: var(--theme-txt-on-light-surface);
      --background-none: none;
    }
    &.button-style-type-filled {
      --default-border: none;
    }
    &.button-style-type-not-filled {
      --default-border: none;
      --default-background-color: none;
      --default-opacity-hover: 60%;
      --default-color: var(--theme-txt-on-light-surface);
      --background-none: none;
    }
    &.disabled {
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

    &[type="submit"] {
      width: 100%;
      max-width: var(--theme-fields-max-width);
    }
  }
</style>
