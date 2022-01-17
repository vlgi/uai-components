import type { ArgType } from "@storybook/addons";
import Input from "./Input.svelte";

export default {
  title: "Ionic/Input",
  component: Input,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Input,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "My input",
  type: "text",
});
