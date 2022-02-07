import type { ArgType } from "@storybook/addons";
import Button from "./Button.svelte";
import ButtonWrapper from "./ButtonWrapperForTest.svelte";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    buttonStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light", "custom", "disabled"],
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
    type: {
      control: {
        type: "select",
        options: ["submit", "reset", "button"],
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
  buttonStyle: "secondary",
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
  icon: "magnify",
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
  buttonStyle: "custom",
  border: "none",
});

export const NotBackgroundDisabled = Template({
  size: "large",
  Disabled: "true",
  notbackground: "false",
  buttonStyle: "disabled",
  labelSlot: "Bloquear",
});

export const withBorders = Template({
  border: "outline",
  size: "medium",
  labelSlot: "Bloquear",
  notbackground: "false",
});

export const withBordersDisabled = Template({
  border: "outline",
  size: "medium",
  labelSlot: "Bloquear",
  buttonStyle: "disabled",
});

export const Floating = Template({
  style: "",
  floating: true,
  icon: "more",
});

export const FloatingNotBackground = Template({
  floating: true,
  icon: "more",
  notbackground: "false",
});

export const FloatingDisabled = Template({
  floating: true,
  icon: "more",
  buttonStyle: "disabled",
});
