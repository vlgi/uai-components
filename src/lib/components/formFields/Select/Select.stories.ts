import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import { longDesserts, simpleDesserts } from "./fixtures";

import Select from "./Select.svelte";
import SelectExample from "./SelectExample.svelte";

const meta = {
  title: "Components/form fields/Select",
  component: Select,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
  argTypes: {
    selectStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    selectBorder: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["bottom", "outline"],
      },
    },
    badgeStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
  },
} satisfies Meta<Select>;

export default meta;

type Template = TemplateObj<typeof meta, SelectExample>;
type Story = StoryObj<typeof meta, SelectExample>;

const template = {
  render: (args) => ({
    Component: SelectExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

const options = simpleDesserts;

export const Single: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    selected: null,
    options,
    style: "--szot-select-max-width: 8rem",
    ...template.args,
  },
};

export const SingleSelected: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options[0],
    ...template.args,
  },
};

export const SimpleLong: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options: longDesserts,
    selected: longDesserts[0],
    ...template.args,
  },
};

export const SimpleRequired: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options[0],
    required: true,
    ...template.args,
  },
};

export const SimpleForceInvalid: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options[0],
    forceInvalid: true,
    ...template.args,
  },
};

export const Multiple: Story = {
  ...template,
  args: {
    multiple: true,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    ...template.args,
  },
};

export const MultipleSelected: Story = {
  ...template,
  args: {
    multiple: true,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options.slice(0, 3),
    ...template.args,
  },
};

export const MultipleLong: Story = {
  ...template,
  args: {
    multiple: true,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options: longDesserts,
    ...template.args,
  },
};

export const MultipleRequired: Story = {
  ...template,
  args: {
    multiple: true,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    required: true,
    min: 2,
    ...template.args,
  },
};

export const MultipleForceInvalid: Story = {
  ...template,
  args: {
    multiple: true,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    forceInvalid: true,
    ...template.args,
  },
};

export const HideSearchInput: Story = {
  ...template,
  args: {
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options[0],
    showSearchInput: false,
    ...template.args,
  },
};

export const HideLabel: Story = {
  ...template,
  args: {
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    showSearchInput: false,
    showLabel: false,
    selected: null,
    placeholder: "Placeholder...",
    ...template.args,
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesas",
    options,
    selected: options[0],
    style:
      "--szot-select-label-color: red;" +
      "--szot-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--szot-select-border: 10px;" +
      "--szot-select-border-color-filled: green;" +
      "--szot-select-border-color-focus: purple;" +
      "--szot-select-text-color: blue;",
    ...template.args,
  },
  parameters: {
    docs: {
      source: {
        language: "html",
        code: `
    <div
      style="--szot-select-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      "--szot-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
    >
      <Select
        multiple={false}
        id="doce" name="doce"
        label="Sobremesas"
        options={[
          {"text":"Torta alemã"},{"text":"Pavê"},{"text":"Bolo"},{"text":"Brigadeiro"},
          {"text":"Pudim"},{"text":"Rabanada"},{"text":"Beijinho"},
        ]}
      />
    </div>
    `,
      },
    },
  },
};
