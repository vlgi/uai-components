import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import FileSelector from "./FileSelector.svelte";
import FileSelectorExample from "./FileSelectorExample.svelte";

const meta = {
  title: "Components/form fields/FileSelector",
  component: FileSelector,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<FileSelector>;

export default meta;

type Template = TemplateObj<typeof meta, FileSelectorExample>;
type Story = StoryObj<typeof meta, FileSelectorExample>;

const template = {
  render: (args) => ({
    Component: FileSelectorExample,
    props: args,
  }),
  args: {
    buttonLabel: "Selecionar da galeria",
    name: "form-input",
    acceptedFileTypes: ".pdf, image/*",
    // common stuff for template stories here
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
  },
};

export const OutlineFileSelector: Story = {
  ...template,
  args: {
    // args for this specific story here
    buttonStyle: "primary",
    buttonStyleType: "outline",
    ...template.args,
  },
};

export const FilledFileSelector: Story = {
  ...template,
  args: {
    // args for this specific story here
    buttonStyle: "primary",
    buttonStyleType: "filled",
    ...template.args,
  },
};

export const OnlyPDF: Story = {
  ...template,
  args: {
    acceptedFileTypes: ".pdf",
    ...template.args,
  },
};
