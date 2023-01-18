import type { ArgType } from "@storybook/addons";
import EmojiPicker from "./EmojiPicker.svelte";
import EmojiPickerWrapper from "./EmojiPickerWrapperExample.svelte";
import EmojiPickerWithModal from "./EmojiPickerWithModalExample.svelte";
import EmojiPickerWithDropdown from "./EmojiPickerWithDropdownExample.svelte";

export default {
  title: "Components/EmojiPicker",
  component: EmojiPicker,
  argTypes: {},
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: EmojiPickerWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  opened: true,
  maxRecently: 45,
  style:
    "--szot-emojis-picker-background-color: white;"
    + "\n--szot-emojis-picker-border-radius: 25px;"
    + "\n--szot-emojis-picker-height: 315px;"
    + "\n--szot-emojis-picker-width: 315px;"
    + "\n--szot-emojis-picker-category-title-border-color: #ddd;"
    + "\n--szot-emojis-picker-category-title-font-color: #444;"
    + "\n--szot-emojis-picker-tabs-border-color: #eee;"
    + "\n--szot-emojis-picker-tabs-icon-color: #777;",
});

const TemplateWithModal = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: EmojiPickerWithModal,
    props,
  });
  ret.args = _args;
  return ret;
};

export const WithModal = TemplateWithModal({
  opened: true,
  maxRecently: 45,
  style:
    "--szot-emojis-picker-background-color: white;"
    + "\n--szot-emojis-picker-border-radius: 0;"
    + "\n--szot-emojis-picker-box-shadow: auto;"
    + "\n--szot-emojis-picker-height: 400px;"
    + "\n--szot-emojis-picker-width: 320px;"
    + "\n--szot-emojis-picker-category-title-border-color: #ddd;"
    + "\n--szot-emojis-picker-category-title-font-color: #444;"
    + "\n--szot-emojis-picker-tabs-border-color: #eee;"
    + "\n--szot-emojis-picker-tabs-icon-color: #777;",
});

const TemplateWithDropdown = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: EmojiPickerWithDropdown,
    props,
  });
  ret.args = _args;
  return ret;
};

export const WithDropdown = TemplateWithDropdown({
  opened: true,
  maxRecently: 45,
  style:
    "--szot-emojis-picker-background-color: #FFFCF5;"
    + "\n--szot-emojis-picker-border-radius: 0;"
    + "\n--szot-emojis-picker-box-shadow: auto;"
    + "\n--szot-emojis-picker-height: 400px;"
    + "\n--szot-emojis-picker-width: 320px;"
    + "\n--szot-emojis-picker-category-title-border-color: #ddd;"
    + "\n--szot-emojis-picker-category-title-font-color: #444;"
    + "\n--szot-emojis-picker-tabs-border-color: #eee;"
    + "\n--szot-emojis-picker-tabs-icon-color: #777;",
});
