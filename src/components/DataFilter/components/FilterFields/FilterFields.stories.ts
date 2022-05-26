import type { ArgType } from "@storybook/addons";
import FilterFields from "./FilterFields.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/FilterFields",
  component: FilterFields,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: FilterFields,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
