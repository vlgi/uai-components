import type { ArgType } from "@storybook/addons";
import RadioButton from "./RadioButton.svelte";

export default {
  title: "Components/FormFields/RadioButton",
  component: RadioButton,
  argTypes: {
    radioStyleType: {
      control: {
        type: "select",
        options: ["filled", "notFilled"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: RadioButton,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "default",
  value: "default",
  group: "",
});

export const Filled = Template({
  radioStyleType: "filled",
  name: "filled",
  value: "filled",
  group: "filled",
});

export const Labeled = Template({
  label: "Item",
  name: "labeled",
  value: "labeled",
  group: "labeled",
});
