import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Badge from "./Badge.svelte";
import BadgeWrapper from "./BadgeWrapperForTest.svelte";

export default {
  title: "Components/Badge",
  component: Badge,
  argtypes: {
  },
};

const Template = (_args: ArgType) => {
  const ret = ({...props}) => ({
    Component: BadgeWrapper,
    props: props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  style: "default",
  labelSlot: "Badge",
});
export const Border = Template({
  style: "border",
  labelSlot: "Badge",
});
export const Color = Template({
  style: "orange",
  color: "custom",
  labelSlot: "Badge",
});
export const Disabled = Template({
  disabled: "true",
  labelSlot: "Badge",
});

export const ThemeTest = Template({
  style: "theme-test",
  labelSlot: "Badge",
  color: "Dark",
});
