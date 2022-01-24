<script lang="ts">

  import Input from "./Input.svelte"
  export let labelSlot: String;

</script>

<Input { ...$$restProps }>
  { labelSlot }
</Input>
