import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon.svelte";
import IconList from "./IconList.svelte";

export default {
  title: "Internal/Icon",
  component: Icon,
  argTypes: {
    onClick: { action: "onClick" },
  },
  parameters: {
    // skip all screen test for this stories
    creevey: {
      skip: true,
    },
    storyshots: false,
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Icon,
    props,
    on: {
      click: action("onClick"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  iconName: "phone",
});

export const List = (): unknown => ({
  Component: IconList,
});
