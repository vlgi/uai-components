import type { ArgType } from "@storybook/addons";
import Dropdown from "./Dropdown.svelte";
import DropdownTest from "./DropdownTest.svelte";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    dropdownAlignment: {
      control: {
        type: "select",
        options: [
          "leftTop",
          "leftBottom",
          "rightTop",
          "rightBottom",
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
        ],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DropdownTest,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  triggerId: "Default",
  dropdownAlignment: "bottomRight",
  triggerPosition: { top: 0, left: 0 },
});

export const RightAlignment = Template({
  triggerId: "RightAlignment",
  dropdownAlignment: "rightTop",
  triggerPosition: { top: 0, left: 0 },
});

export const LeftAlignmentWithAutoAdjust = Template({
  triggerId: "LeftAlignmentWithAutoAdjust",
  dropdownAlignment: "leftTop",
  triggerPosition: { top: 0, left: 0 },
});

export const RightAlignmentWithAutoAdjust = Template({
  triggerId: "RightAlignmentWithAutoAdjust",
  dropdownAlignment: "rightTop",
  triggerPosition: { top: 0, left: 250 },
});

export const BottomAlignmentWithAutoAdjust = Template({
  triggerId: "RightAlignmentWithAutoAdjust",
  dropdownAlignment: "rightTop",
  triggerPosition: { top: 290, left: 0 },
});

export const largeScroll = Template({
  triggerId: "RightAlignmentWithAutoAdjust",
  dropdownAlignment: "rightTop",
  triggerPosition: { top: 290, left: 290 },
  scrollSize: { x: 600, y: 600 },
});
