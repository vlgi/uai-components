<script lang="ts">
  import { isTruthy } from "$helpers/truthy";

  /**
   * The title for the card.
   * @type {string}
   */
  export let title = "";

  /**
   * Whether there should be a gray background around the body (default slot).
   * @type {boolean}
   */
  export let bodySlotted = false;

  /**
   * Returns true if there is something in the header slot, false otherwise.
   */
  function hasHeaderSlot(): boolean {
    return isTruthy(($$slots as { header: unknown }).header);
  }
</script>

<div
  class="card-border gradient"
  on:click
  on:keyup
>
  <div
    class="card"
    class:with-header={title !== "" || hasHeaderSlot()}
    class:slotted={bodySlotted}
  >
    {#if title !== "" || hasHeaderSlot()}
      <div class="card-header">
        {#if title !== ""}
          <p class="card-title">{title}</p>
        {/if}
        <!-- The slot for placing stuff next to the title. -->
        <slot name="header" />
      </div>
    {/if}
    <div
      class="card-body"
      class:slotted={bodySlotted}
      class:with-header={title !== "" || hasHeaderSlot()}
    >
      <!-- The body of the card. May be surrounded by a gray background -->
      <slot />
    </div>

    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</div>

<style lang="scss">
  .card-border {
    box-sizing: content-box;
    overflow: hidden;
    height: 100%;
    padding: var(--card-border-size, 0);
    box-shadow: var(--card-box-shadow, 0rem 0rem 0.25rem 0rem #00000012);

    border-radius: var(--card-border-radius, 0.75em);
    background-clip: padding-box;
    background-color: transparent;

    &.gradient {
      background: var(--card-border-color, transparent);
    }
  }

  .card {
    display: grid;
    grid: 1fr / 1fr;
    overflow: hidden;
    height: 100%;

    background: var(--card-background, white);
    border-radius: var(--card-border-radius, 0.75em);

    // this exists to make it possible to use borders when
    // the background of the card is transparent.
    // In this case --card-border-color does not work as it
    // will cover the entire card with the defined color.
    border: var(--card-border-not-gradient, none);

    --padding: 1.5em;
    padding: var(--card-padding, var(--padding));

    &.slotted {
      --padding: 0.625em;
    }
    &.with-header {
      grid: auto 1fr / 1fr;
      padding-top: 0;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: var(--card-padding-header, 0.9375em calc(1.5em - var(--padding)) 0.9375em);
    }
    &-title {
      font-weight: var(--card-title-font-weight, 600);
      font-size: var(--card-title-font-size, 1.25rem);
      width: 90%;
      margin-top: var(--card-title-margin-top, 0.45em);
      margin-bottom: var(--card-title-margin-bottom, 0.25em);
      margin-right: var(--card-title-margin-right, 1em);
    }
    &-body {
      height: 100%;
      overflow: hidden;

      &.slotted {
        background: var(--card-slotted-background, #808080);
        border-radius: var(--card-slotted-border-radius, 0.75em);
        padding: var(--card-slotted-padding, 0.625em);
      }
    }
  }
</style>
