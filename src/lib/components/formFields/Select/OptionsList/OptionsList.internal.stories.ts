import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import { longDesserts } from "../fixtures";

import OptionsList from "./OptionsList.svelte";
import OptionsListExample from "./OptionsListWrapper.svelte";

const meta = {
  title: "Components/form fields/Select/Components/OptionsList",
  component: OptionsList,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<OptionsList>;

export default meta;

type Template = TemplateObj<typeof meta, OptionsListExample>;
type Story = StoryObj<typeof meta, OptionsListExample>;

const options = longDesserts;

const template = {
  render: (args) => ({
    Component: OptionsListExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    selected: null,
    ...template.args,
  },
};

export const SingleSelected: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    selected: options[3],
    ...template.args,
  },
};

export const Focused: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    focused: 3,
    selected: null,
    ...template.args,
  },
};

export const FocusedSelected: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    selected: options[2],
    focused: 3,
    ...template.args,
  },
};

export const Multiple: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    selected: [],
    ...template.args,
  },
};
export const MultipleSelected: Story = {
  ...template,
  args: {
    id: "doce-listbox",
    labelledBy: "doce-label",
    options,
    selected: [...options.slice(2, 5), options[0]],
    ...template.args,
  },
};
