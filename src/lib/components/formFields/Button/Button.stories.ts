import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Button from "./Button.svelte";
import ButtonWrapper from "./ButtonWrapperForTest.svelte";

export default {
  title: "Components/FormFields/Button",
  component: Button,
  argTypes: {
    onClick: { action: "on:click" },
    buttonStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large", "round"],
      },
    },
    buttonStyleType: {
      control: {
        type: "select",
        options: ["filled", "outline", "not-filled"],
      },
    },
    positionIcon: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    type: {
      control: {
        type: "select",
        options: ["submit", "reset", "button"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ButtonWrapper,
    props,
    on: {
      click: action("on:click"),
    },
  });
  ret.args = _args;
  return ret;
};

export const ThemeTest = Template({
  style: "",
  size: "medium",
  labelSlot: "Botão 1",
  buttonStyle: "secondary",
});

export const LargeSimple = Template({
  size: "large",
  labelSlot: "Minhas contas",
});

export const LargeIcon = Template({
  size: "large",
  icon: "mdi:upload",
  labelSlot: "Enviar documentos",
  positionIcon: "right",
  style: "--szot-button-max-width: 20rem",
});

export const mediumSimple = Template({
  size: "medium",
  labelSlot: "Botão 1",
});

export const mediumIcon = Template({
  size: "medium",
  icon: "mdi:file",
  labelSlot: "Documento",
  positionIcon: "right",
});

export const smallSimple = Template({
  size: "small",
  labelSlot: "Buscar",
});

export const smallIcon = Template({
  size: "small",
  icon: "mdi:magnify",
  labelSlot: "Buscar",
});

export const Disabled = Template({
  size: "large",
  disabled: "true",
  labelSlot: "Bloquear",
});

export const NotBackground = Template({
  size: "large",
  labelSlot: "Bloquear",
  buttonStyleType: "not-filled",
});

export const NotBackgroundDisabled = Template({
  size: "large",
  buttonStyleType: "not-filled",
  disabled: "true",
  labelSlot: "Bloquear",
});

export const withBorders = Template({
  buttonStyleType: "outline",
  size: "medium",
  labelSlot: "Bloquear",
});

export const withBordersDisabled = Template({
  buttonStyleType: "outline",
  size: "medium",
  labelSlot: "Bloquear",
  disabled: "true",
});

export const Round = Template({
  style: "",
  size: "round",
  icon: "mdi:dots-horizontal",
});

export const RoundNotBackground = Template({
  size: "round",
  icon: "mdi:dots-horizontal",
  buttonStyleType: "not-filled",
});

export const RoundDisabled = Template({
  size: "round",
  icon: "mdi:dots-horizontal",
  disabled: "true",
});

export const CustomExample: any = Template({
  labelSlot: "orange",
  icon: "ic:outline-remove-red-eye",
  style:
      "--szot-button-color: #333;"
      + "--szot-button-background-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
      + "--szot-button-border-radius: 1.5rem;"
      + "--szot-button-width: 100%;"
      + "--szot-button-max-width: 100%;"
      + "--szot-button-icon-color: red;"
      + "--szot-button-white-space: normal;"
      + "--szot-button-box-shadow: inset -0.5px -1px 1px rgba(0, 0, 0, 0.13), inset 0.5px 1px 1px rgba(255, 255, 255, 0.02);",
});

CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
  <script lang="ts">
    import Button from "./Button.svelte";
  </script>

  <div style="--szot-button-color:#ffc7a7;
      --szot-button-background-color:#FC6627;
      --szot-button-buttonStyleType: 2px solid #ffc7a7;
      --szot-button-icon-color: red;
      --szot-button-border-radius: 1.5rem" >
    <Button
      icon="ic:outline-remove-red-eye"
    >
      orange
    </Button>
  </div>
  `,
    },
  },
};