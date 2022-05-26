import type { ArgType } from "@storybook/addons";
import SortFields from "./SortFields.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/SortFields",
  component: SortFields,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SortFields,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
