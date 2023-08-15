import type { Meta, StoryObj } from "@storybook/svelte";
import PickerColor from "./PickerColor.svelte";

const meta = {
  title: "Components/PickerColor",
  component: PickerColor,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<PickerColor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ColorSelect: Story = {
  args: {
    hex: "#ffa500",
  },
};
