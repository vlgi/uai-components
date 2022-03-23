import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import RadioButton from "./RadioButton.svelte";

export default {
  title: "Components/FormFields/RadioButton",
  component: RadioButton,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: RadioButton,
    props,
    on: {
      submit: action("submit"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  id: "radioId",
});

export const DefaultChecked = Template({
  checked: true,
  id: "radioId",
});

export const Filled = Template({
  filled: true,
  id: "radioId",
});

export const Labeled = Template({
  id: "radioId",
  label: "Item",
});
