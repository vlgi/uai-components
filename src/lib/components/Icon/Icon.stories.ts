import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import Icon from "./Icon.svelte";
import IconWrapper from "./IconWrapper.svelte";

const meta = {
  title: "Components/Icon",
  component: Icon,
  // common stuff for all stories here
} satisfies Meta<Icon>;

export default meta;

type Template = TemplateObj<typeof meta, IconWrapper>;
type Story = StoryObj<typeof meta, IconWrapper>;

const template = {
  render: (args) => ({
    Component: IconWrapper,
    props: args,
  }),
  args: {
    // common stuff for template stories here
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    iconName: "mdi:cellphone",
    ...template.args,
  },
};

export const Custom: Story = {
  ...template,
  args: {
    iconName: "ic:baseline-apple",
    style: "--szot-icon-font-size: 80px;" + "--szot-icon-color: red;",
    ...template.args,
  },
};
