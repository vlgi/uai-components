import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Button from "./Button.svelte";
import ButtonExample from "./ButtonExample.svelte";

const meta = {
  title: "Components/form fields/Button",
  component: Button,
  tags: ["autodocs"], // enable auto docs
  argTypes: {
    buttonStyle: {
      control: "select",
      options: ["primary", "secondary", "dark", "light"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "round"],
    },
    buttonStyleType: {
      control: "select",
      options: ["filled", "outline", "not-filled"],
    },
    positionIcon: {
      control: "select",
      options: ["left", "right"],
    },
    type: {
      control: "select",
      options: ["submit", "reset", "button"],
    },
  },
} satisfies Meta<Button>;

export default meta;

type Template = TemplateObj<typeof meta, ButtonExample>;
type Story = StoryObj<typeof meta, ButtonExample>;

const template = {
  render: (args) => ({
    Component: ButtonExample,
    props: args,
  }),
  args: {},
} satisfies Template;

export const ThemeTest: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "medium",
    labelSlot: "Botão 1",
    buttonStyle: "secondary",
  },
};

export const LargeSimple: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "large",
    labelSlot: "Minhas contas",
  },
};

export const LargeIcon: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "large",
    icon: "mdi:upload",
    labelSlot: "Enviar documentos",
    positionIcon: "right",
    style: "--szot-button-max-width: 20rem",
  },
};

export const MediumSimple: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "medium",
    labelSlot: "Botão 1",
  },
};

export const MediumIcon: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "medium",
    icon: "mdi:file",
    labelSlot: "Documento",
    positionIcon: "right",
  },
};

export const SmallSimple: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "small",
    labelSlot: "Buscar",
  },
};

export const SmallIcon: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "small",
    icon: "mdi:magnify",
    labelSlot: "Buscar",
  },
};

export const Disabled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "large",
    disabled: true,
    labelSlot: "Bloquear",
  },
};

export const NotBackground: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "large",
    labelSlot: "Bloquear",
    buttonStyleType: "not-filled",
  },
};

export const NotBackgroundDisabled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "large",
    buttonStyleType: "not-filled",
    disabled: true,
    labelSlot: "Bloquear",
  },
};

export const WithBorders: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    buttonStyleType: "outline",
    size: "medium",
    labelSlot: "Bloquear",
  },
};

export const WithBordersDisabled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    buttonStyleType: "outline",
    size: "medium",
    labelSlot: "Bloquear",
    disabled: true,
  },
};

export const Round: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    style: "",
    size: "round",
    icon: "mdi:dots-horizontal",
  },
};

export const RoundNotBackground: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "round",
    icon: "mdi:dots-horizontal",
    buttonStyleType: "not-filled",
  },
};

export const RoundDisabled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    size: "round",
    icon: "mdi:dots-horizontal",
    disabled: true,
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    labelSlot: "orange",
    icon: "ic:outline-remove-red-eye",
    style:
      "--szot-button-color: #333;" +
      "--szot-button-background-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-button-border-radius: 1.5rem;" +
      "--szot-button-width: 100%;" +
      "--szot-button-max-width: 100%;" +
      "--szot-button-icon-color: red;" +
      "--szot-button-white-space: normal;" +
      "--szot-button-box-shadow: inset -0.5px -1px 1px rgba(0, 0, 0, 0.13), inset 0.5px 1px 1px rgba(255, 255, 255, 0.02);",
  },
};
