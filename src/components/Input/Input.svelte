<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  /** choose an icon from the list */
  export let icon = "none";

  type TpositionIcon = "left" | "right";
  /** if there is an icon define if it goes to the left or to the right */
  export let iconPosition: TpositionIcon = "right";

  type Tborders = "Bottom" | "Outline";
  /** choose border type */
  export let border: Tborders = "Outline";

  type TborderStyle = "primary" | "secondary" | "dark" | "light";

  /** choose default theme colors or "Custom" to set a custom color */
  export let inputStyle: TborderStyle = "primary";

  /** write a helpertext if needed */
  export let helperText = "";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /** pass the function to validation */
  export let validationFn = (value) => {}; //eslint-disable-line

  /** if you want to force invalid, change it to true */
  export let ForceInvalid = false;

  /** shows if the component is valid */
  export let isValid = true;

  /** Undefined */
  export let pattern = undefined; //eslint-disable-line

  /** Enter label text */
  export let label = "";

  export let type = "text";
  export let name = "";
  export let value = "";
  export let disabled = false;
  export let readonly = false;
  export let autocomplete = "off";
  export let max = "";
  export let min = "";
  export let step = "";
  export let required = false;

  let invalid = ForceInvalid;
  let helper = false;
  let eMsg = "";
  let MsgUp = false;
  let fist = false;

  const focused = () => {
    helper = !helper;
    MsgUp = !MsgUp;
  };

  const changed = () => {
    invalid = false;
  };

  const checkStatus = (answer) => {
    if (answer === true) {
      isValid = true;
      invalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (answer === undefined) {
      isValid = true;
      invalid = !isValid;
    } else if (typeof answer === "string") {
      isValid = false;
      invalid = !isValid;
      eMsg = answer;
    }
  };

  const validation = () => {
    if (ForceInvalid) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (required) {
      if (!value) {
        isValid = false;
        invalid = !isValid;
        eMsg = "Este campo é obrigatorio";
      } else if (fist) {
        checkStatus(validationFn(value));
      }
    } else {
      checkStatus(validationFn(value));
    }
    fist = true;
  };

  const setValue = () => {
    const x = document.querySelector("input").value;
    value = x;
  };
</script>

<div
  class="form-div input-style-{inputStyle}"
  class:icons-left={iconPosition === "left" && icon !== "none"}
  class:icons-right={iconPosition === "right" && icon !== "none"}
  class:invalid
>
  <input
    on:focus={focused}
    on:focus={validation}
    on:input={changed}
    on:input={setValue}
    on:input
    on:blur={focused}
    on:blur={validation}
    class="form-input border-{border}"
    placeholder=" "
    {type}
    {name}
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
    {label}
  </label>
  <div class="icon">
    <Icon iconName={icon} />
  </div>
  <p class="helper" class:helper-show={helper}>
    {helperText}
  </p>
  <p class="error" class:error-show={invalid} class:MsgUp>
    {eMsg}
  </p>
</div>

<style lang="scss">
  .form-div {
    --margin-bottom: var(--szot-margin-bottom, 1.5rem);
    --width: var(--szot-width, 12rem);
    --height: var(--szot-height, var(--theme-fields-height));

    --input-top: var(--szot-input-top, 0);
    --input-left: var(--szot-input-left, 0);
    --input-font-size: var(--szot-input-font-size, 0.625rem);
    --input-padding: var(--szot-input-padding, 0rem 1rem);
    --input-color: var(--szot-input-color, var(--default-input-color));
    --border-color: var(--szot-border-color, var(--default-border-color));
    --border-radius: var(--szot-border-radius, var(--theme-small-shape));

    --label-left: var(--szot-label-left, 1.2rem);
    --label-padding: var(--szot-label-padding, 0rem);
    --label-color: var(--szot-label-color, var(--default-label-color));
    --label-font-size: var(--szot-label-font-size, 0.8125rem);
    --background-color: var(--szot-background-color, white);

    --label-focus-left: var(--szot-label-focus-left, 0.8rem);
    --input-focus-weigth: var(--szot-input-focus-weigth, 400);
    --input-focus-font-size: var(--szot-input-focus-font-size, 0.6875rem);
    --input-focus-color: var(
      --szot-input-focus-color,
      var(--default-input-focus-color)
    );
    --border-color-focus: var(
      --szot-border-color-focus,
      var(--default-border-color-focus)
    );

    --icon-margin: var(--szot-icon-margin, 0.5rem 0.5rem);
    --icon-color: var(--szot-icon-color, var(--default-icon-color));

    --message-font-size: var(--szot-message-font-size, 0.6875rem);
    --message-bottom: var(--szot-texthelp-bottom, -1.2rem);
    --message-left: var(--szot-texthelp-left, 1rem);
    --message-error-bottom-focus: var(--szot-message-error-bottom-focus, -2rem);
    &.input-style-primary {
      --default-label-color: var(--theme-primary-txt);
      --default-input-color: var(--theme-primary-txt);
      --default-icon-color: var(--theme-primary-txt);
      --default-input-focus-color: var(--theme-primary-txt);
      --default-border-color-focus: var(--theme-primary-txt);
      --default-border-color: var(--theme-primary-txt);
    }

    &.input-style-secondary {
      --default-label-color: var(--theme-secondary-txt);
      --default-input-color: var(--theme-secondary-txt);
      --default-icon-color: var(--theme-secondary-txt);
      --default-input-focus-color: var(--theme-secondary-txt);
      --default-border-color-focus: var(--theme-secondary-txt);
      --default-border-color: var(--theme-secondary-txt);
    }

    &.input-style-dark {
      --default-label-color: var(--theme-dark-txt);
      --default-input-color: var(--theme-dark-txt);
      --default-icon-color: var(--theme-dark-txt);
      --default-input-focus-color: var(--theme-dark-txt);
      --default-border-color-focus: var(--theme-dark-txt);
      --default-border-color: var(--theme-dark-txt);
    }
    &.input-style-light {
      --default-label-color: var(--theme-light-txt);
      --default-input-color: var(--theme-light-txt);
      --default-icon-color: var(--theme-light-txt);
      --default-input-focus-color: var(--theme-light-txt);
      --default-border-color-focus: var(--theme-light-txt);
      --default-border-color: var(--theme-ligth-txt);
    }
    &.invalid {
      .form-input {
        border-color: var(--theme-error);
        color: var(--theme-error);
        + .form-label + .icon {
          color: var(--theme-error);
        }
        + .form-label {
          color: var(--theme-error);
        }
        &:focus {
          border-color: var(--theme-error);
        }
      }
    }
    position: relative;
    height: var(--height);
    margin-bottom: var(--margin-bottom);
    width: var(--width);
    max-width: var(--theme-fields-max-width);
    box-sizing: border-box;
  }

  .form-input {
    &.border-Bottom {
      border: 0;
      border-bottom: var(--theme-small-border);
      border-color: var(--border-color);
    }
    &.border-Outline {
      border: var(--theme-small-border);
      border-color: var(--border-color);
      border-radius: var(--border-radius);
    }

    position: absolute;
    width: 100%;
    height: 100%;
    font-size: var(--input-font-size);
    outline: none;
    padding: var(--input-padding);
    background: none;
    z-index: 1;
    color: var(--input-color);

    &:focus + .form-label {
      z-index: 10;
      top: 0;
      left: var(--label-focus-left);
      transform: translateY(-55%);
      font-weight: var(--input-focus-weigth);
      color: var(--input-focus-color);
      font-size: var(--input-focus-font-size);
      border-color: var(--border-color-focus);
    }
    &:not(:placeholder-shown).form-input:not(:focus) + .form-label {
      top: 0;
      left: var(--label-focus-left);
      transform: translateY(-55%);
      z-index: 10;
      font-weight: var(--input-focus-weigth);
      font-size: var(--input-focus-font-size);
    }
  }

  .form-label {
    position: absolute;
    display: block;
    top: 50%;
    left: var(--label-left);
    transform: translateY(-50%);
    padding: var(--label-padding);
    color: var(--label-color);
    font-size: var(--label-font-size);
    background-color: var(--background-color);
    text-align: center;

    transition: 0.2s;
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
      margin: var(--icon-margin);
      color: var(--icon-color);
    }
  }

  .icons-right {
    .form-input {
      padding: 1rem 1.7rem 1rem 1rem;
    }

    .icon {
      position: absolute;
      right: 0;
      margin: var(--icon-margin);
      color: var(--icon-color);
    }
  }
  p {
    position: absolute;
    z-index: 1;
    font-size: var(--message-font-size);
    transition: opacity 0.5s linear, bottom 0.5s;
    bottom: var(--message-bottom);
    left: var(--message-left);

    &.helper {
      color: var(--theme-info);
      opacity: 0;
      transition: opacity 0.5s linear, bottom 0.5s;
    }
    &.helper-show {
      opacity: 0.75;
      color: var(--theme-info);
      transition: opacity 0.5s linear, bottom 0.5s;
    }
    &.error {
      color: var(--theme-error);
      opacity: 0;
      transition: opacity 0.5s linear, bottom 0.5s;
    }
    &.error-show {
      color: var(--theme-error);
      opacity: 0.75;
      transition: opacity 0.5s linear, bottom 0.5s;
    }
    &.MsgUp {
      bottom: var(--message-error-bottom-focus);
      transition: opacity 0.5s linear, bottom 0.5s;
    }
  }
</style>
