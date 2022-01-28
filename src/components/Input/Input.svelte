<script lang="ts">
  import Icon from "../Icon/Icon.svelte";
  import type { IIcons } from "../Icon/IIcons";

  /** choose an icon from the list */
  export let icon: IIcons = "none";

  type TpositionIcon = "left" | "right";
  /** if there is an icon define if it goes to the left or to the right */
  export let iconPosition: TpositionIcon = "right";

  type Tborders = "Bottom" | "Outline";
  /** choose border type */
  export let border: Tborders = "Outline";

  type TborderStyle = "Primary" | "Secondary" | "Dark" | "Light" | "Custom";

  /** choose default theme colors or "Custom" to set a custom color */
  export let inputStyle: TborderStyle = "Primary";

  /** write a helpertext if needed */
  export let helperText = "";

  /** enable if you want a color change if the input is valid or invalid */
  export let validation = true;

  /** Undefined */
  export let pattern = undefined; //eslint-disable-line

  /** input attributes */
  export let type = "text";
  export let value = "";
  export let disabled = false;
  export let readonly = false;
  export let autocomplete = "off";
  export let max = "";
  export let min = "";
  export let step = "";
  export let required = false;

  let helper = false;
  const focused = () => {
    helper = !helper;
  };
</script>

{#if `${icon}` !== "none"}
  <div
    class="form-div border-{border} icons-{iconPosition} input-style-{inputStyle}"
    class:validation
  >
    <input
      on:focus={focused}
      on:blur={focused}
      {type}
      class="form-input"
      placeholder=" "
      {value}
      {pattern}
      {disabled}
      {readonly}
      {autocomplete}
      {max}
      {min}
      {step}
      {required}
    />
    <label for="" class="form-label">
      <slot />
    </label>
    <div class="icon">
      <Icon iconName={icon} />
    </div>
    <p class="helper-hidden" class:helper>
      {helperText}
    </p>
  </div>
{:else}
  <div
    class="form-div border-{border} input-style-{inputStyle}"
    class:validation
  >
    <input
      {type}
      class="form-input "
      class:validation
      placeholder=" "
      {value}
      {pattern}
      {disabled}
      {readonly}
      {autocomplete}
      {max}
      {min}
      {step}
      {required}
      on:focus={focused}
      on:blur={focused}
    />
    <label for="" class="form-label">
      <slot />
    </label>
    <p class="helper-hidden" class:helper>
      {helperText}
    </p>
  </div>
{/if}

<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: var(--theme-font-family);
  }

  .form-div {
    position: relative;
    height: var(--theme-fields-height);
    margin-bottom: var(--szot-margin-bottom, 1.5rem);
    width: var(--szot-width, 16rem);
    max-width: var(--theme-fields-max-width);
  }

  .form-input {
    position: absolute;
    top: var(--szot-input-top, 0);
    left: var(--szot-input-left, 0);
    width: 100%;
    height: 100%;
    font-size: var(--szot-input-font-size, 0.625rem);
    outline: none;
    padding: var(--szot-input-padding, 0rem 1rem);
    background: none;
    z-index: 1;
    color: var(--szot-input-color, #b1b1b1);
  }

  .form-label {
    position: relative;
    left: var(--szot-label-left, 1.2rem);
    top: var(--szot-label-top, 0.5rem);
    padding: var(--label-padding, 0rem);
    color: var(--szot-label-color, #5f5f5f);
    font-size: var(--szot-label-font-size, 0.8125rem);
    background-color: var(--szot-background-color, #ffff);
    transition: 0.2s;
  }

  .form-input:focus + .form-label {
    top: var(--szot-input-focus-top, -0.8rem);
    left: var(--szot-input-focus-left, 0.8rem);
    z-index: 10;
    font-weight: var(--szot-input-focus-weigth, 400);
    color: var(--szot-input-focus-color);
    font-size: var(--szot-input-focus-font-size, 0.6875rem);
  }

  .form-input:not(:placeholder-shown).form-input:not(:focus) + .form-label {
    top: var(--szot-label-not-focus-top, -0.7rem);
    left: var(--szot-label-not-focus-left, 0.9rem);
    z-index: 10;
    font-weight: var(--szot-label-not-focus-font-weight, 500);
    font-size: var(--szot-label-not-focus-font-size, 11px);
  }

  .border-Bottom {
    .form-input {
      border: 0;
      border-bottom: var(--theme-small-border);
      border-color: var(--szot-border-color);
      padding: var(--szot-border-none-padding, 0.5rem 0.5rem);
      &:focus {
        border-color: var(--szot-border-color-focus);
      }

      .form-label {
        margin-left: var(--szot-border-none-margin-left, -0.5rem);
      }
    }
  }
  .border-Outline {
    .form-input {
      border: var(--theme-small-border);
      border-color: var(--szot-border-color);
      border-radius: var(--theme-large-shape);
      &:focus {
        border-color: var(--szot-border-color-focus);
      }
    }
  }

  .icons-left {
    .form-input {
      padding: 1rem 1rem 1rem 2rem;
    }

    .form-label {
      margin-left: 1rem;
    }

    .icon {
      position: absolute;
      left: 0;
      margin: var(--szot-icon-margin, -0.6rem 0.5rem);
      color: var(--szot-icon-color, #5f5f5f);
    }
  }

  .icons-right {
    .form-input {
      padding: 1rem 1.7rem 1rem 1rem;
    }

    .icon {
      position: absolute;
      right: 0;
      margin: var(--szot-icon-margin, -0.6rem 0.5rem);
      color: var(--szot-icon-color, #5f5f5f);
    }
  }
  .input-style-Primary {
    --szot-label-color: var(--theme-primary-txt);
    --szot-input-color: var(--theme-primary-txt);
    --szot-icon-color: var(--theme-primary-txt);
    --szot-input-focus-color: var(--theme-primary-txt);
    --szot-border-color-focus: var(--theme-primary-txt);
    --szot-border-color: var(--theme-primary-txt);
    --szot-border-color: var(--theme-primary-txt);
  }

  .input-style-Secondary {
    --szot-label-color: var(--theme-secondary-txt);
    --szot-icon-color: var(--theme-secondary-txt);
    --szot-input-color: var(--theme-secondary-txt);
    --szot-input-focus-color: var(--theme-secondary-txt);
    --szot-border-color-focus: var(--theme-secondary-txt);
    --szot-border-color: var(--theme-secondary-txt);
    --szot-border-color: var(--theme-secondary-txt);
  }

  .input-style-Dark {
    --szot-label-color: var(--theme-dark-txt);
    --szot-icon-color: var(--theme-dark-txt);
    --szot-input-color: var(--theme-dark-txt);
    --szot-input-focus-color: var(--theme-dark-txt);
    --szot-border-color-focus: var(--theme-dark-txt);
    --szot-border-color: var(--theme-dark-txt);
    --szot-border-color: var(--theme-dark-txt);
  }
  .input-style-Light {
    --szot-label-color: var(--theme-light-txt);
    --szot-icon-color: var(--theme-light-txt);
    --szot-input-color: var(--theme-light-txt);
    --szot-input-focus-color: var(--theme-light-txt);
    --szot-border-color-focus: var(--theme-light-txt);
    --szot-border-color: var(--theme-ligth-txt);
  }
  .validation {
    .form-input {
      &:invalid:not(:focus):not(:placeholder-shown) {
        border-color: var(--theme-error);
        color: var(--theme-error);
        + .form-label + .icon {
          color: var(--theme-error);
        }
        + .form-label {
          color: var(--theme-error);
        }
      }
      &:valid:not(:focus):not(:placeholder-shown) {
        border-color: var(--theme-success);
        color: var(--theme-success);
        + .form-label + .icon {
          color: var(--theme-success);
        }
        + .form-label {
          color: var(--theme-success);
        }
      }
    }
  }

  p {
    position: absolute;
    z-index: 1;
    bottom: var(--szot-texthelp-bottom, -1rem);
    left: var(--szot-texthelp-left, 1rem);
    font-size: var(--szot-texthelp-font-size, 0.25em);
    opacity: 0;
    transition: opacity 0.5s linear;
  }
  .helper-hidden {
    color: var(--theme-info);
  }
  .helper {
    opacity: 0.75;
    transition: opacity 0.5s linear;
  }
</style>
