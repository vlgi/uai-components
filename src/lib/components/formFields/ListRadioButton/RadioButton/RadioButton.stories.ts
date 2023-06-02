import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import RadioButton from "./RadioButton.svelte";
import RadioButtonExample from "./RadioButtonExample.svelte";

const meta = {
  title: "Components/FormFields/RadioButton",
  component: RadioButton,
  argTypes: {
    radioStyleType: {
      control: "select",
      options: ["filled", "notFilled", "badge-pill"],
    },
    iconPosition: {
      control: "select",
      options: ["left", "right", "both", "none"],
    },
    badgeStyle: {
      control: "select",
      options: ["dark", "light", "primary", "secondary"],
    },
  },
} satisfies Meta<RadioButton>;

export default meta;

type Template = TemplateObj<typeof meta, RadioButtonExample>;
type Story = StoryObj<typeof meta, RadioButtonExample>;

const template = {
  render: (args) => ({
    Component: RadioButtonExample,
    props: args,
  }),
  args: {},
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "default",
    value: "default",
    group: "",
  },
};

export const Filled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    radioStyleType: "filled",
    name: "filled",
    value: "filled",
    group: "filled",
  },
};

export const Labeled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Item",
    name: "labeled",
    value: "labeled",
    group: "labeled",
  },
};

export const Badge: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label: "Item",
    name: "labeled",
    value: "labeled",
    group: "",
    radioStyleType: "badge-pill",
  },
};

export const EnableUncheck: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "default",
    value: "default",
    group: "",
    enableUncheck: true,
  },
};

export const LargeLabeled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    label:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: "labeled",
    value: "labeled",
    group: "",
  },
};

export const CustomBadgePillExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "badge-pill",
    radioStyleType: "badge-pill",
    badgeStyle: "primary",
    label: "label",
    value: "labeled",
    group: "",
    iconPosition: "both",
    style:
      "--szot-radio-badge-pill-background: #678;" +
      "--szot-radio-badge-pill-icon-color: purple;" +
      "--szot-radio-badge-pill-label-color: purple;" +
      "--szot-radio-badge-pill-border-color: purple;" +
      "--szot-radio-badge-pill-selected-icon-color: purple;" +
      "--szot-radio-badge-pill-selected-label-color: white;" +
      "--szot-radio-badge-pill-selected-border-color: purple;" +
      "--szot-radio-badge-pill-height: 3rem;",
  },
};
