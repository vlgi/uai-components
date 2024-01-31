<script lang="ts">
  import Icon from "@iconify/svelte";

  /**
   * You can get the list of icon names in the [iconify page](https://icon-sets.iconify.design/)
   */
  export let iconName: string;
</script>

<div
  class="icon-container"
  on:click
  on:keypress
>
  <Icon icon={iconName} />
</div>

<style lang="scss">
  .icon-container {
    width: fit-content;
    height: fit-content;
    color: var(--uai-icon-color, var(--theme-dark-txt));
    font-size: var(--uai-icon-font-size, 1.25rem);
    line-height: 0;
  }
</style>
