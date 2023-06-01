import type { Meta } from "@storybook/svelte";
import type { StoryObj } from "$types/storybook";

import EmojiPicker from "./EmojiPicker.svelte";
import EmojiPickerDefaultExample from "./EmojiPickerDefaultExample.svelte";
import EmojiPickerWithModalExample from "./EmojiPickerWithModalExample.svelte";
import EmojiPickerWithDropdownExample from "./EmojiPickerWithDropdownExample.svelte";

const meta = {
  title: "Components/EmojiPicker",
  component: EmojiPicker,
  // common stuff for all stories here
} satisfies Meta<EmojiPicker>;

export default meta;

export const Default: StoryObj<typeof meta, EmojiPickerDefaultExample> = {
  render: (args) => ({
    Component: EmojiPickerDefaultExample,
    props: args,
  }),
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
  },
  parameters: {
    controls: {
      // This example only export this controls
      include: ["style", "opened", "maxRecently"],
    },
  },
};

export const WithModal: StoryObj<typeof meta, EmojiPickerWithModalExample> = {
  render: (args) => ({
    Component: EmojiPickerWithModalExample,
    props: args,
  }),
  args: {
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
  },
  parameters: {
    controls: {
      // This example only export this controls
      include: ["style", "maxRecently"],
    },
  },
};

export const WithDropdown: StoryObj<typeof meta, EmojiPickerWithModalExample> = {
  render: (args) => ({
    Component: EmojiPickerWithDropdownExample,
    props: args,
  }),
  args: {
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
  parameters: {
    controls: {
      // This example only export this controls
      include: ["style", "maxRecently"],
    },
  },
};
