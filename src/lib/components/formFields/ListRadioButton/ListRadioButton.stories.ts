import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import ListRadioButton from "./ListRadioButton.svelte";
import ListRadioButtonExample from "./ListRadioButtonExample.svelte";

const meta = {
  title: "Components/form fields/ListRadioButton",
  component: ListRadioButton,
  tags: ["autodocs"], // enable auto docs
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
    direction: {
      control: "select",
      options: ["column", "row"],
    },
  },
} satisfies Meta<ListRadioButton>;

export default meta;

type Template = TemplateObj<typeof meta, ListRadioButtonExample>;
type Story = StoryObj<typeof meta, ListRadioButtonExample>;

const template = {
  render: (args) => ({
    Component: ListRadioButtonExample,
    props: args,
  }),
  args: {},
} satisfies Template;

const radioOptions = [
  {
    value: "firstOption",
    label: "Opção 1",
  },
  {
    value: "secondOption",
    label: "Opção 2",
  },
  {
    value: "thirdOption",
    label: "Opção 3",
  },
];

const radioOptions2 = [
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
    name: "defaultOptionList",
    listName: "Escolha uma opção",
    radioOptions,
  },
};

export const DefaultChecked: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "defaultCheckedOptionList",
    listName: "Escolha uma opção",
    radioOptions,
    value: "thirdOption",
  },
};

export const FilledRadios: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "filledRadiosOptionList",
    listName: "Escolha uma opção",
    radioOptions,
    radioStyleType: "filled",
  },
};

export const Badge: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "badgeOptionList",
    listName: "Escolha uma opção",
    radioOptions: radioOptions2,
    radioStyleType: "badge-pill",
    direction: "row",
    iconPosition: "left",
    badgeStyle: "primary",
  },
};

export const EnableUncheck: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "defaultOptionList",
    listName: "Escolha uma opção",
    radioOptions,
    enableUncheck: true,
  },
};

export const ForceInvalid: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "forceInvalidOptionList",
    listName: "Escolha uma opção",
    radioOptions,
    forceInvalid: true,
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "customExampleOptionList",
    listName: "Escolha uma opção",
    radioOptions,
    radioStyleType: "notFilled",
    style:
      "--szot-radio-margin: 3px 2px 0px;" +
      "--szot-radio-size:18px;" +
      "--szot-radio-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-radio-checked-color:  linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);" +
      "--szot-radio-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
  },
};
