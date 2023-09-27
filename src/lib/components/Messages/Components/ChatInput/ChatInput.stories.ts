import type { Meta, StoryObj } from "@storybook/svelte";
import ChatInput from "./ChatInput.svelte";

const meta = {
  title: "Components/ChatInput",
  component: ChatInput,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputStyle: Story = {
  args: {
    name: "szot-chat-textarea",
    placeholder: "Digite alguma coisa...",
  },
};

export const Textarea: Story = {
  args: {
    name: "szot-chat-textarea",
    inputStyle: "textarea",
    placeholder: "Digite alguma coisa...",
  },
};

export const blockChangeStyle: Story = {
  args: {
    name: "szot-chat-textarea",
    inputStyle: "textarea",
    placeholder: "Digite alguma coisa...",
    alowChangeStyle: false,
  },
};

export const hideEmojiPicker: Story = {
  args: {
    name: "szot-chat-textarea",
    inputStyle: "textarea",
    placeholder: "Digite alguma coisa...",
    showEmojiPicker: false,
  },
};
