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
        options: ["Primary", "Secondary", "Dark", "Light", "Custom"],
      },
    },
    border: {
      control: {
        type: "select",
        options: ["Outiline", "None"],
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

export const ThemeTest = Template({
  style: "",
  labelSlot: "Badge",
  badgeStyle: "Dark",
});

export const Default = Template({
  labelSlot: "Badge",
  badgeStyle: "Light",
});

export const Border = Template({
  border: "Outiline",
  labelSlot: "Badge",
  badgeStyle: "Dark",
});

export const Custom = Template({
  //  Teste,
  style: "--color:#FFFFFF; --background:#FC6627;",
  badgeStyle: "Custom",
  labelSlot: "Badge",
});
