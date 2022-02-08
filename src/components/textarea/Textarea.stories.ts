import type { ArgType } from "@storybook/addons";
import Textarea from "./Textarea.svelte";
import TextareaWrapper from "./TextareaWrapperForTest.svelte";

export default {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    textareaStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    wrap: {
      control: {
        type: "select",
        options: ["hard", "soft", "off"],
      },
    },
    autocomplete: {
      control: {
        type: "select",
        options: ["on", "off"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: TextareaWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "Conte sua história",
  placeholder: "Digite algo:",
  textareaStyle: "secondary",
  style: "",
  helperText: "Digite o quanto você quiser",
});
