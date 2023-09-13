import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import Tooltip from "./Tooltip.svelte";
import TooltipExample from "./TooltipExample.svelte";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<Tooltip>;

export default meta;

type Template = TemplateObj<typeof meta, TooltipExample>;
type Story = StoryObj<typeof meta, TooltipExample>;

const template = {
  render: (props) => ({
    Component: TooltipExample,
    props,
  }),
  args: {
    tip: "Here's your tooltip",
    position: "right",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    style: "",
  },
};

export const Big: Story = {
  ...template,
  args: {
    ...template.args,
    iconSize: "50px",
    style: "--szot-tooltip-txt-font-size:2rem;" + "--szot-tooltip-txt-font-weight:400;",
  },
};

export const Colored: Story = {
  ...template,
  args: {
    ...template.args,
    iconColor: "red",
    tipBgColor: "#928aff",
    style: "--szot-tooltip-txt-color:red;",
  },
};
