<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../Form/types";

  type TtextareaStyle = "primary" | "secondary" | "dark" | "light";
  /** choose default theme colors */
  export let textareaStyle: TtextareaStyle = "primary";
  /** pass the function to validation */
  export let validationFn: (value: string)=> undefined|string|boolean = () => true;
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
  export let textareaElement: HTMLTextAreaElement|null = null;

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
  export let id = "textarea";

  // Other attributes for the HTML textarea element
  export let textareaAttributes: Record<string, string> = {};

  let eMsg = "deu ruim";
  let helper = false;
  let invalid = forceInvalid;
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  const focused = () => {
    if (invalid) {
      helper = false;
    } else {
      helper = !helper;
    }
  };

  const checkStatus = (answer: undefined|string|boolean) => {
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

  $: if (forceInvalid) validation();
  $: minHeight = `${1 + rows * 1.2}em`;
  $: maxHeight = maxRows ? `${1 + maxRows * 0.8}rem` : "auto";

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (textareaElement && isInsideContext) {
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
  class="textarea-container textarea-style-{textareaStyle}"
  class:invalid
  bind:this={wrapperElement}
>
  <div
    class="textarea-wrapper"
    class:resizable
    style="--max-auto-height:{maxHeight}"
  >
    <pre style="min-height:{minHeight}; max-height:{maxHeight}"
      aria-hidden="true"
    >
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
  <label for="{id}" class="label" class:required>
    {label}
  </label>

  <p class="helper message" class:helper-show={helper}>{helperText}</p>
  <p class="error message" class:error-show={invalid}>{eMsg}</p>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .textarea-container {
    --label-color: var(--szot-label-color, var(--default-label-color));
    --label-padding: var(--szot-label-padding, 0 0.15rem);
    --label-background-color: var(--szot-label-background-color, white);

    --textarea-color: var(--szot-textarea-color, var(--default-textarea-color));
    --border-color: var(--szot-border-color, var(--default-border-color));
    --border: var(--szot-border, var(--theme-small-border));
    --placeholder-color: var(
      --szot-placeholder-color,
      var(--default-placeholder-color)
    );
    --margin-bottom: var(--szot-margin-bottom, 1.5rem);
    --max-width: var(--szot-max-width, var(--theme-fields-max-width));
    --max-height: var(--szot-max-height, var(--max-auto-height));
    --padding: var(--szot-padding, var(--theme-fields-padding));

    --message-bottom: var(--szot-texthelp-bottom, -1.2rem);
    --message-left: var(--szot-texthelp-left, 1rem);
    --message-error-bottom-focus: var(
      --szot-message-error-bottom-focus,
      -2rem
    );
    --border-radius: var(--szot-border-radius, var(--theme-small-shape));

    &.textarea-style-primary {
      --default-label-color: var(--theme-primary-txt);
      --default-textarea-color: var(--theme-primary-txt);
      --default-border-color: var(--theme-primary-txt);
      --default-placeholder-color: var(--theme-primary-txt);
    }
    &.textarea-style-secondary {
      --default-label-color: var(--theme-secondary-txt);
      --default-textarea-color: var(--theme-secondary-txt);
      --default-border-color: var(--theme-secondary-txt);
      --default-placeholder-color: var(--theme-secondary-txt);
    }
    &.textarea-style-dark {
      --default-label-color: var(--theme-dark-txt);
      --default-textarea-color: var(--theme-dark-txt);
      --default-border-color: var(--theme-dark-txt);
      --default-placeholder-color: var(--theme-dark-txt);
    }
    &.textarea-style-light {
      --default-label-color: var(--theme-light-txt);
      --default-textarea-color: var(--theme-light-txt);
      --default-border-color: var(--theme-light-txt);
      --default-placeholder-color: var(--theme-light-txt);
    }

    position: relative;
    margin-bottom: var(--margin-bottom);
    height: fit-content;
    width: 100%;
  }
  .label {
    position: absolute;
    top: -0.5rem;
    left: 0.8rem;
    padding: var(--label-padding);

    color: var(--label-color);
    background-color: var(--label-background-color);
    @include m.form-field-label-floated-size;

    &.required::after {
      content: "*";
      display: inline;
    }
  }

  .textarea-wrapper {
    position: relative;
    border: var(--theme-small-border);
    border-color: var(--border-color);
    border-radius:var(--border-radius);

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
  }
  pre, textarea {
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    line-height: inherit;
    font-style: inherit;

    margin: var(--padding);
    box-sizing: border-box;
    width: calc(100% - 2*var(--padding));
    height: calc(100% - 2*var(--padding));
    border: none;

    overflow: hidden;
    color: var(--textarea-color);
    background-color: transparent;
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
      color: var(--placeholder-color);
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      color: var(--placeholder-color);
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: var(--placeholder-color);
    }

    &:-ms-input-placeholder {
      color: var(--placeholder-color);
    }

    &:focus {
      outline: none;
    }
  }
  .invalid {
    .textarea-wrapper {
      border-color: var(--theme-error);
    }
    textarea {
      color: var(--theme-error);

      &::-webkit-input-placeholder {
        color: var(--theme-error);
      }
      &:-moz-placeholder {
        /* Firefox 18- */
        color: var(--theme-error);
      }

      &::-moz-placeholder {
        /* Firefox 19+ */
        color: var(--theme-error);
      }

      &:-ms-input-placeholder {
        color: var(--theme-error);
      }
    }
  .label {
      color: var(--theme-error);
    }
  }
  .message {
    position: absolute;
    z-index: 1;
    max-width: 11rem;
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
  }
</style>
