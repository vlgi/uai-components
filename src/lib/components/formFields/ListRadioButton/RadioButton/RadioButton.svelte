<script lang="ts">
  import Icon from "../../../Icon/Icon.svelte";

  type TRadioStyleType = "filled" | "notFilled" | "badge-pill";
  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";

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

  /**
   * Set the position of the X icon in the styled badge
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the badge
   */
  export let badgeStyle: TBadgeStyle = "dark";

  /**
   * Variable that set if the uncheck of radio button checked is enabled
   * @type {boolean}
   */
  export let enableUncheck = false;

  let labelElement: HTMLElement;

  function disableIfChecked() {
    if (enableUncheck && value === group) {
      group = "";
    }
  }
</script>

<div
  class="radio-item badge-style-{badgeStyle}"
  class:badge-pill={radioStyleType === "badge-pill"}
  class:on={value === group}
  on:click={() => {
    // I don't know why, but this function inside on:click trigger three times
    labelElement.click();
  }}
>
  <input
    type="radio"
    {name}
    {id}
    {value}
    bind:group
    on:click={disableIfChecked}
    on:click
    class="radio-input radio-style-type-{radioStyleType}"
  />

  {#if radioStyleType === "badge-pill"}
    {#if iconPosition === "left" || iconPosition === "both"}
      {#if value === group}
        <Icon iconName="ion:close-circle"/>
      {/if}
    {/if}
    <label for={id} bind:this={labelElement} class="badge-label">
      {label !== undefined ? label : ""}
    </label>
    {#if iconPosition === "right" || iconPosition === "both"}
      {#if value === group}
      <Icon iconName="ion:close-circle"/>
      {/if}
    {/if}
  {:else}
    <label for={id} bind:this={labelElement} class="radio-label">
      <div class="radio-button" class:checked={group === value}>
        <div class="radio-button-inner"></div>
      </div>

      <span>
        {label !== undefined ? label : ""}
      </span>
    </label>
  {/if}
</div>

<style lang="scss">

  @use 'src/styles/mixins' as m;
  .radio-item {
    --radio-margin: var(--szot-radio-margin, 0);
    --radio-size: var(--szot-radio-size, 1rem);
    --radio-filled-gap: var(--szot-radio-filled-gap, .5rem);
    --radio-gap-label: var(--szot-radio-gap-label, 0);
    --radio-color: var(--szot-radio-color, var(--theme-dark-txt));
    --radio-border: var(--szot-radio-border, 0.125em);
    --radio-checked-color: var(--szot-radio-checked-color, var(--radio-color));
    --radio-label-color: var(--szot-radio-label-color, var(--theme-dark-txt));

    --badge-pill-margin: var(--szot-radio-margin, 0.3125rem);
    --badge-pill-min-height: var(--szot-radio-badge-pill-min-height, 1.875rem);
    --badge-pill-height: var(--szot-radio-badge-pill-height, auto);
    --border-size: var(--szot-radio-border, 0.15rem);
    --border-radius: var(--szot-radio-badge-pill-border-radius, 1rem);
    --badge-pill-background-color: var(--szot-radio-badge-pill-background-color, #aaa);
    --badge-pill-max-width: var(--szot-radio-badge-pill-max-width, auto);
    --badge-pill-font-size: var(--szot-radio-badge-pill-font-size, var(--theme-fields-font-size));
    --badge-pill-font-weight: var(--szot-radio-badge-pill-font-weight, normal);

    &.badge-style-dark {
      --default-border-color: var(--theme-dark-txt);
      --default-label-color: var(--theme-dark-txt);
      --default-icon-color: var(--theme-dark-txt);
    }

    &.badge-style-light {
      --default-border-color: var(--theme-light-txt);
      --default-label-color: var(--theme-light-txt);
      --default-icon-color: var(--theme-light-txt);
    }

    &.badge-style-primary {
      --default-border-color: var(--theme-primary-txt);
      --default-label-color: var(--theme-primary-txt);
      --default-icon-color: var(--theme-primary-txt);
    }

    &.badge-style-secondary {
      --default-border-color: var(--theme-secondary-txt);
      --default-label-color: var(--theme-secondary-txt);
      --default-icon-color: var(--theme-secondary-txt);
    }

    &.on {
      --border-color-selected: var(--szot-radio-badge-pill-selected-border-color);
      --label-color-selected: var(--szot-radio-badge-pill-selected-label-color);
      --icon-color-selected: var(--szot-radio-badge-pill-selected-icon-color);
      --background-selected: var(--badge-pill-background-color);
    }

    --badge-pill-border-color: var(--border-color-selected, var(--szot-radio-badge-pill-border-color, var(--default-border-color)));
    --badge-pill-label-color: var(--label-color-selected, var(--szot-radio-badge-pill-label-color, var(--default-label-color)));
    --badge-pill-icon-color: var(--icon-color-selected, var(--szot-radio-badge-pill-icon-color, var(--default-icon-color)));
    --background: var(--background-selected, none);

    display: flex;
    flex-direction: row;
    padding: 0 0.375em;
    align-items: center;
    margin: var(--radio-margin);
    width: fit-content;

    &.badge-pill {
      --szot-icon-color: var(--badge-pill-icon-color);

      max-width: var(--badge-pill-max-width);
      height: var(--badge-pill-height);
      min-height: var(--badge-pill-min-height);
      margin: var(--badge-pill-margin);
      border-radius: var(--border-radius);
      @include m.border(var(--border-size), var(--badge-pill-border-color));
      background: var(--background);

      .badge-label {
        @include m.text-color(var(--badge-pill-label-color));
        font-size: var(--badge-pill-font-size);
        font-weight: var(--badge-pill-font-weight);
        margin-inline: 0.5rem;
        pointer-events: none;
      }
    }

    .radio-input {
      display: none;
    }

    .radio-label {
      @include m.text-color(var(--radio-label-color));
      font-weight: normal;
      display: inline-flex;
      align-items: center;
      pointer-events: none;
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
      width: calc(var(--radio-size) - var(--radio-filled-gap));
      height: calc(var(--radio-size) - var(--radio-filled-gap));
    }

    .radio-style-type-filled:checked + .radio-label .radio-button-inner {
      width: var(--radio-size);
      height: var(--radio-size);
    }
  }
</style>
