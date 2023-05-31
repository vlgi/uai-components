import type { Meta } from "@storybook/svelte";
import type { TemplatedStoryObj, TemplateObj } from "$types/storybook";

import Badge from "./Badge.svelte";
import BadgeExample from "./BadgeExample.svelte";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"], // enable auto docs
  argTypes: {
    badgeStyle: {
      control: "select",
      options: ["primary", "secondary", "dark", "light"],
    },
    badgeStyleType: {
      control: "select",
      options: ["filled", "outline", "not-filled"],
    },
  },
} satisfies Meta<Badge>;

export default meta;

type Template = TemplateObj<typeof meta, BadgeExample>;
type Story = TemplatedStoryObj<typeof meta, BadgeExample>;

const template = {
  render: (args) => ({
    Component: BadgeExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
    labelSlot: "Badge Label",
  },
} satisfies Template;

export const Theme: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    style: "",
    badgeStyle: "dark",
  },
};

export const Border: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    badgeStyle: "primary",
    badgeStyleType: "outline",
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    labelSlot: "New",
    style:
      "--szot-badge-color:#FFFFFF;" +
      "--szot-badge-background-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
  },
};
