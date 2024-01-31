import { bounceOut } from "svelte/easing";
import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import Collapsable from "./Collapsable.svelte";
import CollapsableRealExample from "./CollapsableRealExample.svelte";
import CollapsableExample from "./CollapsableExample.svelte";
import CollapsableRealExampleString from "./CollapsableRealExample.svelte?raw";

/**
 * The new version of Storybook broke this documentation.
 * Storybook can't create docs for components with context module.
 *
 * We will work on this documentation problem.
 */
const meta = {
  title: "Components/Collapsable",
  component: Collapsable,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<Collapsable>;

export default meta;

type Template = TemplateObj<typeof meta, CollapsableExample>;
type Story = StoryObj<typeof meta, CollapsableExample>;

const template = {
  render: (args) => ({
    Component: CollapsableExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
    title: "My Collapsable",
  },
  argTypes: {
    collapsableStyle: {
      control: "select",
      options: ["primary", "secondary", "dark", "light"],
    },
    collapsableStyleType: {
      control: "select",
      options: ["filled", "outline", "not-filled"],
    },
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
    contentBackground: false,
    expanded: false,
  },
};

export const ContentBackground: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
    contentBackground: true,
    expanded: false,
  },
};

export const DifferentAnimation: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
    contentBackground: true,
    expanded: false,
    expansionTransitionParams: {
      duration: 1000,
      delay: 500,
      easing: bounceOut,
    },
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
    contentBackground: true,
    expanded: false,
    collapsableStyleType: "outline",
    style:
      "--uai-collapsable-border-width: 10px;" +
      "--uai-collapsable-border-color: linear-gradient(to right, red, blue, green);" +
      "--uai-collapsable-color: linear-gradient(to right, red, blue, green);" +
      "--uai-collapsable-content-border-width: 5px;" +
      "--uai-collapsable-content-border-color: linear-gradient(to bottom left, red, orange, yellow, green, blue, indigo, violet);" +
      "--uai-collapsable-content-color: linear-gradient(to bottom left, red, orange, yellow, green, blue, indigo, violet);" +
      "--uai-collapsable-icon-color: linear-gradient(to top, magenta, yellow, cyan);" +
      "--uai-collapsable-title-font-size: 24px;" +
      "--uai-collapsable-box-shadow: inset -0.5px -1px 1px rgba(0, 0, 0, 0.13), inset 0.5px 1px 1px rgba(255, 255, 255, 0.02);" +
      "--uai-collapsable-backdrop-filter: blur(30.5px);",
  },
};

/**
 * This story must be the last one, because storybook autodocs get the
 * first story to extract the props.
 */
export const RealExample: StoryObj<typeof meta, CollapsableRealExample> = {
  render: () => ({
    Component: CollapsableRealExample,
  }),
  parameters: {
    docs: {
      source: {
        code: CollapsableRealExampleString,
      },
    },
    controls: { hideNoControlsWarning: true },
  },
};
