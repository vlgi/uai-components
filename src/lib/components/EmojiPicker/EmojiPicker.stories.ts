import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import EmojiPicker from "./EmojiPicker.svelte";
import EmojiPickerWrapper from "./EmojiPickerWrapperExample.svelte";
import EmojiPickerWithModalExample from "./EmojiPickerWithModalExample.svelte";
import EmojiPickerWithDropdownExample from "./EmojiPickerWithDropdownExample.svelte";

const meta = {
  title: "Components/EmojiPicker",
  component: EmojiPicker,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<EmojiPicker>;

export default meta;

type Template = TemplateObj<typeof meta, EmojiPickerWrapper>;
type Story = StoryObj<typeof meta, EmojiPickerWrapper>;

const template = {
  render: (args) => ({
    Component: EmojiPickerWrapper,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    opened: true,
    maxRecently: 45,
    style:
      "--szot-emojis-picker-background-color: white;" +
      "\n--szot-emojis-picker-border-radius: 25px;" +
      "\n--szot-emojis-picker-height: 315px;" +
      "\n--szot-emojis-picker-width: 315px;" +
      "\n--szot-emojis-picker-category-title-border-color: #ddd;" +
      "\n--szot-emojis-picker-category-title-font-color: #444;" +
      "\n--szot-emojis-picker-tabs-border-color: #eee;" +
      "\n--szot-emojis-picker-tabs-icon-color: #777;",
    ...template.args,
  },
};

const templateWithModal = {
  render: (args) => ({
    Component: EmojiPickerWithModalExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const WithModal: Story = {
  ...templateWithModal,
  args: {
    opened: true,
    maxRecently: 45,
    style:
      "--szot-emojis-picker-background-color: white;" +
      "\n--szot-emojis-picker-border-radius: 0;" +
      "\n--szot-emojis-picker-box-shadow: auto;" +
      "\n--szot-emojis-picker-height: 400px;" +
      "\n--szot-emojis-picker-width: 320px;" +
      "\n--szot-emojis-picker-category-title-border-color: #ddd;" +
      "\n--szot-emojis-picker-category-title-font-color: #444;" +
      "\n--szot-emojis-picker-tabs-border-color: #eee;" +
      "\n--szot-emojis-picker-tabs-icon-color: #777;",
    ...templateWithModal.args,
  },
};

const templateWithDropdown = {
  render: (args) => ({
    Component: EmojiPickerWithDropdownExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const WithDropdown: Story = {
  ...templateWithDropdown,
  args: {
    opened: true,
    maxRecently: 45,
    style:
      "--szot-emojis-picker-background-color: #FFFCF5;" +
      "\n--szot-emojis-picker-border-radius: 0;" +
      "\n--szot-emojis-picker-box-shadow: auto;" +
      "\n--szot-emojis-picker-height: 400px;" +
      "\n--szot-emojis-picker-width: 320px;" +
      "\n--szot-emojis-picker-category-title-border-color: #ddd;" +
      "\n--szot-emojis-picker-category-title-font-color: #444;" +
      "\n--szot-emojis-picker-tabs-border-color: #eee;" +
      "\n--szot-emojis-picker-tabs-icon-color: #777;",
  },
};
