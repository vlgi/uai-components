import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";

import Dropdown from "./Dropdown.svelte";
import DropdownExample from "./DropdownExample.svelte";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    dropdownAlignment: {
      control: "select",
      options: [
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
      ],
    },
  },
  // common stuff for all stories here
} satisfies Meta<Dropdown>;

export default meta;

type Template = TemplateObj<typeof meta, DropdownExample>;
type Story = StoryObj<typeof meta, DropdownExample>;

const template = {
  render: (args) => ({
    Component: DropdownExample,
    props: args,
  }),
  args: {
    // common stuff for template stories here
    targetId: "trigger-button",
  },
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    // args for this specific story here
    ...template.args,
    dropdownAlignment: "bottomRight",
  },
};

export const RightAlignment: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "rightTop",
  },
};

export const LeftAlignment: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "leftTop",
  },
};

export const BottomAlignment: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "bottomLeft",
    triggerStyle: "top:290px; left:0",
  },
};

export const RightAlignmentWithAutoAdjust: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "rightTop",
    triggerStyle: "top:0; left:250px",
  },
};

export const RightAlignmentWithoutAutoAdjust: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "rightTop",
    triggerStyle: "top:0; left:250px",
    enableAutAdjust: false,
  },
};

/**
 * Use this to see how dropdown works on scroll containers
 */
export const largeScroll: Story = {
  ...template,
  args: {
    ...template.args,
    dropdownAlignment: "rightTop",
    triggerStyle: "top:100vw; left:100vw",
    scrollStyle: "width:250vw; height:250vh",
    containerStyle: "width:calc(100vw - 120px); height:calc(99vh - 120px); margin: 50px",
  },
  parameters: {
    controls: {
      include: ["dropdownAlignment", "opened", "enableAutAdjust"],
    },
  },
};
