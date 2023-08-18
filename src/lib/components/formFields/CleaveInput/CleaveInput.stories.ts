import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import CleaveInput from "./CleaveInput.svelte";
import CleaveInputExample from "./CleaveInputExample.svelte";
import { phoneMaskConfig, cpfMaskConfig, cepMaskConfig, currencyMaskConfig } from "./fixtures";

const meta = {
  title: "Components/form fields/CleaveInput",
  component: CleaveInput,
  tags: ["autodocs"], // enable auto docs
  argTypes: {
    cleaveOptions: { table: { category: "Masking" } },
    inputStyle: {
      table: { category: "Inherited from Input" },
      control: "select",
      options: ["primary", "secondary", "dark", "light"],
    },
    border: {
      table: { category: "Inherited from Input" },
      control: "select",
      options: ["bottom", "outline"],
    },
    iconPosition: {
      table: { category: "Inherited from Input" },
      control: "select",
      options: ["left", "right"],
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
      control: "select",
      options: ["text", "search", "none", "tel", "url", "email", "numeric", "decimal"],
    },
    name: { table: { category: "Inherited from Input" } },
    disabled: { table: { category: "Inherited from Input" } },
    readonly: { table: { category: "Inherited from Input" } },
    inputElement: { table: { category: "Inherited from Input" } },
    inputAttributes: { table: { category: "Inherited from Input" } },
  },
} satisfies Meta<CleaveInput>;

export default meta;

type Template = TemplateObj<typeof meta, CleaveInputExample>;
type Story = StoryObj<typeof meta, CleaveInputExample>;

const template = {
  render: (args) => ({
    Component: CleaveInputExample,
    props: args,
  }),
  args: {},
} satisfies Template;

export const Phone: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Telefone",
    name: "phone",
    helperText: "Digite um telefone válido",
    errorMsg: "Falhou, tente novamente",
    type: "text",
    cleaveOptions: phoneMaskConfig,
  },
};

export const Cpf: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "CPF",
    name: "cpf",
    helperText: "Digite um CPF válido",
    errorMsg: "Falhou, tente novamente",
    type: "text",
    cleaveOptions: cpfMaskConfig,
  },
};

export const Cep: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "CEP",
    name: "cep",
    helperText: "Digite um CEP válido",
    errorMsg: "Falhou, tente novamente",
    type: "text",
    cleaveOptions: cepMaskConfig,
  },
};

export const Currency: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Saldo",
    name: "balance",
    helperText: "Digite um valor válido",
    errorMsg: "Falhou, tente novamente",
    type: "text",
    cleaveOptions: currencyMaskConfig,
  },
};

export const Required: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Saldo",
    name: "balance",
    helperText: "Digite um valor válido",
    errorMsg: "Falhou, tente novamente",
    type: "text",
    cleaveOptions: currencyMaskConfig,
    required: true,
    value: "1000",
  },
};
