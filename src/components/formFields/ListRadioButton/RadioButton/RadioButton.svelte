<script lang="ts">
  type TRadioStyleType = "filled" | "notFilled";

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the radio element
   * @type {string}
   */
  export let name: string;

  /**
   * The name for the radio element, default is equal to name
   * @type {string}
   */
  export let id = name;

  /**
   * The radioStyleType text for this element
   * @type {string}
   */
  export let radioStyleType: TRadioStyleType = "notFilled";

  export let value: string;

  export let group: string;
</script>

<div class="radio-item">
  <input
    type="radio"
    {name}
    {id}
    {value}
    bind:group
    class="radio-input radio-style-type-{radioStyleType}"
  />

  <label for={id} class="radio-label">
    <div class="radio-button">
      <div class="radio-button-inner"></div>
    </div>

    <span>
      {label !== undefined ? label : ""}
    </span>
  </label>
</div>

<style lang="scss">
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --border-color: var(--szot-radio-border-color, var(--theme-dark-txt));
    --radio-color: var(--szot-radio-color, var(--border-color));
    --radio-label-color: var(--szot-radio-label-color, var(--theme-dark-txt));

    display: flex;
    padding: 0 0.375em;
    margin: var(--radio-margin);

    .radio-input {
      display: none;
    }

    .radio-label {
      color: var(--radio-label-color);
      font-weight: normal;
      display: inline-flex;
      align-items: center;
    }

    .radio-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.3125em 0 0;
      width: var(--radio-size);
      height: var(--radio-size);
      border-radius: calc(var(--radio-size) / 2);
      border: 0.125em solid var(--radio-color);
      background-color: transparent;
    }

    .radio-button-inner {
      width: 0;
      height: 0;
      background: var(--radio-color);
      border-radius: calc(var(--radio-size) / 2);
      transition: width ease-in-out 200ms, height ease-in-out 200ms,;
    }

    .radio-input:checked + .radio-label .radio-button-inner {
      width: calc(var(--radio-size) - 0.5em);
      height: calc(var(--radio-size) - 0.5em);
    }

    .radio-style-type-filled:checked + .radio-label .radio-button-inner {
      width: var(--radio-size);
      height: var(--radio-size);
    }
  }
</style>
