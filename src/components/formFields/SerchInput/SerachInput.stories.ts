import type { ArgType } from "@storybook/addons";
import SerachInput from "./SerachInput.svelte";

export default {
  title: "Components/FormFields/SerachInput",
  component: SerachInput,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SerachInput,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
