<script lang="ts">
  export let iconName: string;
</script>

<span class="icon-{iconName}" on:click/>

<style lang="scss">
  
  @use 'src/styles/mixins' as m;
  span::before {
    @include m.text-color(var(--szot-icon-color, var(--theme-dark-txt)));
    font-size: var(--szot-icon-font-size, 1.25rem);
    line-height: var(--szot-icon-line-height, 1.4rem);
  }

</style>
