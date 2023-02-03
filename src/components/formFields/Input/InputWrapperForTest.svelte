<script lang="ts">
  import Input from "./Input.svelte";

  export let style: string;
</script>

<div {style}>
  <Input {...$$restProps} on:input on:change on:click name="nad" />
</div>
