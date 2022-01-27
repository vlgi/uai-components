import type { ArgType } from "@storybook/addons";
import Button from "./Button.svelte";
import ButtonWrapper from "./ButtonWrapperForTest.svelte";
import { IIcons } from "../Icon/IIcons";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    buttonStyle: {
      control: {
        type: "select",
        options: ["Primary", "Secondary", "Dark", "Light", "Custom", "Disabled"],
      },
    },
    icon: {
      control: {
        type: "select",
        options: Object.values(IIcons),
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    border: {
      control: {
        type: "select",
        options: ["None", "Outline"],
      },
    },
    background: {
      control: {
        type: "boolen",
      },
    },
    positionIcon: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ButtonWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const ThemeTest = Template({
  /** teste */
  style: "",
  size: "medium",
  labelSlot: "Botão 1",
  buttonStyle: "Secondary",
});

export const LargeSimple = Template({
  size: "large",
  labelSlot: "Minhas contas",
  style: "",
});

export const LargeIcon = Template({
  size: "large",
  icon: "upload",
  labelSlot: "Mandar para a china",
  style: "",
});

export const mediumSimple = Template({
  size: "medium",
  labelSlot: "Botão 1",
  style: "",
});

export const mediumIcon = Template({
  size: "medium",
  icon: "file",
  labelSlot: "Documento",
  style: "--icon-transform-translate: translate(5.5rem, 0.2rem)",
});

export const smallSimple = Template({
  size: "small",
  labelSlot: "Buscar",
  style: "",
});

export const smallIcon = Template({
  size: "small",
  icon: "search",
  labelSlot: "Buscar",
  style: "",
});

export const Disabled = Template({
  size: "large",
  buttonStyle: "Disabled",
  labelSlot: "Bloquear",
});

export const NotBackground = Template({
  size: "large",
  background: "false",
  labelSlot: "Bloquear",
  buttonStyle: "Custom",
  style: "--color: #333333;",
});

export const NotBackgroundDisabled = Template({
  size: "large",
  Disabled: "true",
  background: "false",
  buttonStyle: "Disabled",
  labelSlot: "Bloquear",
});

export const withBorders = Template({
  border: "Outline",
  size: "medium",
  labelSlot: "Bloquear",
  background: "false",
  buttonStyle: "custom",
  style: "--color: #333333;",
});

export const withBordersDisabled = Template({
  border: "Outline",
  size: "medium",
  labelSlot: "Bloquear",
  buttonStyle: "Disabled",
});

export const Floating = Template({
  style: "",
  size: "floating",
  icon: "more",
});

export const FloatingNotBackground = Template({
  size: "floating",
  icon: "more",
  background: "false",
  style: "--color: #333333;",
  buttonStyle: "custom",
});

export const FloatingDisabled = Template({
  size: "floating",
  icon: "more",
  buttonStyle: "Disabled",
});
