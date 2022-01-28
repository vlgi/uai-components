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
        options: ["None", "Outline", "Custom"],
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
  style: "",
  size: "medium",
  labelSlot: "Botão 1",
  buttonStyle: "Secondary",
});

export const LargeSimple = Template({
  size: "large",
  labelSlot: "Minhas contas",
});

export const LargeIcon = Template({
  size: "large",
  icon: "upload",
  labelSlot: "Enviar documentos",
  positionIcon: "right",
});

export const mediumSimple = Template({
  size: "medium",
  labelSlot: "Botão 1",
});

export const mediumIcon = Template({
  size: "medium",
  icon: "file",
  labelSlot: "Documento",
  positionIcon: "right",
});

export const smallSimple = Template({
  size: "small",
  labelSlot: "Buscar",
});

export const smallIcon = Template({
  size: "small",
  icon: "search",
  labelSlot: "Buscar",
});

export const Disabled = Template({
  size: "large",
  buttonStyle: "Disabled",
  labelSlot: "Bloquear",
});

export const NotBackground = Template({
  size: "large",
  notbackground: "false",
  labelSlot: "Bloquear",
  buttonStyle: "Custom",
  border: "None",
});

export const NotBackgroundDisabled = Template({
  size: "large",
  Disabled: "true",
  notbackground: "false",
  buttonStyle: "Disabled",
  labelSlot: "Bloquear",
});

export const withBorders = Template({
  border: "Outline",
  size: "medium",
  labelSlot: "Bloquear",
  notbackground: "false",
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
  notbackground: "false",
});

export const FloatingDisabled = Template({
  size: "floating",
  icon: "more",
  buttonStyle: "Disabled",
});
