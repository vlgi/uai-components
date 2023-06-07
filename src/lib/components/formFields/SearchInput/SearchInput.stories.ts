import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import { complexDesserts } from "./fixtures";

import SearchInput from "./SearchInput.svelte";
import SearchInputExample from "./SearchInputExample.svelte";

const meta = {
  title: "Components/form fields/SearchInput",
  component: SearchInput,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<SearchInput>;

export default meta;

type Template = TemplateObj<typeof meta, SearchInputExample>;
type Story = StoryObj<typeof meta, SearchInputExample>;

const template = {
  render: (args) => ({
    Component: SearchInputExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
    name: "search",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    items: complexDesserts,
    searchable: ["variety", "flavor"],
    searchQuery: "",
    ...template.args,
  },
};

export const Searching: Story = {
  ...template,
  args: {
    items: complexDesserts,
    searchable: ["variety"],
    searchQuery: "brownie",
    icon: "mdi:magnify",
    ...template.args,
  },
};

export const MultipleFieldsSearching: Story = {
  ...template,
  args: {
    items: complexDesserts,
    searchable: ["variety", "topping", "flavor"],
    searchQuery: "brownie chocolate",
    ...template.args,
  },
};
