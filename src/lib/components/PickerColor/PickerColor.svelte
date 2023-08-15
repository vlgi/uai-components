<script lang="ts">
  import ColorPicker from "svelte-awesome-color-picker";
  import PickerColorAux from "./PickerColorAux.svelte";

  // sets the selected color
  export let hex = "#FFFFFF";

  /**
   * identifies the selected color and says whether it is light or dark (readonly)
   */
  export let isDark = false;

  /**
   * Lib usage:
   *  isTextInput: defines if the default text-input of the lib will be displayed
   *  isOpen: defines whether the color picker is open (visible)
   *  isInput:  defines if the default input of the lib will be displayed
   *  disableCloseClickOutside: defines whether the color picker will be closed
   *    when clicking outside it
   *  components: This allows you to override some selector internals.
   *    Here, override the background of the selector so that we can customize
   *    it and make it more flexible to use.
   */
</script>

<div class="container">
  <ColorPicker
    bind:hex
    bind:isDark
    isTextInput={false}
    isOpen={true}
    isInput={false}
    disableCloseClickOutside
    components={{ wrapper: PickerColorAux }}
  />
</div>

<style lang="scss">
  .container {
    background-color: var(--szot-picker-background, transparent);
    --picker-height: var(--szot-picker-height, 14rem);
    --picker-width: var(--szot-picker-width, 20rem);
    --slider-width: var(--szot-picker-slider-height, 0.75rem);
  }
</style>
