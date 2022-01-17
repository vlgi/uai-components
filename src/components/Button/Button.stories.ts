import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Button from "./Button.svelte";
import ButtonWrapperForTestSlot from "./ButtonWrapperForTestSlot.svelte";

export default {
  title: "Internal/Button",
  component: Button,
  argTypes: {
    onClick: { action: "onClick" },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    backgroundColor: { control: "color" },
  },
  parameters: {
    // skip all screen test for button stories
    creevey: {
      skip: true,
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    // note that export default use Button componente, because this file describe button stories
    // this ButtonWrapperForTestSlot is only for wrap slots
    Component: ButtonWrapperForTestSlot,
    props,
    on: {
      click: action("onClick"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Primary = Template({
  primary: true,
  labelSlot: "Button",
});

export const Secondary = Template({
  labelSlot: "Button",
});

export const Large = Template({
  size: "large",
  labelSlot: "Button",
});

export const Small = Template({
  size: "small",
  labelSlot: "Button",
});

export const Inaccessible = Template({
  primary: true,
  backgroundColor: "white",
  labelSlot: "Button",
});
