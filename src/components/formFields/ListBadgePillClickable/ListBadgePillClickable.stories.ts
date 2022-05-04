import type { ArgType } from "@storybook/addons";
import ListBadgePillClickable from "./ListBadgePillClickable.svelte";

export default {
  title: "Components/FormFields/ListBadgePillClickable",
  component: ListBadgePillClickable,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListBadgePillClickable,
    props,
  });
  ret.args = _args;
  return ret;
};

const checkboxItems = [
  {
    value: "firstItem",
    label: "Item 1",
  },
  {
    value: "secondItem",
    label: "Item 2",
  },
  {
    value: "thirdItem",
    label: "Item 3",
  },
];

export const Default = Template({
  checkboxItems,
});
