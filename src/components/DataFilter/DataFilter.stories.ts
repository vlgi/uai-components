import type { ArgType } from "@storybook/addons";
import DataFilter from "./DataFilter.svelte";

export default {
  title: "Components/DataFilter",
  component: DataFilter,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DataFilter,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
