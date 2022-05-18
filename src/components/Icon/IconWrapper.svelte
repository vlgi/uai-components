<script lang="ts">
  import Icon from "./Icon.svelte";

  export let iconName: string;
  export let style = "";
</script>

<div {style}>
  <Icon {iconName}/>
</div>
