import type { ArgType } from "@storybook/addons";
import Input from "./Input.svelte";
import InputWrapper from "./InputWrapperForTest.svelte";
import { IIcons } from "../Icon/IIcons";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    inputStyle: {
      control: {
        type: "select",
        options: ["Primary", "Secondary", "Dark", "Light", "Custom"],
      },
    },
    icon: {
      control: {
        type: "select",
        options: Object.values(IIcons),
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    border: {
      control: {
        type: "select",
        options: ["Bottom", "Outline"],
      },
    },
    pattern: {
      control: {
        type: "string",
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: InputWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  labelSlot: "Email",
  style: "",
  helperText: "Digite um email válido",
  validation: true,
  type: "email",
});

export const BordersNone = Template({
  labelSlot: "Senha",
  type: "password",
  border: "Bottom",
  validation: false,
});

export const WhithIcon = Template({
  labelSlot: "Celular 1",
  type: "tel",
  border: "Bottom",
  icon: "phone",
  validation: false,
});

export const WhithIconLeft = Template({
  labelSlot: "Celular 2",
  icon: "phone",
  iconPosition: "left",
  type: "tel",
  validation: false,
});

export const Readonly = Template({
  labelSlot: "Aviso",
  type: "text",
  icon: "info",
  value: "Não escreva aqui",
  readonly: true,
  helperText: "Apenas um exemplo",
});

export const CustomColor = Template({
  labelSlot: "Fruta",
  type: "name",
  inputStyle: "Custom",
  validation: false,
  style: "--szot-background-color: #ffffff;--szot-label-color: #c56d09;--szot-input-color: #db984b;--szot-input-focus-color: #ce4007;--szot-border-color-focus: #ce4007;--szot-border-color: #c56d09;",
});
