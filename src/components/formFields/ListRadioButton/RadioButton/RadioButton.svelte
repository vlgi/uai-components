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

  export let value: string | number;

  export let group: string;

</script>

<div class="radio-item">
  <input
    type="radio"
    {name}
    {id}
    {value}
    bind:group
    on:click
    class="radio-input radio-style-type-{radioStyleType}"
  />

  <label for={id} class="radio-label">
    <div class="radio-button" class:checked={group === value}>
      <div class="radio-button-inner"></div>
    </div>

    <span>
      {label !== undefined ? label : ""}
    </span>
  </label>

</div>

<style lang="scss">

  @use 'src/styles/mixins' as m;
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --radio-gap-label: var(--szot-radio-gap-label, 0);
    --radio-color: var(--szot-radio-color, var(--theme-dark-txt));
    --radio-border: var(--szot-radio-border, 0.125em);
    --radio-checked-color: var(--szot-radio-checked-color, var(--radio-color));
    --radio-label-color: var(--szot-radio-label-color, var(--theme-dark-txt));

    display: flex;
    padding: 0 0.375em;
    margin: var(--radio-margin);

    .radio-input {
      display: none;
    }

    .radio-label {
      @include m.text-color(var(--radio-label-color));
      font-weight: normal;
      display: inline-flex;
      align-items: center;
      gap: 0 var(--radio-gap-label);
    }
    .radio-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.3125em 0 0;

      min-width: var(--radio-size);
      max-width: var(--radio-size);

      min-height: var(--radio-size);
      max-height: var(--radio-size);

      border-radius: calc(var(--radio-size) / 2);
      @include m.border(var(--radio-border), var(--radio-color));
      background: transparent;

      &.checked {
        @include m.border(var(--radio-border), var(--radio-checked-color));
      }
    }

    .radio-button-inner {
      width: 0;
      height: 0;
      background: var(--radio-checked-color);
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
