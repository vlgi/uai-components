<script lang="ts">
  export let value = "";
  export let placeholder = "";
  export let maxRows = "";
  export let label = "";

  function getScrollHeight(elm) {
    let savedValue = elm.value;
    elm.value = "";
    elm._baseScrollHeight = elm.scrollHeight;
    elm.value = savedValue;
  }

  function onExpandableTextareaInput({ target: elm }) {
    // make sure the input event originated from a textarea and it's desi#DCDCDC to be auto-expandable
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

  // global delegated event listener
  document.addEventListener("input", onExpandableTextareaInput);
</script>

<textarea
  class="autoExpand"
  rows="3"
  data-min-rows="3"
  data-max-rows={maxRows}
  {placeholder}
  {value}
/>
<label for="" class="label">
  {label}
</label>

<style lang="scss">
  .label {
    position: relative;
    top: -0.65rem;
    left: 0.6rem;

    padding: var(--label-padding, 0 0.1875rem);
    font-size: var(--label-font-size, 0.75rem);
    font-weight: var(--label-font-weight, 600);
    line-height: var(--label-line-height, 1rem);

    color: var(--color-label, #5f5f5f);
    background-color: var(--label-background-color, white);
  }

  textarea {
    position: absolute;
    box-sizing: padding-box;
    overflow-y: auto;
    color: var(--input-color, #838383);

    padding: var(--input-padding, 10px 15px);
    width: var(--width, 16rem);
    max-height: var(--max-heigth);
    font-size: var(--input-font-size, 0.875rem);

    border: var(--border, 0.0625rem solid #5f5f5f);
    border-radius: var(--border-radius, 1.5rem);

    resize: var(--resize, none);
    scrollbar-width: none;

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
</style>
