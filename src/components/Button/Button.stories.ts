import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Button from "./Button.svelte";
import ButtonWrapper from "./ButtonWrapperForTest.svelte";

export default {
  title: "Components/Button",
  component: Button,
  argtypes: {
  },
};

const Template = (_args: ArgType) => {
  const ret = ({...props}) => ({
    Component: ButtonWrapper,
    props: props,
  });
  ret.args = _args;
  return ret;
};

export const LargeSimple = Template({
  style: "default",
  size: "large",
  labelSlot: "Bloquear",
});

export const LargeIcon = Template({
  style: "default",
  size: "large",
  icon: "lock",
  labelSlot: "Bloquear",
});

export const mediumSimple = Template({
  style: "default",
  size: "medium",
  labelSlot: "Botão 1",
});

export const mediumIcon = Template({
  style: "default",
  size: "medium",
  icon: "file",
  labelSlot: "Documento",
});

export const smallSimple = Template({
  style: "default",
  size: "small",
  labelSlot: "Buscar",
});

export const smallIcon = Template({
  style: "default",
  size: "small",
  icon: "search",
  labelSlot: "Buscar",
});

export const Disabled = Template({
  style: "default",
  size: "large",
  disabled: "true",
  labelSlot: "Bloquear",
});

export const NotBackground = Template({
  style: "default",
  size: "large",
  background: "none",
  labelSlot: "Bloquear",
});

export const NotBackgroundDisabled = Template({
  style: "default",
  size: "large",
  disabled: "true",
  background: "none",
  labelSlot: "Bloquear",
});

export const withBorders = Template({
  style: "borders",
  size: "medium",
  background: "none",
  labelSlot: "Bloquear",
});

export const withBordersDisabled = Template({
  style: "borders",
  size: "medium",
  disabled: "true",
  background: "none",
  labelSlot: "Bloquear",
});

export const Floating = Template({
  style: "white",
  size: "floating",
  icon: "more",
});

export const FloatingNotBackground = Template({
  style: "default",
  size: "floating",
  background: "none",
  icon: "more",
});

export const FloatingDisabled = Template({
  style: "default",
  size: "floating",
  icon: "more",
  disabled: "true",
});
