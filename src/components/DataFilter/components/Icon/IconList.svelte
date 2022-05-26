<script lang="ts">
  import { IIcons } from "./IIcons";
  import Icon from "./Icon.svelte";
</script>

{#each Object.values(IIcons) as iconName}
  <Icon { iconName } />
  <span>icon-{ iconName }</span>
  <br>
{/each}

<style lang="scss">
</style>
