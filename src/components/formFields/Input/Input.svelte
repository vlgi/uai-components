<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy } from "svelte";
  import { actionWatchSize } from "../../../actions/watchSize/watchSize";
  import type { TFormContext } from "../../Form/types";
  import Icon from "../../Icon/Icon.svelte";

  /** choose an icon from the list */
  export let icon: string | null = null;

  type TpositionIcon = "left" | "right";
  /** if there is an icon define if it goes to the left or to the right */
  export let iconPosition: TpositionIcon = "right";

  type Tborders = "bottom" | "outline";
  /** choose border type */
  export let border: Tborders = "outline";

  type TborderStyle = "primary" | "secondary" | "dark" | "light";

  type TInputMode = "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";

  /** choose default theme colors */
  export let inputStyle: TborderStyle = "dark";

  /** write a helpertext if needed */
  export let helperText = "";

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /** Enable the icon click */
  export let iconClick = false;

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (
    value: string
  ) => undefined | string | boolean = () => true; //eslint-disable-line

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
  export let inputElement: HTMLInputElement | null = null;

  /**
   * required
   * @type {string}
   */
  export let name: string;

  /**
   * The type of input keyboard when focus component in a device with onscreen keyboard
   * @type {string}
   */
  export let inputmode: TInputMode = "text";

  /**
   * Display asterisk next to label when input is required
   * @type {boolean}
   */
  export let displayRequired = false;

  export let type = "text";
  export let value = "";
  export let disabled = false;
  export let readonly = false;
  export let required = false;
  export let id = name;

  // Other attributes for the HTML input element
  export let inputAttributes: Record<string, string> = {};

  let visuallyInvalid = forceInvalid;
  let helper = false;
  let eMsg = "";
  let wrapperElement: HTMLElement;
  let inFocus = false;
  let clipPathVariables = {
    borderWidth: "0px",
    iconWidth: "0px",
    labelWidth: "0px",
    labelHeight: "0px",
  };
  let labelComponent: HTMLElement;
  let applyClipPath = false;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    fireSubmit,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function focused() {
    inFocus = !inFocus;
    if (visuallyInvalid) {
      helper = false;
    } else {
      helper = !helper;
    }
  }

  function changed() {
    visuallyInvalid = false;
    helper = true;
  }

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
      visuallyInvalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = answer;
    }
  }

  function validation() {
    if (forceInvalid) {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = errorMsg;
    } else if (required && !value) {
      isValid = false;
      visuallyInvalid = !isValid;
      eMsg = "Este campo é obrigatorio";
    } else {
      checkStatus(validationFn(value));
    }
  }

  function setValue(ev: InputEvent) {
    const x = (ev.target as HTMLInputElement).value;
    value = x;
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    value = _value as string;
  }

  function submitOnEnter(ev: KeyboardEvent) {
    if (!isInsideContext) return;
    if (ev.key === "Enter") {
      // eslint-disable-next-line no-void
      void fireSubmit();
    }
  }

  function handleLabelResize(ev: CustomEvent<ResizeObserverSize>) {
    clipPathVariables = {
      ...clipPathVariables,
      labelHeight: `${ev.detail.blockSize}px`,
      labelWidth: `${ev.detail.inlineSize}px`,
    };
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  $: if (wrapperElement && labelComponent) {
    clipPathVariables = {
      ...clipPathVariables,
      borderWidth: getComputedStyle(wrapperElement).borderWidth,
      iconWidth:
        icon && iconPosition === "left"
          ? getComputedStyle(labelComponent)?.marginLeft
          : "0px",
    };
  }

  $: applyClipPath = inFocus || value?.length > 0;

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        isValid,
        required,
        wrapperElement,
        validation,
        forceValue
      );
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div
  class="content-container"
  class:apply-clip-path={applyClipPath}
  style="
    --border-width: {clipPathVariables.borderWidth};
    --label-height: {clipPathVariables.labelHeight};
    --label-width: {clipPathVariables.labelWidth};
    --icon-width: {clipPathVariables.iconWidth};
  "
>
  <div
    class="form-div input-style-{inputStyle} border-{border}"
    class:icons-left={iconPosition === "left" && icon}
    class:icons-right={iconPosition === "right" && icon}
    class:input-filled={value?.length > 0}
    class:visuallyInvalid
    class:inFocus
    class:input-disabled={disabled}
    class:hidden={type === "hidden"}
    bind:this={wrapperElement}
    on:keypress={submitOnEnter}
  >
    <input
      on:focus={focused}
      on:input={changed}
      on:input={setValue}
      on:blur={focused}
      on:blur={validation}
      on:input
      on:change
      on:focus
      on:focusout
      on:keydown
      on:keyup
      on:keypress
      bind:this={inputElement}
      class="form-input"
      placeholder=" "
      {name}
      {type}
      {id}
      {value}
      {disabled}
      {readonly}
      {inputmode}
      {...inputAttributes}
      aria-required={required}
    />
    <label
      for={id}
      class="form-label"
      class:required={required && displayRequired}
      bind:this={labelComponent}
      use:actionWatchSize
      on:actionResize={handleLabelResize}
    >
      <div class="label-text">
        {label}
      </div>
    </label>
    {#if icon}
      {#if iconClick}
        <button class="icon icon-cursor" on:click>
          <Icon iconName={icon} />
        </button>
      {:else}
        <label for={id} class="icon">
          <Icon iconName={icon} />
        </label>
      {/if}
    {/if}
  </div>
  <p class="helper" class:helper-show={helper}>
    {helperText}
  </p>
  <p
    class="error"
    class:error-show={visuallyInvalid}
    class:show={(helper && helperText?.length > 0) || visuallyInvalid}
  >
    {eMsg}
  </p>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .content-container {
    --margin-bottom: var(--szot-input-margin-bottom, 1.5rem);

    --message-top: var(--szot-input-message-top, calc(37.19px + var(--border)));
    --message-left: var(--szot-input-message-left, 1rem);
    --message-error-bottom-focus: var(
      --szot-input-message-error-bottom-focus,
      -2rem
    );

    --label-left: var(--szot-input-label-left, 1.2rem);

    &.apply-clip-path {
      .border-outline::before {
        @include m.clip-path-border(
          var(--border-width),
          var(--label-width),
          var(--label-height),
          0px,
          var(--label-focus-left),
          var(--icon-width, 0px)
        );
      }
    }
  }

  .form-div {
    --margin-top: var(--szot-input-margin-top, 0.5rem);
    --max-width: var(--szot-input-max-width, 100%);

    --input-top: var(--szot-input-top, 0);
    --input-left: var(--szot-input-left, 0);
    --input-padding: var(--szot-input-padding, var(--theme-fields-padding));
    --input-text-color: var(
      --szot-input-text-color,
      var(--default-input-color)
    );
    --border: var(--szot-input-border, var(--theme-small-border));
    --border-color: var(--szot-input-border-color, var(--default-border-color));
    --border-color-not-filled: var(--szot-input-border-color, var(--default-border-color));
    --border-radius: var(--szot-input-border-radius, var(--theme-small-shape));

    --label-padding: var(--szot-input-label-padding, 0rem);
    --label-color: var(--szot-input-label-color, var(--default-label-color));
    --background-color: var(--szot-input-background-color, transparent);

    --placeholder-color: var(
      --szot-input-placeholder-color,
      var(--default-placeholder-color)
    );

    --label-focus-left: var(--szot-input-label-focus-left, 0.8rem);
    --label-focus-color: var(
      --szot-input-label-focus-color,
      var(--label-color)
    );
    --label-not-focus-color: var(
      --szot-input-label-not-focus-color,
      var(--label-color)
    );

    --icon-color: var(--szot-input-icon-color, var(--default-icon-color));

    --icon-left-margin-right: var(--szot-input-icon-margin-right, 0);
    --icon-left-margin-left: var(--szot-input-icon-margin-left, 0.5rem);
    --icon-right-margin-right: var(--szot-input-icon-margin-right, 0.5rem);
    --icon-right-margin-left: var(--szot-input-icon-margin-left, 0);

    &.input-style-primary {
      --default-label-color: var(--theme-primary-txt);
      --default-input-color: var(--theme-primary-inserted-text);
      --default-icon-color: var(--theme-primary-txt);
      --default-border-color: var(--theme-primary-txt);
      --default-placeholder-color: var(--theme-primary-txt);
    }

    &.input-style-secondary {
      --default-label-color: var(--theme-secondary-txt);
      --default-input-color: var(--theme-secondary-inserted-text);
      --default-icon-color: var(--theme-secondary-txt);
      --default-border-color: var(--theme-secondary-txt);
      --default-placeholder-color: var(--theme-secondary-txt);
    }

    &.input-style-dark {
      --default-label-color: var(--theme-dark-txt);
      --default-input-color: var(--theme-dark-inserted-text);
      --default-icon-color: var(--theme-dark-txt);
      --default-border-color: var(--theme-dark-txt);
      --default-placeholder-color: var(--theme-dark-txt);
    }
    &.input-style-light {
      --default-label-color: var(--theme-light-txt);
      --default-input-color: var(--theme-light-inserted-text);
      --default-icon-color: var(--theme-light-txt);
      --default-border-color: var(--theme-ligth-txt);
      --default-placeholder-color: var(--theme-ligth-txt);
    }
    &.input-filled {
      --border-color-filled: var(--szot-input-border-color-filled, var(--border-color-not-filled));
      --border-color: var(--border-color-filled);
    }
    &.inFocus {
      --border-color-focus: var(--szot-input-border-color-focus, var(--border-color-filled, var(--border-color-not-filled)));
      --border-color: var(--border-color-focus);
    }

    &.input-disabled {
      cursor: initial;
      opacity: 0.75;
    }

    &.visuallyInvalid {
      --border-color: var(--theme-error);
      --label-color: var(--theme-error);
      --label-focus-color: var(--theme-error);
      --label-not-focus-color: var(--theme-error);
      .form-input {
        color: var(--theme-error);
        & ~ .icon {
          @include m.text-color(var(--theme-error));
        }
        & ~ .form-label .label-text {
          @include m.text-color(var(--theme-error));
        }
      }

      input {
        &::-webkit-input-placeholder {
          @include m.text-color(var(--theme-error));
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          @include m.text-color(var(--theme-error));
        }

        &::-moz-placeholder {
          /* Firefox 19+ */
          @include m.text-color(var(--theme-error));
        }

        &:-ms-input-placeholder {
          @include m.text-color(var(--theme-error));
        }
      }
    }

    &.border-outline {
      @include m.border(var(--border), var(--border-color));
      border-radius: var(--border-radius);
    }
    &.border-bottom {
      border: 0;
      border-bottom: var(--border) solid var(--border-color);
      border-image: var(--border-color) 1;
    }

    &.hidden {
      --szot-input-label-color: transparent;
      --szot-input-background-color: transparent;
      --szot-input-icon-color: transparent;

      border: none;
    }

    position: relative;
    margin-top: var(--margin-top);
    max-width: var(--max-width);
    height: fit-content;
    box-sizing: border-box;
  }

  .form-input {
    width: var(--max-width);
    outline: none;
    padding: var(--input-padding);
    background: none;
    color: var(--input-text-color);
    font-size: var(--theme-fields-font-size);
    border: none;
    border-radius: var(--border-radius);

    &:focus,
    &:not(:placeholder-shown) {
      & + .form-label {
        z-index: 10;
        top: 0;
        left: var(--label-focus-left);
        transform: translateY(-55%);
        padding: 0 0.3125rem;
        @include m.form-field-label-floated-size;
        .label-text {
          @include m.text-color(var(--label-focus-color));
        }
      }
    }

    // remove  highlight autocomplete
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--input-text-color);
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  .form-label {
    position: absolute;
    display: block;
    top: 47%;
    left: var(--label-left);
    transform: translateY(-50%);
    padding: var(--label-padding);
    background: var(--background-color);
    transition: 0.2s;
    @include m.form-field-label-size;

    .label-text {
      @include m.text-color(var(--label-color));
    }

    &.required {
      .label-text::after {
        content: "*";
        display: inline;
      }
    }
  }
  .icons-left {
    .form-input {
      padding: var(--input-padding) var(--input-padding) var(--input-padding)
        calc(1.5rem + var(--icon-left-margin-left));
    }

    .form-label {
      margin-left: 1rem;
    }

    .icon {
      position: absolute;
      top: 0;
      left: 0;
      background-color: transparent;
      border: 0;
      margin: calc(var(--input-padding) * 1.2) var(--icon-left-margin-right) var(--input-padding) var(--icon-left-margin-left);
      --szot-icon-color: var(--icon-color);
      --szot-icon-line-height: 1rem;
    }
  }

  .icons-right {
    .form-input {
      padding: var(--input-padding)  calc(1.5rem + var(--icon-right-margin-right)) var(--input-padding)
        var(--input-padding);
    }

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      background-color: transparent;
      border: 0;
      margin: calc(var(--input-padding) * 1.2) var(--icon-right-margin-right) var(--input-padding) var(--icon-right-margin-left);
      --szot-icon-color: var(--icon-color);
      --szot-icon-line-height: 1rem;
    }
  }

  input {
    min-height: calc(2 * var(--input-padding) + 1.43em);

    &::-webkit-input-placeholder {
      @include m.text-color(var(--placeholder-color));
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      @include m.text-color(var(--placeholder-color));
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      @include m.text-color(var(--placeholder-color));
    }

    &:-ms-input-placeholder {
      @include m.text-color(var(--placeholder-color));
    }
  }

  p {
    position: relative;
    transition: opacity 0.2s linear, bottom 0.2s;
    margin-left: var(--message-left);

    &.helper {
      @include m.form-field-helper-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
      height: 0;
      @include m.text-color(var(--theme-info));
    }
    &.helper-show {
      @include m.form-field-helper-text();
      @include m.text-color(var(--theme-info));
      height: fit-content;
    }
    &.error {
      @include m.form-field-error-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
      @include m.text-color(var(--theme-error));
      height: 0;
      margin-bottom: var(--margin-bottom);
    }
    &.error-show {
      @include m.form-field-error-text();
      @include m.text-color(var(--theme-error));
      height: fit-content;
    }

    &.show {
      margin-bottom: calc(var(--margin-bottom) - 20px);
    }
  }

  .icon-cursor {
    cursor: pointer;
  }
</style>
