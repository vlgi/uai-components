<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { TbadgeStyle, TbadgeStyleType } from "./types";

  /** Select the theme color pattern that will be used or Custom to define your own color. */
  export let badgeStyle: TbadgeStyle = "primary";

  export let badgeStyleType: TbadgeStyleType = "filled";

  const dispatch = createEventDispatcher<{
    // dispatch event of click
    click: undefined;
  }>();

  function handleKeyboard(ev: KeyboardEvent) {
    if (ev.key === "Enter") {
      dispatch("click");
    }
  }
</script>

<span
  class="badge {badgeStyle} {badgeStyleType}"
  on:click
  on:keypress={handleKeyboard}
>
  <span class="text"><slot /></span>
</span>

<style lang="scss">
  @use "$styles/mixins" as m;
  .badge {
    --color: var(--uai-badge-color, var(--default-color));
    --background-color: var(--uai-badge-background-color, var(--default-background-color));
    --border: var(--uai-badge-border, var(--default-border));
    --border-color: var(--uai-badge-border-color, var(--default-border-color));
    --font-size: var(--uai-badge-font-size, 0.9rem);
    --padding: var(--uai-badge-padding, 0 var(--theme-fields-padding));

    &.primary {
      --default-background-color: var(--theme-primary-surface);
      --default-color: var(--theme-txt-on-primary-surface);
      --default-border-color: var(--theme-primary-surface);
    }

    &.secondary {
      --default-background-color: var(--theme-secondary-surface);
      --default-color: var(--theme-txt-on-secondary-surface);
      --default-border-color: var(--theme-secondary-surface);
    }

    &.dark {
      --default-background-color: var(--theme-dark-surface);
      --default-color: var(--theme-txt-on-dark-surface);
      --default-border-color: var(--theme-dark-surface);
    }

    &.light {
      --default-background-color: var(--theme-light-surface);
      --default-color: var(--theme-txt-on-light-surface);
      --default-border-color: var(--theme-light-surface);
    }

    &.filled {
      --border-color: transparent;
    }
    &.outline {
      --default-color: var(--border-color);
      --default-background-color: transparent;
      --default-border: var(--theme-small-border);
    }

    &.not-filled {
      --default-color: var(--default-border-color);
      --border-color: transparent;
      --default-background-color: transparent;
    }

    font-size: var(--font-size);
    padding: var(--padding);
    text-align: center;
    @include m.border(var(--border), var(--border-color));
    border-radius: var(--theme-small-shape);
    background: var(--background-color);
    display: inline-block;

    .text {
      white-space: nowrap;
      @include m.text-color(var(--color));
    }
  }
</style>
