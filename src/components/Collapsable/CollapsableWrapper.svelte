<script lang="ts">
  import Collapsable from "./Collapsable.svelte";

  export let style: string;
  export let title: string;
</script>

<div class="wrapper" {style}>
  <Collapsable {title} {...$$restProps}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
  </Collapsable>
</div>

<style lang="scss">
</style>
