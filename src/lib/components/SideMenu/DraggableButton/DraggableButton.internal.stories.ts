import type { Meta, StoryObj } from "@storybook/svelte";
import DraggableButton from "./DraggableButton.svelte";

const meta = {
  title: "Components/SideMenu/Components/DraggableButton",
  component: DraggableButton,
  // common stuff for all stories here
} satisfies Meta<DraggableButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
