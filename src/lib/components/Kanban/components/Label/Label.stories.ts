import type { Meta, StoryObj } from "@storybook/svelte";
import Label from "./Label.svelte";

const meta = {
  title: "Components/Kanban/Label",
  component: Label,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelData: {
      text: "minha label",
    },
  },
};

export const CustomColor: Story = {
  args: {
    labelData: {
      text: "minha label",
      textColor: "#FFFFFF",
      backgroundColor: "#ffa500",
    },
  },
};

export const ShowButtons: Story = {
  args: {
    labelData: {
      text: "minha label",
      textColor: "#000000",
      backgroundColor: "#ffa500",
    },
    showButtons: true,
  },
};

export const Collapsed: Story = {
  args: {
    labelData: {
      text: "minha label",
      textColor: "#000000",
      backgroundColor: "#ffa500",
    },
    isOpened: false,
  },
};
