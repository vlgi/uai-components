import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import CleaveInput from "./CleaveInput.svelte";
import CleaveInputWrapper from "./CleaveInputWrapper.svelte";
import {
  phoneMaskConfig,
  cpfMaskConfig,
  cepMaskConfig,
  currencyMaskConfig,
} from "./fixtures";

export default {
  title: "Components/FormFields/CleaveInput",
  component: CleaveInput,
  argTypes: {
    cleaveOptions: { table: { category: "Masking" } },
    inputStyle: {
      table: { category: "Inherited from Input" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    border: {
      table: { category: "Inherited from Input" },
      control: {
        type: "select",
        options: ["bottom", "outline"],
      },
    },
    iconPosition: {
      table: { category: "Inherited from Input" },
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    icon: { table: { category: "Inherited from Input" } },

    errorMsg: { table: { category: "Inherited from Input" } },
    validationFn: { table: { category: "Inherited from Input" } },
    forceInvalid: { table: { category: "Inherited from Input" } },
    isValid: { table: { category: "Inherited from Input" } },
    required: { table: { category: "Inherited from Input" } },

    helperText: { table: { category: "Inherited from Input" } },
    value: { table: { category: "Inherited from Input" } },
    label: { table: { category: "Inherited from Input" } },
    type: { table: { category: "Inherited from Input" } },
    inputmode: {
      table: { category: "Inherited from Input" },
      control: {
        type: "select",
        options: ["text", "search", "none", "tel", "url", "email", "numeric", "decimal"],
      },
    },
    name: { table: { category: "Inherited from Input" } },
    disabled: { table: { category: "Inherited from Input" } },
    readonly: { table: { category: "Inherited from Input" } },
    inputElement: { table: { category: "Inherited from Input" } },
    inputAttributes: { table: { category: "Inherited from Input" } },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: CleaveInputWrapper,
    props,
    on: {
      input: action("on:input"),
      change: action("on:change"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "Nome",
  name: "name",
  helperText: "Digite seu primeiro nome",
  errorMsg: "Falhou, tente novamente",
  type: "text",
});

export const Phone = Template({
  label: "Telefone",
  name: "phone",
  helperText: "Digite um telefone válido",
  errorMsg: "Falhou, tente novamente",
  type: "text",
  cleaveOptions: phoneMaskConfig,
});

export const Cpf = Template({
  label: "CPF",
  name: "cpf",
  helperText: "Digite um CPF válido",
  errorMsg: "Falhou, tente novamente",
  type: "text",
  cleaveOptions: cpfMaskConfig,
});

export const Cep = Template({
  label: "CEP",
  name: "cep",
  helperText: "Digite um CEP válido",
  errorMsg: "Falhou, tente novamente",
  type: "text",
  cleaveOptions: cepMaskConfig,
});

export const Currency = Template({
  label: "Saldo",
  name: "balance",
  helperText: "Digite um valor válido",
  errorMsg: "Falhou, tente novamente",
  type: "text",
  cleaveOptions: currencyMaskConfig,
});

export const Required = Template({
  label: "Saldo",
  name: "balance",
  helperText: "Digite um valor válido",
  errorMsg: "Falhou, tente novamente",
  type: "text",
  cleaveOptions: currencyMaskConfig,
  required: true,
  value: "1000",
});
