import type { ArgType } from "@storybook/addons";
import Textarea from "./TextareaWrapperForTest.svelte";

export default {
  title: "Components/Textarea",
  component: Textarea,
  argtypes: {
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Textarea,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "Conte sua história",
  placeholder: "Digite algo:",
  style: "",
});

export const LimitedSize = Template({
  label: "Conte sua história em 5 linhas",
  placeholder: "Digite algo:",
  maxRows: "5",
});
