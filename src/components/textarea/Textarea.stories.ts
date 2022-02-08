import type { ArgType } from "@storybook/addons";
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
    wrap: {
      control: {
        type: "select",
        options: ["hard", "soft", "off"],
      },
    },
    autocomplete: {
      control: {
        type: "select",
        options: ["on", "off"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: TextareaWrapper,
    props,
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

const validteste = (value) => {
  if (value === "erro") {
    return "Aqui está o erro.";
  }
  return true;
};

export const CustomExample: any = Template({
  validationFn: validteste,
  label: "Teste",
  placeholder: "Aqui o tamanho é estático, então haverá scroll",
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

      const validteste = (value) => {
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
      <Textarea validationFn: validteste,
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
