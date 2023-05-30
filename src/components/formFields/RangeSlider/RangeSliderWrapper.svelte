<script lang="ts">
  import RangeSlider from "./RangeSlider.svelte";

  export let style = "";

  export let value = 0;
</script>

<div class="wrapper" {style}>
  <RangeSlider name="range" bind:value {...$$restProps} on:input/>

  <p>value: {value}</p>
</div>
