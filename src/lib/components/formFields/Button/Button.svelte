<script lang="ts">
  import { getContext, hasContext } from "svelte";
  import fireFunctionStore from "../../Form/fireFunctionStore";
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
  export let buttonStyle: TButtonStyle = "dark";
  // disable the button
  export let disabled = false;
  // choose which side the icon should be on
  export let positionIcon: TPositionIcon = "left";
  // set the button type
  export let type: TButtonType = "button";
  // set the button name
  export let name = "button";

  // Other attributes for the HTML button element
  export let buttonAttributes: Record<string, unknown> = {};

  /**
   * The button element (readonly)
   * @type {HTMLButtonElement}
   * */
  export let buttonElement: HTMLButtonElement | null = null;

  /**
   *  choose an icon from the list
   *  @type {string}
   */
  export let icon: string | null = null;

  /**
   * Set the form ID, to enable this button trigger the form submission flow
   * without the button be inside the Form, and without the button be of submit type.
   * If this is defined and is inside the Form, we will use this instead of triggering
   * the form that this Button is inside. So be careful.
   * See the Form docs for more.
   */
  export let form = "";

  // set as round button (size doesn't work with this)
  let round: boolean;

  const isInsideContext = hasContext("FormContext");
  const { fireSubmit } = isInsideContext && getContext<TFormContext>("FormContext");

  function submitForm() {
    // disable lint because they doesn't work with store accessed with $
    if (form !== "") {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const fireFunction = $fireFunctionStore[form];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (fireFunction) fireFunction();
    } else if (isInsideContext && type === "submit") {
      // eslint-disable-next-line no-void
      void fireSubmit();
    }
  }

  $: round = size === "round";
</script>

<div
  class="container {size} style-{buttonStyle} style-type-{buttonStyleType}"
  class:disabled
>
  <button
    {type}
    {name}
    class="button {size} button-style-{buttonStyle} button-style-type-{buttonStyleType}"
    class:disabled
    {disabled}
    {...buttonAttributes}
    bind:this={buttonElement}
    on:click={submitForm}
    on:click
  >
    {#if round}
      <div class="icon"><Icon iconName={icon} /></div>
    {:else if icon && !round}
      <div class="icon-{positionIcon}"><Icon iconName={icon} /></div>
      <div class="text text-{positionIcon}"><slot /></div>
    {:else}
      <div class="text">
        <slot />
      </div>
    {/if}
  </button>
</div>

<style lang="scss">
  @use "$styles/mixins" as m;

  .container {
    --background-color: var(--szot-button-background-color, var(--default-background-color));
    --border: var(--szot-button-border, var(--default-border));
    --border-color: var(--szot-button-border-color, var(--default-border-color));
    --border-radius: var(--szot-button-border-radius, var(--theme-small-shape));
    --max-width: var(--szot-button-max-width, 100%);
    --width: var(--szot-button-width, auto);
    --white-space-text: var(--szot-button-white-space, nowrap);
    --box-shadow: var(--szot-button-box-shadow, none);
    --backdrop-filter: var(--szot-button-backdrop-filter, none);

    &.style-primary {
      --default-background-color: var(--theme-primary-surface);
      --default-border-color: var(--theme-primary-surface);
    }
    &.style-secondary {
      --default-background-color: var(--theme-secondary-surface);
      --default-border-color: var(--theme-secondary-surface);
    }
    &.style-dark {
      --default-background-color: var(--theme-dark-surface);
      --default-border-color: var(--theme-dark-surface);
    }
    &.style-light {
      --default-background-color: var(--theme-light-surface);
      --default-border-color: var(--theme-light-surface);
    }
    &.style-type-outline {
      --default-border: var(--theme-small-border);
      --default-background-color: none;
      --background-none: none;
    }
    &.style-type-filled {
      --default-border: none;
    }
    &.style-type-not-filled {
      --default-border: transparent;
      --background-none: transparent;
      --default-background-color: transparent;
      --border-color: transparent;
      background: transparent !important;
    }
    &.disabled {
      background: var(--background-none, #7d7d7d) !important;
      --default-border-color: var(--default-background-color, #b1b1b1);
    }

    &.round {
      border-radius: 1.0625rem;
      width: 1.875rem;
      height: 1.875rem;
    }

    display: inline-block;
    background: var(--background-color);
    border-radius: var(--border-radius);
    width: var(--width);
    max-width: var(--max-width);
    box-shadow: var(--box-shadow);
    backdrop-filter: var(--backdrop-filter);
    @include m.border(var(--border), var(--border-color));

    .button {
      // internal variables
      --default-opacity-hover: 85%;
      --default-effect-color: rgba(184, 182, 182, 0.2);
      // external variables
      --opacity-hover: var(--szot-button-opacity-hover, var(--default-opacity-hover));
      --color: var(--szot-button-color, var(--default-color));
      --szot-icon-color: var(--szot-button-icon-color, var(--color));
      --effect-color-after-click: var(
        --szot-button-effect-color-after-click,
        var(--default-effect-color)
      );
      --text-transform: (--szot-button-text-transform, capitalize);
      --font-size: var(--szot-button-font-size, var(--theme-fields-font-size));

      --padding-large: var(--szot-button-padding, 0.625rem 2.1875rem);
      --padding-medium: var(--szot-button-padding, 0.5625rem 3.4688rem);
      --padding-small: var(--szot-button-padding, 0.3125rem 0.625rem);

      --margin-icon: var(--szot-button-margin-icon, -0.1rem 1rem);

      &.button-style-primary {
        --default-color: var(--theme-txt-on-primary-surface);
        --not-filled-color: var(--theme-primary-txt);
      }
      &.button-style-secondary {
        --default-color: var(--theme-txt-on-secondary-surface);
        --not-filled-color: var(--theme-secondary-txt);
      }
      &.button-style-dark {
        --default-color: var(--theme-txt-on-dark-surface);
        --not-filled-color: var(--theme-dark-txt);
      }
      &.button-style-light {
        --default-color: var(--theme-txt-on-light-surface);
        --not-filled-color: var(--theme-light-txt);
      }
      &.round {
        border-radius: 1.0625rem;
        padding: 0;
        width: 100%;
        height: 100%;

        .icon {
          display: flex;
          align-items: center;
          flex-direction: column;
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
        .text-right {
          position: relative;
          transform: translate(-0.6rem, 0);
        }
        .icon-left {
          position: absolute;
          left: 0;
          margin: var(--margin-icon);
        }
        .text-left {
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
        .text-left {
          position: relative;
          transform: translate(0.5rem, 0rem);
        }
        .icon-right {
          position: absolute;
          right: 0;
          margin: var(--margin-icon);
        }
        .text-right {
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
        .text-left {
          position: relative;
          margin-left: 1.5625rem;
        }

        .icon-right {
          position: absolute;
          right: -0.5rem;
          margin: var(--margin-icon);
        }
        .text-right {
          position: relative;
          margin-right: 1.5rem;
        }
      }
      &.button-style-type-outline {
        --default-color: var(--default-border-color);
        --default-opacity-hover: 60%;
      }
      &.button-style-type-filled {
        --default-border: none;
      }
      &.button-style-type-not-filled {
        --default-color: var(--not-filled-color);
        --default-opacity-hover: 60%;
      }
      &.disabled {
        --default-color: #b1b1b1;
        --disabled-opacity-hover: 100%;
        --default-effect-color: var(--default-background-color);
        cursor: initial;
      }

      text-transform: var(--text-transform);
      background: transparent;
      position: relative;
      display: flex;
      outline: none;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: var(--font-size);
      border: none;
      width: var(--width);
      max-width: var(--max-width);
      .text {
        white-space: var(--white-space-text);
        @include m.text-color(var(--color));
      }

      &:hover {
        transition: background-color 0.3s;
        opacity: var(--opacity-hover);
      }
      &:before {
        background: var(--effect-color-after-click);
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
  }
</style>
