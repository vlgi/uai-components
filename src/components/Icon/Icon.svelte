<script lang="ts">
  export let iconName: string;
</script>

<span class="icon-{iconName}" on:click/>

<style lang="scss">

  span::before {
    color: var(--szot-icon-color, var(--theme-dark-txt));
    font-size: var(--szot-icon-font-size, var(--theme-font-size));
    line-height: var(--szot-icon-line-height, 1rem);
  }

</style>
