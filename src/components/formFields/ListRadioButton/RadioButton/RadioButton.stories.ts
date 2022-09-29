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

export const LargeLabeled = Template({
  label: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  name: "labeled",
  value: "labeled",
  group: "",
});
