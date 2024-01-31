<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy } from "svelte";
  import { actionWatchSize } from "$actions/watchSize/watchSize";
  import type { TFormContext } from "../../Form/types";

  type TtextareaStyle = "primary" | "secondary" | "dark" | "light";
  /** choose default theme colors */
  export let textareaStyle: TtextareaStyle = "dark";
  /** pass the function to validation */
  export let validationFn: (value: string) => undefined | string | boolean = () => true;
  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;
  /** shows if the component is valid (readonly) */
  export let isValid = true;
  /** Enter label text */
  export let label = "";
  /** number of initial lines */
  export let rows = 2;
  /** maximum number of lines before scroll */
  export let maxRows = 0;
  /** set an error message */
  export let errorMsg = "";
  /** write a helpertext if needed */
  export let helperText = "";
  /** Enable the textarea to be resizable */
  export let resizable = false;

  /**
   * The textarea element (readonly)
   * @type {HTMLTextAreaElement}
   * */
  export let textareaElement: HTMLTextAreaElement | null = null;

  /**
   * Required
   * @type {string}
   */
  export let name: string;
  export let disabled = false;
  export let value = "";
  export let required = false;
  export let readonly = false;
  export let placeholder = "";
  export let id = name;

  // Other attributes for the HTML textarea element
  export let textareaAttributes: Record<string, string> = {};

  let eMsg = "deu ruim";
  let helper = false;
  let invalid = forceInvalid;
  let wrapperElement: HTMLElement;
  let clipPathVariables = {
    borderWidth: "0px",
    labelWidth: "0px",
    labelHeight: "0px",
  };
  let labelComponent: HTMLElement;
  let inFocus = false;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } =
    isInsideContext && getContext<TFormContext>("FormContext");

  const focused = () => {
    inFocus = !inFocus;
    if (invalid) {
      helper = false;
    } else {
      helper = !helper;
    }
  };

  const checkStatus = (answer: undefined | string | boolean) => {
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
  };

  const changed = () => {
    invalid = false;
    helper = true;
  };

  const validation = () => {
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
  };

  const setValue = (ev: InputEvent) => {
    const x = (ev.target as HTMLInputElement).value;
    value = x;
  };

  // function to form context force input value
  const forceValue = (_value: unknown) => {
    value = _value as string;
  };

  function handleLabelResize(ev: CustomEvent<ResizeObserverSize>) {
    clipPathVariables = {
      ...clipPathVariables,
      labelHeight: `${ev.detail.blockSize}px`,
      labelWidth: `${ev.detail.inlineSize}px`,
    };
  }

  $: if (forceInvalid) validation();
  $: minHeight = `${1 + rows * 1.2}em`;
  $: maxHeight = maxRows ? `${1 + maxRows * 0.8}rem` : "auto";

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (textareaElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  $: if (wrapperElement && labelComponent) {
    clipPathVariables = {
      ...clipPathVariables,
      borderWidth: `${getComputedStyle(wrapperElement).borderWidth}`,
    };
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(name, value, isValid, required, wrapperElement, validation, forceValue);
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
  style="
    --border-width: {clipPathVariables.borderWidth};
    --label-height: {clipPathVariables.labelHeight};
    --label-width: {clipPathVariables.labelWidth};
  "
>
  <div
    class="textarea-container textarea-style-{textareaStyle}"
    class:filled={value?.length > 0}
    class:inFocus
    class:invalid
    bind:this={wrapperElement}
  >
    <div
      class="textarea-wrapper"
      class:resizable
      style="--max-auto-height:{maxHeight}"
    >
      <pre
        style="min-height:{minHeight}; max-height:{maxHeight}"
        aria-hidden="true">
        {`${value || placeholder}\n`}
      </pre>
      <textarea
        on:focus={focused}
        on:input={changed}
        on:input={setValue}
        on:blur={focused}
        on:blur={validation}
        on:input
        on:change
        on:keypress
        bind:this={textareaElement}
        {rows}
        {name}
        {id}
        {placeholder}
        {value}
        {disabled}
        {readonly}
        {required}
        {...textareaAttributes}
      />
    </div>
    {#if label}
      <label
        for={id}
        class="label"
        class:required
        bind:this={labelComponent}
        use:actionWatchSize
        on:actionResize={handleLabelResize}
      >
        <div class="label-text">
          {label}
        </div>
      </label>
    {/if}
  </div>
  <p
    class="helper message"
    class:helper-show={helper}
  >
    {helperText}
  </p>
  <p
    class="error message"
    class:error-show={invalid}
    class:show={(helper && helperText?.length > 0) || invalid}
  >
    {eMsg}
  </p>
</div>

<style lang="scss">
  @use "$styles/mixins" as m;

  .content-container {
    --margin-bottom: var(--uai-textarea-margin-bottom, 1.5rem);

    --message-left: var(--uai-textarea-message-left, 1rem);
    --message-error-bottom-focus: var(--uai-textarea-message-error-bottom-focus, -2rem);

    --error-height-hidden: var(--uai-textarea-error-height-hidden, 0);

    margin-bottom: calc(var(--margin-bottom) - 20px);
    .textarea-container::before {
      @include m.clip-path-border(
        var(--border-width),
        var(--label-width),
        var(--label-height),
        0px,
        12.8px
      );
    }
  }

  .textarea-container {
    --label-color: var(--uai-textarea-label-color, var(--default-label-color));
    --label-padding: var(--uai-textarea-label-padding, 0 0.3125rem);
    --label-background-color: var(--uai-textarea-background-color, transparent);

    --textarea-color-text: var(--uai-textarea-color-text, var(--default-textarea-color));
    --border-color: var(--uai-textarea-border-color, var(--default-border-color));
    --border: var(--uai-textarea-border, var(--theme-small-border));
    --placeholder-color: var(--uai-textarea-placeholder-color, var(--default-placeholder-color));
    --margin-top: var(--uai-textarea-margin-top, 0.5rem);
    --max-width: var(--uai-textarea-max-width, 100%);
    --max-height: var(--uai-textarea-max-height, var(--max-auto-height));
    --padding: var(--uai-textarea-padding, var(--theme-fields-padding));

    --border-radius: var(--uai-textarea-border-radius, var(--theme-small-shape));

    &.textarea-style-primary {
      --default-label-color: var(--theme-primary-txt);
      --default-textarea-color: var(--theme-primary-inserted-text);
      --default-border-color: var(--theme-primary-txt);
      --default-placeholder-color: var(--theme-primary-txt);
    }
    &.textarea-style-secondary {
      --default-label-color: var(--theme-secondary-txt);
      --default-textarea-color: var(--theme-secondary-inserted-text);
      --default-border-color: var(--theme-secondary-txt);
      --default-placeholder-color: var(--theme-secondary-txt);
    }
    &.textarea-style-dark {
      --default-label-color: var(--theme-dark-txt);
      --default-textarea-color: var(--theme-dark-inserted-text);
      --default-border-color: var(--theme-dark-txt);
      --default-placeholder-color: var(--theme-dark-txt);
    }
    &.textarea-style-light {
      --default-label-color: var(--theme-light-txt);
      --default-textarea-color: var(--theme-light-inserted-text);
      --default-border-color: var(--theme-light-txt);
      --default-placeholder-color: var(--theme-light-txt);
    }

    &.filled {
      --border-color-filled: var(--uai-textarea-border-color-filled, var(--border-color));
    }

    &.inFocus {
      --border-color-focus: var(
        --uai-textarea-border-color-focus,
        var(--border-color-filled, var(--border-color))
      );
    }

    @include m.border(
      var(--border),
      var(--border-color-focus, var(--border-color-filled, var(--border-color)))
    );
    border-radius: var(--border-radius);
    position: relative;
    margin-top: var(--margin-top);
    height: fit-content;
    width: 100%;
    max-width: var(--max-width);
  }
  .label {
    position: absolute;
    top: -0.5rem;
    left: 0.8rem;
    padding: var(--label-padding);
    background: var(--label-background-color);
    @include m.form-field-label-floated-size;

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

  .textarea-wrapper {
    position: relative;
    width: 100%;
    max-width: var(--max-width);
    max-height: var(--max-height);
    overflow: hidden;

    &.resizable {
      resize: both;
    }
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    visibility: hidden;
    border-radius: var(--border-radius);
  }
  pre,
  textarea {
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: inherit;

    margin: var(--padding);
    box-sizing: border-box;
    width: calc(100% - 2 * var(--padding));
    height: calc(100% - 2 * var(--padding));
    border: none;
    background-color: transparent;
    overflow: hidden;
    color: var(--textarea-color-text);
  }

  textarea {
    position: absolute;
    overflow-y: auto;
    resize: none;
    inset: 0;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0px;
    }
    &::-webkit-scrollbar-track {
      background-color: trasparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1.5rem;
      background-clip: content-box;
      border: 0.3125rem solid trasparent;
    }
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

    &:focus {
      outline: none;
    }
  }
  .invalid {
    @include m.border(var(--border), var(--theme-error));
    textarea {
      color: var(--theme-error);

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
    .label {
      .label-text {
        @include m.text-color(var(--theme-error));
      }
    }
  }
  .message {
    position: relative;
    max-width: 11rem;
    margin-left: var(--message-left);

    &.helper {
      @include m.form-field-helper-text();
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
      @include m.text-color(var(--theme-info));
      height: 0;
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
      height: var(--error-height-hidden);
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
</style>
