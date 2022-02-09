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
        options: ["bottom", "outline"],
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
  style: "--szot-label-font-size: 10px;--szot-height: 1.5rem;--szot-background-color: #ffffff;--szot-label-color: #c56d09;--szot-input-color: #db984b;--szot-input-focus-color: #ce4007;--szot-border-color-focus: #ce4007;--szot-border-color: #c56d09;--szot-border-radius: 1.5rem;",
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

    <div style="--szot-label-font-size: 10px;--szot-height: 1.5rem;
      --szot-background-color: #ffffff;--szot-label-color: #c56d09;
      --szot-input-color: #db984b;--szot-input-focus-color: #ce4007;
      --szot-border-color-focus: #ce4007;--szot-border-color: #c56d09;
      --szot-border-radius: 1.5rem;" >
      <Input label="Teste" type="name" validationFn={validTest} helperText="Digite 'erro' para ser invalido"/>
    </div>
    `,
    },
  },
};
