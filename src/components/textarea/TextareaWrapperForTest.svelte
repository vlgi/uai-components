<script lang="ts">
  import Textarea from "./Textarea.svelte";

  export let style: string;
</script>

<div {style}>
  <Textarea {...$$restProps} />
</div>
