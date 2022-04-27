import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Textarea from "./Textarea.svelte";
import TextareaWrapper from "./TextareaWrapperForTest.svelte";

export default {
  title: "Components/FormFields/Textarea",
  component: Textarea,
  argTypes: {
    textareaStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    errorMsg: { table: { category: "validation properties" } },
    validationFn: { table: { category: "validation properties" } },
    isValid: { table: { category: "validation properties" } },
    required: { table: { category: "validation properties" } },
    forceInvalid: { table: { category: "validation properties" } },

    resizable: { table: { category: "other properties" } },
    helperText: { table: { category: "other properties" } },
    value: { table: { category: "other properties" } },
    label: { table: { category: "other properties" } },
    type: { table: { category: "other properties" } },
    name: { table: { category: "other properties" } },
    rows: { table: { category: "other properties" } },
    maxRows: { table: { category: "other properties" } },
    disabled: { table: { category: "other properties" } },
    readonly: { table: { category: "other properties" } },
    textareaElement: { table: { category: "other properties" } },
    textareaAttributes: { table: { category: "other properties" } },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: TextareaWrapper,
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
  label: "Conte sua história",
  placeholder: "Digite algo:",
  textareaStyle: "secondary",
  style: "",
  helperText: "Digite o quanto você quiser",
});

export const Required = Template({
  label: "Conte sua história",
  placeholder: "Digite algo:",
  textareaStyle: "secondary",
  style: "",
  required: true,
});

export const Readonly = Template({
  label: "Conte sua história",
  placeholder: "Você não pode editar o que está aqui",
  textareaStyle: "secondary",
  style: "",
  readonly: true,
});

export const Resizable = Template({
  label: "Conte sua história",
  placeholder: "Digite algo:",
  textareaStyle: "secondary",
  resizable: true,
});

const validTest = (value: string): undefined | string | boolean => {
  if (value === "erro") {
    return "Aqui está o erro.";
  }
  return true;
};

export const CustomExample: any = Template({
  validationFn: validTest,
  label: "Teste",
  helperText: "Digite 'erro' para ser invalido",
  type: "text",
  placeholder: "Digite algo:",
  rows: 3,
  style: "--szot-textarea-background-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-textarea-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-textarea-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-textarea-placeholder-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
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

    <div
      style="--szot-textarea-border-radius: 1rem;
      --szot-textarea-max-height: 5rem;--szot-textarea-background-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
      --szot-textarea-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      --szot-textarea-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      --szot-textarea-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      --szot-textarea-placeholder-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
    >
      <Textarea validationFn: validTest,
        label="Teste"
        placeholder="Aqui o tamanho é estático, então haverá scroll"
        helperText="Digite 'erro' para ser invalido"
        type="text"
        rows=4
        maxRows=4
      />
    </div>
    `,
    },
  },
};
