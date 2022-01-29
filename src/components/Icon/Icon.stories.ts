import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon.svelte";
import IconList from "./IconList.svelte";
import { IIcons } from "./IIcons";

export default {
  title: "Internal/Icon",
  component: Icon,
  argTypes: {
    onClick: { action: "onClick" },
    iconName: {
      control: {
        type: "select",
        options: Object.values(IIcons),
      },
    },
  },
  parameters: {
    // skip all screen test for this stories
    creevey: {
      skip: true,
    },
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
  iconName: IIcons.phone,
});

export const List = (): unknown => ({
  Component: IconList,
});

// disabled storyshots for the list
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
List.parameters = {
  ...List.parameters,
  storyshots: false,
};
