import type { Meta, StoryObj } from "@storybook/svelte";
import ClickOutside from "./ClickOutside.svelte";
import ClickOutsideExampleCode from "./ClickOutside.svelte?raw";

const meta = {
  title: "Internal Documentation/Actions/ClickOutside",
  component: ClickOutside,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "This action was copied from svelte tutorial: https://svelte.dev/tutorial/actions",
      },
    },
  },
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
