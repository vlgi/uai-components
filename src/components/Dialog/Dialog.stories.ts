import { action } from "@storybook/addon-actions";
import type { ArgType } from "@storybook/addons";
import Dialog from "./Dialog.svelte";
import DialogOpenCloseExampleComponent from "./DialogOpenCloseExample.svelte";

export default {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    docs: {
      page: null,
    },
  },
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["confirm", "confirmCancel", "info", "error", "warning", "success"],
      },
    },
  },
  args: {
    opened: true,
    title: "my dialog title",
    content: "hi! please confirme to go on.",
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Dialog,
    props,
    on: {
      confirm: action("on:confirm"),
      cancel: action("on:cancel"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
});

export const WithCloseOnEscOrClickOut = Template({
  disableCloseOnEvents: false,
});

export const Confirm = Template({
  type: "confirm",
});

export const Error = Template({
  type: "error",
  content: "Sorry, something goes wrong.",
});

export const DialogOpenCloseExample = () => ({
  Component: DialogOpenCloseExampleComponent,
});
