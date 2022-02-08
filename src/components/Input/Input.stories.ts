import type { ArgType } from "@storybook/addons";
import Input from "./Input.svelte";
import InputWrapper from "./InputWrapperForTest.svelte";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    inputStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
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
  errorMsg: "Falhou, tente novamente",
  type: "email",
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
