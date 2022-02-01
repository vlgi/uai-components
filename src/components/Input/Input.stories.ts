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
  label: "Email",
  style: "",
  helperText: "Digite um email válido",
  type: "email",
  errorMsg: "Falhou, tente novamente",
  required: true,
});

export const BordersNone = Template({
  label: "Senha",
  type: "password",
  border: "Bottom",
});

export const WhithIcon = Template({
  label: "Celular 1",
  type: "tel",
  border: "Bottom",
  icon: "phone",
});

export const WhithIconLeft = Template({
  label: "Celular 2",
  icon: "phone",
  iconPosition: "left",
  type: "tel",
});

export const Readonly = Template({
  label: "Aviso",
  type: "text",
  icon: "info",
  value: "Não escreva aqui",
  readonly: true,
  helperText: "Apenas um exemplo",
});

export const CustomColor = Template({
  label: "Fruta",
  type: "name",
  inputStyle: "Custom",
  style: "--szot-background-color: #ffffff;--szot-label-color: #c56d09;--szot-input-color: #db984b;--szot-input-focus-color: #ce4007;--szot-border-color-focus: #ce4007;--szot-border-color: #c56d09;",
});
