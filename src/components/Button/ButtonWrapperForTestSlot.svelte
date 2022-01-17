<script lang="ts">
    /**
     * For test purpose, using ts and ms, storybook user wrappers or view.
     * like this:
     *  - https://github.com/storybookjs/storybook/blob/main/examples/svelte-kitchen-sink/src/stories/views/ButtonView.svelte
     */
    import Button from "./Button.svelte";
    
    export let labelSlot: string;
</script>

<Button { ...$$restProps } on:click>
    { labelSlot }
</Button>