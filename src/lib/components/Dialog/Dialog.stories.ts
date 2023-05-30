import { action } from "@storybook/addon-actions";
import type { ArgType } from "@storybook/addons";
import Dialog from "./Dialog.svelte";
import DialogOpenCloseExampleComponent from "./DialogOpenCloseExample.svelte";
import DialogShorthandComponent from "./DialogShorthand.svelte";
import DialogCustomExampleComponent from "./DialogCustomExample.svelte";

export default {
  title: "Components/Dialog",
  component: Dialog,
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
  content: "Um monete de coisa aleatoria Um monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoriaUm monete de coisa aleatoria",
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

export const Success = Template({
  type: "success",
  content: "Great, everything worked out.",
});

export const DialogOpenCloseExample = () => ({
  Component: DialogOpenCloseExampleComponent,
});

const DialogShorthandTemplate = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DialogShorthandComponent,
    props,
    on: {
      confirm: action("on:confirm"),
      cancel: action("on:cancel"),
    },
  });
  ret.args = _args;
  return ret;
};

export const DialogShorthandExample = DialogShorthandTemplate({});

const CustomTemplate = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DialogCustomExampleComponent,
    props,
    on: {
      confirm: action("on:confirm"),
      cancel: action("on:cancel"),
    },
  });
  ret.args = _args;
  return ret;
};

export const CustomExample = CustomTemplate({
  style: "--szot-dialog-text-color: green;"
        + "--szot-modal-bg-color: red;"
        + "--szot-modal-padding: 3rem;"
        + "--szot-modal-close-txt-color: yellow;"
        + "--szot-modal-close-bg-color: purple;"
        + "--szot-dialog-text-weight-header: 100;"
        + "--szot-dialog-text-weight: 700;"
        + "--szot-dialog-text-size: 1.5rem;"
        + "--szot-dialog-text-size-header: 0.625rem;"
        + "--szot-modal-margin-content: 2.5rem 0;",
  title: "Test",
  content: "testing component style",
  showHeader: true,
});
