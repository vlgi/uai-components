import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import { longDesserts, simpleDesserts, complexDesserts } from "./fixtures";
import type { TOption } from "./types";

import Select from "./Select.svelte";
import SelectExample from "./SelectExample.svelte";

const desserts: TOption[] = complexDesserts.map((d) => ({ text: d.variety, ...d }));

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
    style: "--uai-select-max-width: 8rem",
    ...template.args,
  },
};

export const SingleFloating: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    options,
    required: true,
    dropdownStyle: "floating",
    style: "--uai-select-floating-dropdown-bg-color: #eee",
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

export const HideIcon: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    selected: null,
    options,
    hideArrowIcon: true,
    ...template.args,
  },
};

export const LimitOptionsDisplayed: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    selected: null,
    options: longDesserts,
    maxNumberOfOptions: 8,
    style: "--uai-select-dropdown-max-height: 18rem;",
    ...template.args,
  },
};

export const SearchMoreFields: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    selected: null,
    options: desserts,
    searchable: ["flavor"],
    ...template.args,
  },
};

export const HideOptionsWhenNotSearching: Story = {
  ...template,
  args: {
    multiple: false,
    id: "doce",
    name: "doce",
    label: "Sobremesa",
    selected: null,
    options,
    hideOptionsWhenNotSearching: true,
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
      "--uai-select-label-color: red;" +
      "--uai-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);" +
      "--uai-select-border: 10px;" +
      "--uai-select-border-color-filled: green;" +
      "--uai-select-border-color-focus: purple;" +
      "--uai-select-text-color: blue;",
    ...template.args,
  },
  parameters: {
    docs: {
      source: {
        language: "html",
        code: `
    <div
      style="--uai-select-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      "--uai-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
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
