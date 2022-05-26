<script lang="ts">
  import Select from "./Select.svelte";

  export let multiple = false;
  export let options = [];
  export let selected = [];
  export let limit = null;

</script>

<Select
  name="my-select-name"
  label="my-select-label"
  { multiple }
  { options }
  bind:selected
  { limit }
/>

<br><br><hr><p>
  The rows bellow don't belong to Select component, is just for doc.
  The select component is a wrapper for slim-select.js
</p><hr><br>

<p>
  Selected: { selected }
</p>
