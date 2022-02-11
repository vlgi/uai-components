<script lang="ts">
  import DatePicker from "./DatePicker.svelte";

  export let style: string;
</script>

<div {style}>
  <DatePicker
    {...$$restProps}
  />
</div>
