import Dialog from "./Dialog.svelte";

type TDialogTypes = "confirm" | "confirmCancel" | "info" | "error" | "warning" | "success";
type TOptions = {
  title: string;
  content: string;
  showHeader?: boolean;
  hideCloseButton?: boolean;
  centralizeContent?: boolean;
};

export default class DialogShorthand extends Dialog {
  static createDialog(
    type: TDialogTypes,
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    // create container and append to the DOM
    const containerEl = document.createElement("div");
    document.body.appendChild(containerEl);

    // render the dialog component
    const dialog = new Dialog({
      target: containerEl,
      props: {
        ...options,
        type,
        opened: true,
      },
    });

    function removeComponentOnClose() {
      containerEl.remove();
    }

    async function handleConfirm() {
      if (onConfirm) await onConfirm();
      removeComponentOnClose();
    }

    async function handleCancel() {
      if (onCancel) await onCancel();
      removeComponentOnClose();
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dialog.$on("confirm", handleConfirm);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    dialog.$on("cancel", handleCancel);
  }

  static confirm(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("confirm", options, onConfirm, onCancel);
  }

  static confirmCancel(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("confirmCancel", options, onConfirm, onCancel);
  }

  static error(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("error", options, onConfirm, onCancel);
  }

  static warning(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("warning", options, onConfirm, onCancel);
  }

  static success(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("success", options, onConfirm, onCancel);
  }

  static info(
    options: TOptions,
    onConfirm?: () => void | Promise<void>,
    onCancel?: () => void | Promise<void>
  ): void {
    this.createDialog("info", options, onConfirm, onCancel);
  }
}
