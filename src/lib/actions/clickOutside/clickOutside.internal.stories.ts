import type { Meta, StoryObj } from "@storybook/svelte";
import ClickOutside from "./ClickOutside.svelte";
import ClickOutsideExampleCode from "./ClickOutside.svelte?raw";

/**
 * This action was copied from svelte tutorial: https://svelte.dev/tutorial/actions
 */
const meta = {
  title: "Internal Documentation/Actions/ClickOutside",
  component: ClickOutside,
  tags: ["autodocs"],
} satisfies Meta<ClickOutside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: ClickOutsideExampleCode,
      },
    },
  },
};
