<script lang="ts">
    /**
     * For test purpose, using ts and ms, storybook user wrappers or view.
     * like this:
     *  - https://github.com/storybookjs/storybook/blob/main/examples/svelte-kitchen-sink/src/stories/views/ButtonView.svelte
     */
    import Button from "./Button.svelte";

    export let labelSlot: string;
    export let style: string;

</script>


<div class={style}>
<Button { ...$$restProps } on:click>
    { labelSlot }
</Button>
</div>

<style lang="scss">
  .borders{
    --border: 2px solid #333333;
  }

  .white{
    --background-color: #FFFFFF;
    --color: #333333;
    --hover-color:#333333;
    --hover-background:#c2bdbd83;
    --effect-color-after-click: #f3efef;
  }
</style>


