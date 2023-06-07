import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import TextArea from "./Textarea.svelte";
import TextAreaExample from "./TextareaExample.svelte";

const meta = {
  title: "Components/form fields/TextArea",
  component: TextArea,
  tags: ["autodocs"], // enable auto docs
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
    name: { table: { category: "other properties" } },
    rows: { table: { category: "other properties" } },
    maxRows: { table: { category: "other properties" } },
    disabled: { table: { category: "other properties" } },
    readonly: { table: { category: "other properties" } },
    textareaElement: { table: { category: "other properties" } },
    textareaAttributes: { table: { category: "other properties" } },
  },
  // common stuff for all stories here
} satisfies Meta<TextArea>;

export default meta;

type Template = TemplateObj<typeof meta, TextAreaExample>;
type Story = StoryObj<typeof meta, TextAreaExample>;

const template = {
  render: (args) => ({
    Component: TextAreaExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
    name: "text-input-form",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    label: "Conte sua história",
    placeholder: "Digite algo:",
    textareaStyle: "secondary",
    style: "",
    helperText: "Digite o quanto você quiser",
    ...template.args,
  },
};

export const Required: Story = {
  ...template,
  args: {
    label: "Conte sua história",
    placeholder: "Digite algo:",
    textareaStyle: "secondary",
    style: "",
    required: true,
    ...template.args,
  },
};

export const Readonly: Story = {
  ...template,
  args: {
    label: "Conte sua história",
    placeholder: "Você não pode editar o que está aqui",
    textareaStyle: "secondary",
    style: "",
    readonly: true,
    ...template.args,
  },
};

export const Resizable: Story = {
  ...template,
  args: {
    label: "Conte sua história",
    placeholder: "Digite algo:",
    textareaStyle: "secondary",
    style: "",
    resizable: true,
    ...template.args,
  },
};

const validTest = (value: string): undefined | string | boolean => {
  if (value === "erro") {
    return "Aqui está o erro.";
  }
  return true;
};

export const CustomExample: Story = {
  ...template,
  args: {
    validationFn: validTest,
    label: "Teste",
    helperText: "Digite 'erro' para ser invalido",
    placeholder: "Digite algo:",
    rows: 3,
    style:
      "--szot-textarea-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-textarea-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-textarea-placeholder-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-textarea-border: 10px;" +
      "--szot-textarea-border-color-filled: red;" +
      "--szot-textarea-border-color-focus: green;",
    ...template.args,
  },
  parameters: {
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
  },
};
