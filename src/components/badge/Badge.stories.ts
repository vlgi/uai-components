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

export const Default = Template({
  style: "",
  labelSlot: "Badge",
  border: "Outiline",
  badgeStyle: "Primary",
});

export const BorderNone = Template({
  border: "None",
  labelSlot: "Badge",
});

export const Custom = Template({
  //  Teste,
  style: "--color:#FFFFFF; --background:#FC6627;",
  badgeStyle: "Custom",
  labelSlot: "Badge",
});

export const ThemeTest = Template({
  style: "--szot-dark: #202020; --szot-dark-txt: #ececec;",
  labelSlot: "Badge",
  badgeStyle: "Dark",
});
