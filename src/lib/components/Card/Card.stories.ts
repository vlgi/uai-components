import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Card from "./Card.svelte";
import CardExample from "./CardExample.svelte";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<Card>;

export default meta;

type Template = TemplateObj<typeof meta, CardExample>;
type Story = StoryObj<typeof meta, CardExample>;

const template = {
  render: (props) => ({
    Component: CardExample,
    props,
  }),
  args: {
    bodyHtml: `<b>List</b>
    <a href="https://google.com.br">A</a>
    <a href="https://google.com.br">B</a>
    <a href="https://google.com.br">C</a>
    <a href="https://google.com.br">D</a>
    <a href="https://google.com.br">E</a>`,
    headerHtml: "<button>Adicionar Item</button>",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
  },
};

export const Slotted: Story = {
  ...template,
  args: {
    bodySlotted: true,
    ...template.args,
  },
};

export const WithTitle: Story = {
  ...template,
  args: {
    ...template.args,
    bodySlotted: true,
    headerHtml: "",
    title: "Cool list",
  },
};

export const WithHeader: Story = {
  ...template,
  args: {
    ...template.args,
    title: "Cool list",
  },
};

export const WithFooter: Story = {
  ...template,
  args: {
    ...template.args,
    bodySlotted: true,
    footerHtml: "<button>apagar tudo</button>",
  },
};
