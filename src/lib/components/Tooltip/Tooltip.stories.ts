import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Tooltip from "./Tooltip.svelte";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<Tooltip>;

export default meta;

type Template = TemplateObj<typeof meta, Tooltip>;
type Story = StoryObj<typeof meta, Tooltip>;

const template = {
  render: (props) => ({
    Component: Tooltip,
    props,
  }),
  args: {
    message: "Here's your tooltip",
    position: "right",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    tooltipStyle: "dark",
  },
};

export const Light: Story = {
  ...template,
  args: {
    ...template.args,
    tooltipStyle: "light",
  },
};
