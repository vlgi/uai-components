import type { Meta } from "@storybook/svelte";
import type { StoryObj } from "$types/storybook";

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

type Story = StoryObj<typeof meta, Dialog>;

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

export const DialogShorthand: StoryObj<typeof meta, DialogShorthandExample> = {
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

export const DialogOpenClose: StoryObj<typeof meta, DialogOpenCloseExample> = {
  render: (props) => ({
    Component: DialogOpenCloseExample,
    props,
  }),
  args: {
    type: "confirmCancel",
    content: "hi! please confirme to go on.",
  },
};

export const DialogCustom: StoryObj<typeof meta, DialogCustomExample> = {
  render: (props) => ({
    Component: DialogCustomExample,
    props,
  }),
  args: {
    style:
      "--uai-dialog-text-color: green;" +
      "--uai-modal-bg-color: red;" +
      "--uai-modal-padding: 3rem;" +
      "--uai-modal-close-txt-color: yellow;" +
      "--uai-modal-close-bg-color: purple;" +
      "--uai-dialog-text-weight-header: 100;" +
      "--uai-dialog-text-weight: 700;" +
      "--uai-dialog-text-size: 1.5rem;" +
      "--uai-dialog-text-size-header: 0.625rem;" +
      "--uai-modal-margin-content: 2.5rem 0;",
    title: "Test",
    content: "testing component style",
    showHeader: true,
  },
};
