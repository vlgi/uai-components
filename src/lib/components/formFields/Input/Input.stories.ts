import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Input from "./Input.svelte";
import InputExample from "./InputExample.svelte";

const meta = {
  title: "Components/FormFields/Input",
  component: Input,
  tags: ["autodocs"], // enable auto docs
  argTypes: {
    inputStyle: {
      table: { category: "visual properties" },
      control: "select",
      options: ["primary", "secondary", "dark", "light"],
    },
    border: {
      table: { category: "visual properties" },
      control: "select",
      options: ["bottom", "outline"],
    },
    iconPosition: {
      table: { category: "visual properties" },
      control: "select",
      options: ["left", "right"],
    },
    icon: { table: { category: "visual properties" } },

    errorMsg: { table: { category: "validation properties" } },
    validationFn: { table: { category: "validation properties" } },
    forceInvalid: { table: { category: "validation properties" } },
    isValid: { table: { category: "validation properties" } },
    required: { table: { category: "validation properties" } },

    helperText: { table: { category: "other properties" } },
    value: { table: { category: "other properties" } },
    label: { table: { category: "other properties" } },
    type: { table: { category: "other properties" } },
    inputmode: {
      table: { category: "other properties" },
      control: "select",
      options: ["text", "search", "none", "tel", "url", "email", "numeric", "decimal"],
    },
    name: { table: { category: "other properties" } },
    disabled: { table: { category: "other properties" } },
    readonly: { table: { category: "other properties" } },
    inputElement: { table: { category: "other properties" } },
    inputAttributes: { table: { category: "other properties" } },
  },
} satisfies Meta<Input>;

export default meta;

type Template = TemplateObj<typeof meta, InputExample>;
type Story = StoryObj<typeof meta, InputExample>;

const template = {
  render: (args) => ({
    Component: InputExample,
    props: args,
  }),
  args: {},
} satisfies Template;

const validTest = (value: string): undefined | string | boolean => {
  if (value === "erro") {
    return "Aqui está o erro.";
  }
  return true;
};

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Email",
    helperText: "Digite um email válido",
    errorMsg: "Falhou, tente novamente",
    type: "email",
    name: "email",
  },
};

export const Required: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Name",
    type: "text",
    required: true,
    name: "name",
  },
};

export const Disabled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Name",
    type: "text",
    disabled: true,
    name: "name",
  },
};

export const CustomValidationAndRequired: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Name",
    type: "text",
    required: true,
    validationFn: validTest,
    helperText: "Digite 'erro' para ser invalido",
    name: "name",
  },
};

export const ForceInvalid: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Name",
    type: "text",
    forceInvalid: true,
    errorMsg: "Mensagem de erro customizada",
    name: "name",
  },
};

export const BordersNone: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Senha",
    type: "password",
    border: "bottom",
    name: "senha",
  },
};

export const WithIcon: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Celular 1",
    type: "tel",
    border: "bottom",
    icon: "material-symbols:phone-enabled",
    name: "phone",
  },
};

export const WithIconLeft: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Celular 2",
    icon: "material-symbols:phone-enabled",
    iconPosition: "left",
    type: "tel",
    name: "phone",
  },
};

export const WithPlaceholder: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Endereço",
    type: "text",
    name: "address",
    placeholder: "Rua 300 Lote 900 AP 46 Algum Lugar Por Ai / DF",
  },
};

export const EnableIconClick: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Celular 2",
    icon: "material-symbols:phone-enabled",
    iconPosition: "left",
    type: "tel",
    name: "phone",
    iconClick: true,
  },
};

export const Readonly: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Aviso",
    type: "text",
    icon: "material-symbols:info-outline-rounded",
    value: "Não escreva aqui",
    readonly: true,
    helperText: "Apenas um exemplo",
    name: "warning",
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    validationFn: validTest,
    label: "Teste",
    helperText: "Digite 'erro' para ser invalido",
    type: "name",
    icon: "phone",
    name: "custom",
    style:
      "--szot-input-height: 1.5rem;" +
      "--szot-input-background-color: #ffffff;" +
      "--szot-input-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-input-label-focus-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-input-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-input-border-radius: 1.5rem;" +
      "--szot-input-border: 10px;" +
      "--szot-input-icon-margin-right: 3rem;" +
      "--szot-input-border-color-focus: purple;" +
      "--szot-input-border-color-filled: yellow;",
  },
};
