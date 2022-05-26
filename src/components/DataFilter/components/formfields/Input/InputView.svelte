<script lang="ts">
  import Input from "./Input.svelte";

  export let value = "";
  export let mask: "number" | "money" | "percentage";

</script>

<Input
  name="my-input-name"
  label="my-input-label"
  { mask }
  bind:value
/>

<br><br><hr><p>
  The rows bellow don't belong to input component, is just for doc.
</p><hr><br>

<p>
  Value: { value }
</p>
<p>
</p>

<style lang="scss">

</style>
