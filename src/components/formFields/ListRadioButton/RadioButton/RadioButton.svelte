<script lang="ts">
  /**
   * The label text for this element
   * @type {string}
   */
  export let label: string;
  /**
   * The name text for this element
   * @type {string}
   */
  export let name: string;

  export let id = "radioId";

  /**
   * The Value text for this element
   * @type {string}
   */
  export let value: string;
  /**
   * The filled property for this element
   * @type {boolean}
   */
  export let filled: boolean;
  /**
   * The checked property for this element
   * @type {boolean}
   */
  export let checked: boolean;
</script>

<div class="radio-item">
  <input
    {...$$restProps}
    type="radio"
    {name}
    {id}
    {value}
    class:filled
    class="radio-input"
    {checked}
  />

  <label for={id} class="radio-label">{label !== undefined ? label : ""}</label>
</div>

<style lang="scss">
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --border-color: var(--szot-border-color, #5f5f5f);
    --radio-color: var(--szot-radio-color, var(--border-color));
    --radio-label-color: var(--szot-radio-label, #5f5f5f);

    display: inline-block;
    position: relative;
    padding: 0 0.375rem;
    margin: var(--radio-margin);

    input[type="radio"] {
      display: none;
    }

    label {
      color: var(--radio-label-color);
      font-weight: normal;
    }

    label:before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 0.1875rem;
      margin: 0 0.3125rem 0 0;
      width: var(--radio-size);
      height: var(--radio-size);
      border-radius: calc(var(--radio-size) / 2);
      border: 0.125rem solid var(--radio-color);
      background-color: transparent;
    }

    input[type="radio"]:checked + label:after {
      width: calc(var(--radio-size) - 0.5rem);
      height: calc(var(--radio-size) - 0.5rem);
      border-radius: calc(var(--radio-size) / 2);
      position: absolute;
      top: 0.4375rem;
      left: 0.625rem;
      content: " ";
      display: block;
      background: var(--radio-color);
    }

    .filled:checked + label:before {
      background-color: var(--radio-color);
    }
  }
</style>
