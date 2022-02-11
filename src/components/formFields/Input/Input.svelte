<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../Form/types";
  import Icon from "../../Icon/Icon.svelte";

  /** choose an icon from the list */
  export let icon: string|null = null;

  type TpositionIcon = "left" | "right";
  /** if there is an icon define if it goes to the left or to the right */
  export let iconPosition: TpositionIcon = "right";

  type Tborders = "bottom" | "outline";
  /** choose border type */
  export let border: Tborders = "outline";

  type TborderStyle = "primary" | "secondary" | "dark" | "light";

  /** choose default theme colors */
  export let inputStyle: TborderStyle = "primary";

  /** write a helpertext if needed */
  export let helperText = "";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
  */
  export let validationFn: (value:string)=> undefined|string|boolean = () => true; //eslint-disable-line

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /** Enter label text */
  export let label = "";

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement|null = null;

  /**
   * required
   * @type {string}
   */
  export let name: string;
  export let type = "text";
  export let value = "";
  export let disabled = false;
  export let readonly = false;
  export let required = false;

  // Other attributes for the HTML input element
  export let inputAttributes: Record<string, string> = {};

  let invalid = forceInvalid;
  let helper = false;
  let eMsg = "";
  let MsgUp = false;
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function focused() {
    helper = !helper;
    MsgUp = !MsgUp;
  }

  function changed() {
    invalid = false;
  }

  function checkStatus(answer: undefined|string|boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
      invalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      invalid = !isValid;
      eMsg = answer;
    }
  }

  function validation() {
    if (forceInvalid) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (required && !value) {
      isValid = false;
      invalid = !isValid;
      eMsg = "Este campo é obrigatorio";
    } else {
      checkStatus(validationFn(value));
    }
  }

  function setValue(ev: InputEvent) {
    const x = (ev.target as HTMLInputElement).value;
    value = x;
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(name, value, isValid, required, wrapperElement, validation);
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div
  class="form-div input-style-{inputStyle}"
  class:icons-left={iconPosition === "left" && icon}
  class:icons-right={iconPosition === "right" && icon}
  class:invalid
  bind:this={wrapperElement}
>
  <input
    on:focus={focused}
    on:input={changed}
    on:input={setValue}
    on:blur={focused}
    on:blur={validation}
    on:input
    on:change
    bind:this={inputElement}
    class="form-input border-{border}"
    placeholder=" "
    {name}
    {type}
    {value}
    {disabled}
    {readonly}
    {...inputAttributes}
    aria-required={required}
  />
  <label for="" class="form-label" class:required>
    {label}
  </label>
  {#if icon}
    <div class="icon">
      <Icon iconName={icon} />
    </div>
  {/if}
  <p class="helper" class:helper-show={helper}>
    {helperText}
  </p>
  <p class="error" class:error-show={invalid} class:MsgUp>
    {eMsg}
  </p>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .form-div {
    --margin-bottom: var(--szot-margin-bottom, 1.5rem);
    --width: var(--szot-width, 100%);
    --height: var(--szot-height, var(--theme-fields-height));

    --input-top: var(--szot-input-top, 0);
    --input-left: var(--szot-input-left, 0);
    --input-padding: var(--szot-input-padding, var(--theme-fields-padding));
    --input-color: var(--szot-input-color, var(--default-input-color));
    --border-color: var(--szot-border-color, var(--default-border-color));
    --border-radius: var(--szot-border-radius, var(--theme-small-shape));

    --label-left: var(--szot-label-left, 1.2rem);
    --label-padding: var(--szot-label-padding, 0rem);
    --label-color: var(--szot-label-color, var(--default-label-color));
    --background-color: var(--szot-background-color, white);

    --label-focus-left: var(--szot-label-focus-left, 0.8rem);
    --input-focus-color: var(
      --szot-input-focus-color,
      var(--default-input-focus-color)
    );
    --border-color-focus: var(
      --szot-border-color-focus,
      var(--default-border-color-focus)
    );

    --icon-color: var(--szot-icon-color, var(--default-icon-color));

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
    margin-bottom: var(--margin-bottom);
    width: var(--width);
    max-width: var(--theme-fields-max-width);
    box-sizing: border-box;
  }

  .form-input {
    &.border-bottom {
      border: 0;
      border-bottom: var(--theme-small-border);
      border-color: var(--border-color);
    }
    &.border-outline {
      border: var(--theme-small-border);
      border-color: var(--border-color);
      border-radius: var(--border-radius);
    }

    width: 100%;
    outline: none;
    padding: var(--input-padding);
    background: none;
    color: var(--input-color);
    font-size: inherit;

    &:focus + .form-label {
      z-index: 10;
      top: 0;
      left: var(--label-focus-left);
      transform: translateY(-55%);
      color: var(--input-focus-color);
      border-color: var(--border-color-focus);
      @include m.form-field-label-floated-size;
    }
    &:not(:placeholder-shown).form-input:not(:focus) + .form-label {
      top: 0;
      left: var(--label-focus-left);
      transform: translateY(-55%);
      z-index: 10;
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
    background-color: var(--background-color);
    transition: 0.2s;
    @include m.form-field-label-size;

    &.required::after {
      content: "*";
      display: inline;
    }
  }
  .icons-left {
    .form-input {
      padding: var(--input-padding) var(--input-padding) var(--input-padding) 2rem;
    }

    .form-label {
      margin-left: 1rem;
    }

    .icon {
      position: absolute;
      top: 0;
      left: 0;
      margin: calc(var(--input-padding)*1.2) 0 var(--input-padding) .5rem;
      color: var(--icon-color);
    }
  }

  .icons-right {
    .form-input {
      padding: var(--input-padding) 2rem var(--input-padding) var(--input-padding);
    }

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      margin: calc(var(--input-padding)*1.2) .5rem var(--input-padding) 0;
      color: var(--icon-color);
    }
  }
  p {
    position: absolute;
    z-index: 1;
    transition: opacity 0.2s linear, bottom 0.2s;
    bottom: var(--message-bottom);
    left: var(--message-left);

    &.helper {
      @include m.form-field-helper-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
    }
    &.helper-show {
      @include m.form-field-helper-text();
    }
    &.error {
      @include m.form-field-error-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
    }
    &.error-show {
      @include m.form-field-error-text();
    }
    &.MsgUp {
      bottom: var(--message-error-bottom-focus);
      transition: opacity 0.2s linear, bottom 0.2s;
    }
  }
</style>
