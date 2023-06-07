import type { Meta, StoryObj } from "@storybook/svelte";
import WatchSize from "./WatchSize.svelte";

/**
 * This action creates an event triggered by the resize of the element this is used on.
 */
const meta = {
  title: "Internal Documentation/Actions/WatchSize",
  component: WatchSize,
  tags: ["autodocs"],
} satisfies Meta<WatchSize>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
