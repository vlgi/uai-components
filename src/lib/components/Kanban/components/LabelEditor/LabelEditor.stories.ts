import type { Meta, StoryObj } from "@storybook/svelte";
import LabelEditor from "./LabelEditor.svelte";

const meta = {
  title: "Components/Kanban/LabelEditor",
  component: LabelEditor,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<LabelEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    opened: true,
    labelData: {
      text: "my label",
      backgroundColor: "#ffa500",
      textColor: "#000000",
    },
  },
};
