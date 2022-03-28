import type { ArgType } from "@storybook/addons";
import Checkbox from "./Checkbox.svelte";

export default {
  title: "Components/FormFields/Checkbox",
  component: Checkbox,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Checkbox,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});

export const DefaultChecked = Template({
  checked: true,
});

export const Filled = Template({
  checkboxStyleType: "filled",
});

export const Labeled = Template({
  label: "Item",
});
