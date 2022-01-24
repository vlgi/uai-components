import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Input from "./InputWrapperForTest.svelte";

export default {
  title: "Components/Input",
  component: Input,
  argtypes: {
  },
};

const Template = (_args: ArgType) => {
  const ret = ({...props}) => ({
    Component: Input,
    props: props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  labelSlot: "Email",
  type: "email",
});

export const BordersNone = Template({
  labelSlot: "Senha",
  type: "password",
  border: "none",
});

export const WhithIcon = Template({
  labelSlot: "Celular 1",
  type: "text",
  border: "none",
  iconName: "phone",
  type: "tel",
});

export const WhithIconLeft = Template({
  labelSlot: "Celular 2",
  type: "text",
  iconName: "phone",
  iconPosition:"left",
  type: "tel",
});

export const Readonly = Template({
  labelSlot: "Aviso",
  type: "text",
  iconName: "info",
  value: "Não escreva aqui",
  readonly: true,
});
