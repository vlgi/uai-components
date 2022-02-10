import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Textarea from "./Textarea.svelte";
import TextareaWrapper from "./TextareaWrapperForTest.svelte";

export default {
  title: "Components/Textarea",
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

    helperText: { table: { category: "other properties" } },
    value: { table: { category: "other properties" } },
    label: { table: { category: "other properties" } },
    type: { table: { category: "other properties" } },
    name: { table: { category: "other properties" } },
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
  style: "--szot-resize: both",
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
  value: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos maxime accusamus laborum fuga ratione veritatis aliquam totam nam illo harum veniam minima vero atque iusto exercitationem repellendus, commodi mollitia sapiente!",
  helperText: "Digite 'erro' para ser invalido",
  type: "text",
  rows: 4,
  maxRows: 4,
  style: "--szot-border-radius: 1rem; --szot-max-height: 5rem;--szot-background-color: #ffffff;--szot-label-color: #c56d09;--szot-textarea-color: #db984b;--szot-border-color: #c56d09;--szot-placeholder-color:#db984b;",
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

    <div style="--szot-border-radius: 1rem;
      --szot-max-height: 5rem;--szot-background-color: #ffffff;
      --szot-label-color: #c56d09;--szot-textarea-color: #db984b;
      --szot-border-color: #c56d09;--szot-placeholder-color:#db984b;"
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
