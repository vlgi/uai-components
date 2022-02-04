<script lang="ts">
  type TtextareaStyle = "Primary" | "Secondary" | "Dark" | "Light" | "Custom";
  /** choose default theme colors or "Custom" to set a custom color */
  export let textareaStyle: TtextareaStyle = "Primary";
  /** pass the function to validation */
  export let validationFn = (value) => {}; //eslint-disable-line
  /** if you want to force invalid, change it to true */
  export let ForceInvalid = false;
  /** shows if the component is valid */
  export let isValid = true;
  /** Enter label text */
  export let label = "";
  /** textarea content */
  export let value = "";
  /** write the placeholder */
  export let placeholder = "";
  /** number of initial lines */
  export let rows = 3;
  /** minimum number of lines */
  export let minRows = rows;
  /** maximum number of lines before scroll */
  export let maxRows = "";
  /** disable component */
  export let disabled = false;
  /** sets the component to readonly */
  export let readonly = false;
  type Twrap = "hard" | "soft" | "off";
  /** Indicates how the control wraps text. */
  export let wrap: Twrap = "soft";
  /** defines whether the textarea is spell-checked by the browser */
  export let spellcheck = false;
  /** defines if the field is mandatory */
  export let required = false;
  /** minimum characters */
  export let minlength = -1;
  /** maximum characters */
  export let maxlength = -1;
  /** The visible width of the text control, in average character widths. */
  export let cols = 20;
  type Tautocomplete = "on" | "off";
  /** defines whether the value of the control can be auto-populated by the browser. */
  export let autocomplete: Tautocomplete = "off";
  /** set an error message */
  export let errorMsg = "";
  /** write a helpertext if needed */
  export let helperText = "";

  let eMsg = "deu ruim";
  let helper = false;
  let MsgUp = false;
  let invalid = ForceInvalid;
  let fist = false;

  const focused = () => {
    helper = !helper;
    MsgUp = !MsgUp;
  };

  const checkStatus = (answer) => {
    if (answer === true) {
      isValid = true;
      invalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      invalid = !isValid;
    } else if (answer === undefined) {
      isValid = true;
      invalid = !isValid;
    } else if (typeof answer === "string") {
      isValid = false;
      invalid = !isValid;
      eMsg = answer;
    }
  };

  const changed = () => {
    if (ForceInvalid) {
      invalid = true;
    } else {
      invalid = false;
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
      } else {
        checkStatus(validationFn(value));
      }
    } else if (fist) {
      checkStatus(validationFn(value));
    }
    fist = true;
  };

  const setValue = () => {
    const x = document.querySelector("textarea").value;
    value = x;
  };


  function getScrollHeight(elm) {
    let savedValue = elm.value;
    elm.value = "";
    elm._baseScrollHeight = elm.scrollHeight;
    elm.value = savedValue;
  }
  function onExpandableTextareaInput({ target: elm }) {
    if (
      !elm.classList.contains("autoExpand") ||
      `${!elm.nodeName}` == "TEXTAREA"
    )
      return;
    let maxRows = elm.getAttribute("data-max-rows") | 0;
    let minRows = elm.getAttribute("data-min-rows") | 0,
      rows;
    !elm._baseScrollHeight && getScrollHeight(elm);
    elm.rows = minRows;
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16);
    elm.rows = minRows + rows;
    if (elm.rows >= maxRows && maxRows !== 0) {
      elm.rows = maxRows;
    }
  }

  document.addEventListener("input", onExpandableTextareaInput);
</script>

<div class="textarea-style-{textareaStyle}" class:invalid>
  <p>
    <textarea
      on:focus={focused}
      on:focus={validation}
      on:input={changed}
      on:input={setValue}
      on:input
      on:blur={focused}
      on:blur={validation}
      class="autoExpand"
      data-min-rows={minRows}
      data-max-rows={maxRows}
      {rows}
      {placeholder}
      {value}
      {disabled}
      {readonly}
      {wrap}
      {spellcheck}
      {required}
      {minlength}
      {maxlength}
      {cols}
      {autocomplete}
    />
  </p>
  <label for="" class="label">
    {label}
  </label>

  <p class="helper" class:helper-show={helper}>{helperText}</p>
  <p class="error" class:error-show={invalid} class:MsgUp>{eMsg}</p>
</div>

<style lang="scss">
  div {
    position: relative;
    margin-bottom: var(--szot-margin-bottom, 1.5rem);
    font-family: var(--theme-font-family);
  }
  .label {
    position: absolute;
    top: -0.65rem;
    left: 0.6rem;

    padding: var(--szot-label-padding, 0 0.1875rem);
    font-size: var(--szot-label-font-size, 0.75rem);
    font-weight: var(--szot-label-font-weight, 600);
    line-height: var(--szot-label-line-height, 1rem);

    color: var(--szot-label-color, #a0a0a0);
    background-color: var(--szot-label-background-color, white);
  }

  textarea {
    position: relative;
    box-sizing: padding-box;
    overflow-y: auto;
    color: var(--szot-textarea-color, #838383);
    background-color: transparent;
    min-width: 10rem;
    min-height: 3rem;

    padding: var(--theme-global-small-padding);
    width: var(--szot-width, 12rem);

    max-height: var(--theme-fields-max-width);
    font-size: var(--theme-p-font-size);

    border: var(--theme-small-border);
    border-color: var(--szot-border-color, #5f5f5f);
    border-radius: var(--theme-large-shape);
    resize: var(--szot-resize, none);

    scrollbar-width: none;
    &::-webkit-input-placeholder {
      font-size: var(--szot-placeholder-font-size, 0.8rem);
      color: var(--szot-placeholder-color, #838383);
    }
    &:-moz-placeholder {
      /* Firefox 18- */
      font-size: var(--szot-placeholder-font-size, 0.8rem);
      color: var(--szot-placeholder-color, #838383);
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      font-size: var(--szot-placeholder-font-size, 0.8rem);
      color: var(--szot-placeholder-color, #838383);
    }

    &:-ms-input-placeholder {
      font-size: var(--szot-placeholder-font-size, 0.8rem);
      color: var(--szot-placeholder-color, #838383);
    }

    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: trasparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 24px;
      background-clip: content-box;
      border: 5px solid trasparent;
    }
  }
  .textarea-style-Primary {
    --szot-label-color: var(--theme-primary-txt);
    --szot-textarea-color: var(--theme-primary-txt);
    --szot-border-color: var(--theme-primary-txt);
    --szot-placeholder-color: var(--theme-primary-txt);
  }
  .textarea-style-Secondary {
    --szot-label-color: var(--theme-secondary-txt);
    --szot-textarea-color: var(--theme-secondary-txt);
    --szot-border-color: var(--theme-secondary-txt);
    --szot-placeholder-color: var(--theme-secondary-txt);
  }
  .textarea-style-Dark {
    --szot-label-color: var(--theme-dark-txt);
    --szot-textarea-color: var(--theme-dark-txt);
    --szot-border-color: var(--theme-dark-txt);
    --szot-placeholder-color: var(--theme-dark-txt);
  }
  .textarea-style-Light {
    --szot-label-color: var(--theme-light-txt);
    --szot-textarea-color: var(--theme-light-txt);
    --szot-border-color: var(--theme-light-txt);
    --szot-placeholder-color: var(--theme-light-txt);
  }
  .invalid {
    textarea {
      border-color: var(--theme-error);
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
  .helper {
    position: absolute;
    z-index: 1;
    font-size: var(--szot-message-font-size, 0.5rem);

    bottom: var(--szot-texthelp-bottom, -0.75rem);
    left: var(--szot-texthelp-left, 1rem);
    color: var(--theme-info);
    opacity: 0;
    transition: opacity 0.5s linear, bottom 0.5s;
  }
  .helper-show {
    opacity: 0.75;
    color: var(--theme-info);
    transition: opacity 0.5s linear, bottom 0.5s;
  }
  .error {
    position: absolute;
    z-index: 1;
    font-size: var(--szot-message-font-size, 0.5rem);

    bottom: var(--szot-texterror-bottom, -0.75rem);
    left: var(--szot-texterror-left, 1rem);
    color: var(--theme-error);
    opacity: 0;
    transition: opacity 0.5s linear, bottom 0.5s;
  }
  .error-show {
    color: var(--theme-error);
    opacity: 0.75;
    transition: opacity 0.5s linear, bottom 0.5s;
  }
  .MsgUp {
    bottom: var(--szot-texterror-bottom-focus, -1.25rem);
    transition: opacity 0.5s linear, bottom 0.5s;
  }
</style>
