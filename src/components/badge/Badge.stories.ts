import type { ArgType } from "@storybook/addons";
import Badge from "./Badge.svelte";
import BadgeWrapper from "./BadgeWrapperForTest.svelte";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    badgeStyle: {
      control: {
        type: "select",
        options: ["Primary", "Secondary", "Dark", "Light", "Custom", "Outline"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BadgeWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Theme = Template({
  style: "",
  labelSlot: "Badge",
  badgeStyle: "Dark",
});

export const Border = Template({
  labelSlot: "Badge",
  badgeStyle: "Outline",
});
