<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Collapsable from "./Collapsable.svelte";

  // Force this example extend the base component interface, so we can use the
  // spreed of restProps, instead of declare again all component interface manually.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface $$Props extends ComponentProps<Collapsable> {
    style?: string;
  }

  // Used to force $$restProps be of type ComponentProps<Collapsable>;
  $: restProps = $$restProps as ComponentProps<Collapsable>;

  export let style = "";
</script>

<div
  class="wrapper"
  {style}
>
  <Collapsable {...restProps}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae
    accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam
    distinctio nihil tempore!
  </Collapsable>
</div>
