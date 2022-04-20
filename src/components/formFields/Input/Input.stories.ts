import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Input from "./Input.svelte";
import InputWrapper from "./InputWrapperForTest.svelte";

export default {
  title: "Components/FormFields/Input",
  component: Input,
  argTypes: {
    onInput: { action: "on:input" },
    onChange: { action: "on:change" },
    inputStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    border: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["bottom", "outline"],
      },
    },
    iconPosition: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["left", "right"],
      },
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
    name: { table: { category: "other properties" } },
    disabled: { table: { category: "other properties" } },
    readonly: { table: { category: "other properties" } },
    inputElement: { table: { category: "other properties" } },
    inputAttributes: { table: { category: "other properties" } },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: InputWrapper,
    props,
    on: {
      input: action("on:input"),
      change: action("on:change"),
    },
  });
  ret.args = _args;
  return ret;
};

const validTest = (value: string): undefined|string|boolean => {
  if (value === "erro") {
    return "Aqui está o erro.";
  }
  return true;
};

export const Default = Template({
  label: "Email",
  style: "",
  helperText: "Digite um email válido",
  errorMsg: "Falhou, tente novamente",
  type: "email",
});

export const Required = Template({
  label: "Name",
  type: "text",
  required: true,
});

export const CustomValidationAndRequired = Template({
  label: "Name",
  type: "text",
  required: true,
  validationFn: validTest,
  helperText: "Digite 'erro' para ser invalido",
});

export const ForceInvalid = Template({
  label: "Name",
  type: "text",
  forceInvalid: true,
  errorMsg: "Mensagem de erro customizada",
});

export const BordersNone = Template({
  label: "Senha",
  type: "password",
  border: "bottom",
});

export const WhithIcon = Template({
  label: "Celular 1",
  type: "tel",
  border: "bottom",
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

export const CustomExample: any = Template({
  validationFn: validTest,
  label: "Teste",
  helperText: "Digite 'erro' para ser invalido",
  type: "name",
  style: "--szot-input-height: 1.5rem;"
          + "--szot-input-background-color: #ffffff;"
          + "--szot-input-label-color: #c56d09;"
          + "--szot-input-color: #db984b;"
          + "--szot-input-focus-color: #ce4007;"
          + "--szot-input-border-color-focus: #ce4007;"
          + "--szot-input-border-color: #c56d09;"
          + "--szot-input-border-radius: 1.5rem;",
});
CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <script lang="ts">
      import Input from "./Input.svelte";

      const validTest = (value) => {
        if (value === "erro") {
          return "Aqui está o erro.";
        }
        return true;
      };
    </script>

    <div style="--szot-input-height: 1.5rem;
      --szot-input-background-color: #ffffff;--szot-input-label-color: #c56d09;
      --szot-input-color: #db984b;--szot-input-focus-color: #ce4007;
      --szot-input-border-color-focus: #ce4007;--szot-input-border-color: #c56d09;
      --szot-input-border-radius: 1.5rem;" >
      <Input 
        label="Teste" 
        type="name" 
        validationFn={validTest} 
        helperText="Digite 'erro' para ser invalido"/>
    </div>
    `,
    },
  },
};
