import type { Meta, StoryObj } from "@storybook/svelte";
import ActionInfiniteScroll from "./ActionInfiniteScrollDemo.svelte";
import ActionInfiniteScrollCode from "./ActionInfiniteScrollDemo.svelte?raw";

const meta = {
  title: "Components/form fields/Select/Actions/infiniteScroll",
  component: ActionInfiniteScroll,
  // common stuff for all stories here
} satisfies Meta<ActionInfiniteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    distFromBottom: 10,
  },
  parameters: {
    docs: {
      source: {
        code: ActionInfiniteScrollCode,
      },
    },
  },
};
