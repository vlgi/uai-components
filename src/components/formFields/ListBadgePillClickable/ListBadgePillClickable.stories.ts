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
    checked: false,
    label: "Item 1",
  },
  {
    value: "secondItem",
    checked: false,
    label: "Item 2",
  },
  {
    value: "thirdItem",
    checked: false,
    label: "Item 3",
  },
];

export const Default = Template({
  checkboxItems,
});
