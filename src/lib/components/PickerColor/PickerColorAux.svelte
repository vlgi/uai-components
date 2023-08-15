<script lang="ts">
  /**
   * This component works as an auxiliary for the color picker of the lib
   * "svelte-awesome-color-picker". That way we can customize the color picker
   * as we want and we can export this customized use with our interface,
   * until we create our own color picker.
   *
   * All the props above is necessary to be an svelte-awesome-color-picker wrapper,
   * see more on: https://www.npmjs.com/package/svelte-awesome-color-picker#wrapper
   */
  export let wrapper;
  export let isOpen;
  export let isPopup;
  /* svelte-ignore unused-export-let */
  export let toRight;
</script>

<div
  class="wrapper"
  bind:this={wrapper}
  class:isOpen
  class:isPopup
  role={isPopup ? "dialog" : undefined}
  aria-label="color picker"
>
  <slot />
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
</style>
