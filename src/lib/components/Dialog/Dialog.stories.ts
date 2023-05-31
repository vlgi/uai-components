import type { Meta, StoryObj } from "@storybook/svelte";
import type { TemplatedStoryObj } from "$types/storybook";

import Dialog from "./Dialog.svelte";
import DialogShorthandExample from "./DialogShorthandExample.svelte";
import DialogOpenCloseExample from "./DialogOpenCloseExample.svelte";
import DialogCustomExample from "./DialogCustomExample.svelte";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  argTypes: {
    type: {
      control: "select",
      options: ["confirm", "confirmCancel", "info", "error", "warning", "success"],
    },
  },
  args: {
    opened: true,
    title: "my dialog title",
    content: "hi! please confirme to go on.",
  },
  // common stuff for all stories here
} satisfies Meta<Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LongContent: Story = {
  args: {
    // args for this specific story here
    content:
      "Um monete de coisa aleatoria Um monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoria",
  },
};

export const WithCloseOnEscOrClickOut: Story = {
  args: {
    // args for this specific story here
    disableCloseOnEvents: false,
  },
};

export const Confirm: Story = {
  args: {
    type: "confirm",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    content: "Sorry, something goes wrong.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    content: "Great, everything worked out.",
  },
};

export const DialogShorthand: TemplatedStoryObj<typeof meta, DialogShorthandExample> = {
  render: (props) => ({
    Component: DialogShorthandExample,
    props,
  }),
  parameters: {
    controls: {
      // remove all controls and keep just the events,
      // once this example component doesn't export any props
      include: ["confirm", "cancel", "type"],
      hideNoControlsWarning: true,
    },
  },
  args: {
    type: "confirmCancel",
  },
};

export const DialogOpenClose: TemplatedStoryObj<typeof meta, DialogOpenCloseExample> = {
  render: (props) => ({
    Component: DialogOpenCloseExample,
    props,
  }),
  args: {
    type: "confirmCancel",
    content: "hi! please confirme to go on.",
  },
};

export const DialogCustom: TemplatedStoryObj<typeof meta, DialogCustomExample> = {
  render: (props) => ({
    Component: DialogCustomExample,
    props,
  }),
  args: {
    style:
      "--szot-dialog-text-color: green;" +
      "--szot-modal-bg-color: red;" +
      "--szot-modal-padding: 3rem;" +
      "--szot-modal-close-txt-color: yellow;" +
      "--szot-modal-close-bg-color: purple;" +
      "--szot-dialog-text-weight-header: 100;" +
      "--szot-dialog-text-weight: 700;" +
      "--szot-dialog-text-size: 1.5rem;" +
      "--szot-dialog-text-size-header: 0.625rem;" +
      "--szot-modal-margin-content: 2.5rem 0;",
    title: "Test",
    content: "testing component style",
    showHeader: true,
  },
};
