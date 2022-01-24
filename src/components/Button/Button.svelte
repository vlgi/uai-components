<script lang="ts">
  /**
   * Is this the principal call to action on the page?
   */
  export let primary = false;

  /**
   * What background color to use
   */
  export let backgroundColor: string = null;
  /**
   * How large should the button be?
   */
  export let size: "small" | "medium" | "large" = "medium";

  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";

  const style = backgroundColor ? `background-color: ${backgroundColor}` : "";
</script>

<button
  data-testid="btn-visible"
  type="button"
  class={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
  {style}
  on:click>
  <slot></slot>
</button>

<!-- hidden button, to test css inject -->
<button id="btn-hidden" data-testid="btn-hidden">hi</button>

<style lang="scss">
  $primary: #1ea7fd;

  .storybook-button {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  }
  .storybook-button--primary {
    color: white;
    background-color: $primary;
  }
  .storybook-button--secondary {
    color: #333;
    background-color: transparent;
  }
  .storybook-button--small {
    font-size: 12px;
    padding: 10px 16px;
  }
  .storybook-button--medium {
    font-size: 14px;
    padding: 11px 20px;
  }
  .storybook-button--large {
    font-size: 16px;
    padding: 12px 24px;
  }
  #btn-hidden {
    display: none;
    visibility: hidden;
  }
</style>
