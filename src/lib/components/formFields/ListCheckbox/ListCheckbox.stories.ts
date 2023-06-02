import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import ListCheckboxExample from "./ListCheckboxExample.svelte";
import ListCheckbox from "./ListCheckbox.svelte";

const meta = {
  title: "Components/FormFields/ListCheckbox",
  component: ListCheckbox,
  argTypes: {
    styleType: {
      control: "select",
      options: ["checkbox-input", "switch", "badge-pill"],
    },
    iconPosition: {
      control: "select",
      options: ["left", "right", "both", "none"],
    },
    badgeStyle: {
      control: "select",
      options: ["light", "dark", "primary", "secondary"],
    },
    direction: {
      control: "select",
      options: ["column", "row"],
    },
  },
} satisfies Meta<ListCheckbox>;

export default meta;

type Template = TemplateObj<typeof meta, ListCheckboxExample>;
type Story = StoryObj<typeof meta, ListCheckboxExample>;

const template = {
  render: (args) => ({
    Component: ListCheckboxExample,
    props: args,
  }),
  args: {},
} satisfies Template;

const checkboxItems = [
  {
    value: "firstItem",
    label: "Item 1",
  },
  {
    value: "secondItem",
    label: "Item 2",
  },
  {
    value: "thirdItem",
    label: "Item 3",
  },
];

const checkboxItemsBadgePill = [
  {
    value: "firstItem",
    label: "Item",
  },
  {
    value: "secondItem",
    label: "Item dois",
  },
  {
    value: "thirdItem",
    label: "O terceiro item",
  },
  {
    value: "fourthItem",
    label: "Item 4",
  },
  {
    value: "fifthItem",
    label: "Item -------------5-------------",
  },
  {
    value: "sixthItem",
    label: "6",
  },
];

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "checklist",
    title: "Lista de Afazeres",
    checkboxItems,
  },
};

export const DefaultChecked: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "checklist",
    title: "Lista de Afazeres",
    checkboxItems,
    values: ["firstItem", "thirdItem"],
  },
};

export const ForceInvalid: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "checklist",
    title: "Lista de Afazeres",
    checkboxItems,
    forceInvalid: true,
    errorMsg: "Mensagem de erro",
  },
};

export const Badge: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "checklist",
    title: "Lista de Afazeres",
    styleType: "badge-pill",
    checkboxItems: checkboxItemsBadgePill,
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "checklist",
    title: "Lista de Afazeres",
    checkboxItems,
    style:
      "--szot-checkbox-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-checkbox-label-color: " +
      "linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
  },
};
