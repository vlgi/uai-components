import type { Meta, StoryObj } from "@storybook/svelte";
import ActionKeyboardControls from "./ActionKeyboardControlsDemo.svelte";
import ActionKeyboardControlsCode from "./ActionKeyboardControlsDemo.svelte?raw";

const meta = {
  title: "Components/form fields/Select/Actions/ActionKeyboardControls",
  component: ActionKeyboardControls,
  // common stuff for all stories here
} satisfies Meta<ActionKeyboardControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: ActionKeyboardControlsCode,
      },
    },
  },
};
