import type { ArgType } from "@storybook/addons";
import ClickOutSide from "./ClickOutside.svelte";

export default {
  title: "Internal Documentation/Actions/ClickOutside",
  component: ClickOutSide,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ClickOutSide,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
