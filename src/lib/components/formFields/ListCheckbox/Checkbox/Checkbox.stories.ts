import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Checkbox from "./Checkbox.svelte";
import CheckboxExample from "./CheckboxExample.svelte";

const meta = {
  title: "Components/FormFields/Checkbox",
  component: Checkbox,
  tags: ["autodocs"], // enable auto docs
  argTypes: {
    styleType: {
      control: "select",
      options: ["checkbox-input", "switch", "text-switch", "badge-pill"],
    },
    iconPosition: {
      control: "select",
      options: ["left", "right", "both", "none"],
    },
    badgeStyle: {
      control: "select",
      options: ["light", "dark", "primary", "secondary"],
    },
  },
} satisfies Meta<Checkbox>;

export default meta;

type Template = TemplateObj<typeof meta, CheckboxExample>;
type Story = StoryObj<typeof meta, CheckboxExample>;

const template = {
  render: (args) => ({
    Component: CheckboxExample,
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
  },
};

export const DefaultChecked: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "default-checked",
    checked: true,
  },
};

export const Switch: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "switch",
    styleType: "switch",
  },
};

export const SwitchChecked: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "switch-checked",
    checked: true,
    styleType: "switch",
  },
};

export const TextSwitch: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "text-switch",
    styleType: "text-switch",
    checkedText: "Ativo",
    uncheckedText: "Inativo",
  },
};

export const TextSwitchChecked: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "text-switch",
    styleType: "text-switch",
    checked: true,
    checkedText: "Ativo",
    uncheckedText: "Inativo",
  },
};

export const Labeled: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "labeled",
    label: "Item",
  },
};

export const BadgePill: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "badge-pill",
    styleType: "badge-pill",
    label: "label",
    iconPosition: "both",
  },
};

export const CustomBadgePillExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "badge-pill",
    styleType: "badge-pill",
    badgeStyle: "primary",
    label: "label",
    iconPosition: "both",
    style:
      "--szot-checkbox-badge-pill-background: #678;" +
      "--szot-checkbox-badge-pill-icon-color: purple;" +
      "--szot-checkbox-badge-pill-label-color: purple;" +
      "--szot-checkbox-badge-pill-border-color: purple;" +
      "--szot-checkbox-badge-pill-selected-icon-color: purple;" +
      "--szot-checkbox-badge-pill-selected-label-color: white;" +
      "--szot-checkbox-badge-pill-selected-border-color: purple;" +
      "--szot-checkbox-badge-pill-height: 3rem;",
  },
};

export const CustomSwitchExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "custom-switch",
    styleType: "switch",
    style:
      "--szot-checkbox-switch-color: black;" +
      "--szot-checkbox-switch-checked-color: linear-gradient(to bottom, grey, brown);" +
      "--szot-checkbox-switch-width: 3rem;" +
      "--szot-checkbox-switch-height: 1.32rem;" +
      "--szot-checkbox-switch-background: lightblue;",
  },
};

export const CustomTextSwitchExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "custom-text-switch",
    styleType: "text-switch",
    checkedText: "Ativo",
    uncheckedText: "Inativo",
    style:
      "--szot-checkbox-switch-color: black;" +
      "--szot-checkbox-switch-checked-color: linear-gradient(to bottom, grey, brown);" +
      "--szot-checkbox-switch-width: 5rem;" +
      "--szot-checkbox-switch-height: 1.32rem;" +
      "--szot-checkbox-switch-background: lightblue;",
  },
};
