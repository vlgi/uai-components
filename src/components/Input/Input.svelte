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
  export let validation = false;

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
  >
    <input
      on:focus={focused}
      on:blur={focused}
      {type}
      class="form-input form-input-validation"
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
    <p class:helper>
      {helperText}
    </p>
  </div>
{:else}
  <div class="form-div border-{border} input-style-{inputStyle}">
    <input
      {type}
      class="form-input"
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
    <p class:helper>
      {helperText}
    </p>
  </div>
{/if}

<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: var(--theme-font-family);

    --max-width: var(--theme-fields-max-width);
    --height: var(--theme-fields-height);
    --border-radius: var(--theme-large-shape);
    --border: var(--theme-small-border);
    --border-bottom-focus: var(--theme-medium-border);
  }

  .form-div {
    position: relative;
    height: var(--height, 2.2rem);
    margin-bottom: var(--margin-bottom, 1.5rem);
    width: var(--width, 16rem);
    max-width: var(--max-width);
  }

  .form-input {
    position: absolute;
    top: var(--input-top, 0);
    left: var(--input-left, 0);
    width: 100%;
    height: 100%;
    font-size: var(--input-font-size, 0.625rem);
    outline: none;
    padding: var(--input-padding, 0rem 1rem);
    background: none;
    z-index: 1;
    color: var(--input-color, #b1b1b1);
  }

  .form-label {
    position: relative;
    left: var(--label-left, 1.2rem);
    top: var(--label-top, 0.5rem);
    padding: var(--label-padding, 0rem);
    color: var(--label-color, #5f5f5f);
    font-size: var(--label-font-size, 0.8125rem);
    background-color: var(--background-color, #ffff);
    transition: 0.2s;
  }

  .form-input:focus + .form-label {
    top: var(--input-focus-top, -0.8rem);
    left: var(--input-focus-left, 0.8rem);
    z-index: 10;
    font-weight: var(--input-focus-weigth, 400);
    color: var(--input-focus-color, #0c8aff);
    font-size: var(--input-focus-font-size, 0.6875rem);
  }

  .form-input:not(:placeholder-shown).form-input:not(:focus) + .form-label {
    top: var(--label-not-focus-top, -0.7rem);
    left: var(--label-not-focus-left, 0.9rem);
    z-index: 10;
    font-weight: var(--label-not-focus-font-weight, 500);
    font-size: var(--label-not-focus-font-size, 11px);
  }

  .border-Bottom {
    .form-input {
      border: 0;
      border-bottom: var(--border, 1px solid #575555);
      border-color: var(--border-bottom-color);
      padding: var(--border-none-padding, 0.5rem 0.5rem);
      &:focus {
        border-color: var(--border-bottom-focus-color);
      }

      .form-label {
        margin-left: var(--border-none-margin-left, -0.5rem);
      }
    }
  }
  .border-Outline {
    .form-input {
      border: var(--border, 1px solid);
      border-color: var(--border-color);
      border-radius: 24px;
      &:focus {
        border-color: var(--border-color-focus);
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
      margin: var(--icon-margin, -0.6rem 0.5rem);
      color: var(--icon-color, #5f5f5f);
    }
  }

  .icons-right {
    .form-input {
      padding: 1rem 1.7rem 1rem 1rem;
    }

    .icon {
      position: absolute;
      right: 0;
      margin: var(--icon-margin, -0.6rem 0.5rem);
      color: var(--icon-color, #5f5f5f);
    }
  }
  .input-style-Primary {
    --label-color: var(--theme-primary-txt);
    --input-color: var(--theme-primary-txt);
    --icon-color: var(--theme-primary-txt);
    --input-focus-color: var(--theme-primary-txt);
    --border-color-focus: var(--theme-primary-txt);
    --border-bottom-focus-color: var(--theme-primary-txt);
    --border-color: var(--theme-primary-txt);
    --border-bottom-color: var(--theme-primary-txt);
  }

  .input-style-Secondary {
    --label-color: var(--theme-secondary-txt);
    --icon-color: var(--theme-secondary-txt);
    --input-color: var(--theme-secondary-txt);
    --input-focus-color: var(--theme-secondary-txt);
    --border-color-focus: var(--theme-secondary-txt);
    --border-bottom-focus-color: var(--theme-secondary-txt);
    --border-color: var(--theme-secondary-txt);
    --border-bottom-color: var(--theme-secondary-txt);
  }

  .input-style-Dark {
    --label-color: var(--theme-dark-txt);
    --icon-color: var(--theme-dark-txt);
    --input-color: var(--theme-dark-txt);
    --input-focus-color: var(--theme-dark-txt);
    --border-color-focus: var(--theme-dark-txt);
    --border-bottom-focus-color: var(--theme-dark-txt);
    --border-color: var(--theme-dark-txt);
    --border-bottom-color: var(--theme-dark-txt);
  }
  .input-style-Light {
    --label-color: var(--theme-light-txt);
    --icon-color: var(--theme-light-txt);
    --input-color: var(--theme-light-txt);
    --input-focus-color: var(--theme-light-txt);
    --border-color-focus: var(--theme-light-txt);
    --border-bottom-focus-color: var(--theme-light-txt);
    --border-color: var(--theme-ligth-txt);
    --border-bottom-color: var(--theme-ligth-txt);
  }
  .validation {
    &:invalid:not(:focus):not(:placeholder-shown) {
      border-color: var(--theme-error);
      color: var(--theme-error);
      + .form-label {
        color: var(--theme-error);
      }
    }
    &:valid:not(:focus):not(:placeholder-shown) {
      border-color: var(--theme-success);
      color: var(--theme-success);
      + .form-label {
        color: var(--theme-success);
      }
    }
  }
  p {
    position: absolute;
    z-index: 1;
    bottom: var(--helper-bottom, -1rem);
    left: var(--helper-left, 1rem);
    font-size: var(--helper-font-size, 0.25em);
    color: var(--theme-info);
    opacity: 0;
    transition: opacity 0.5s linear;
  }
  .helper {
    opacity: 0.75;
    transition: opacity 0.5s linear;
  }
</style>
