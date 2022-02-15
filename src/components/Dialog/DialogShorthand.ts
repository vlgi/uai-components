import Dialog from "./Dialog.svelte";

type TOptions = {
  title: string,
  content: string
}

function createDialog(
  type: string,
  options: TOptions,
  onConfirm: ()=> void,
  onCancel: ()=> void,
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

  function handleConfirm() {
    onConfirm();
    removeComponentOnClose();
  }

  function handleCancel() {
    onCancel();
    removeComponentOnClose();
  }

  dialog.$on("confirm", handleConfirm);
  dialog.$on("cancel", handleCancel);
}

export default {
  confirm: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("confirm", options, onConfirm, onCancel)
  ),
  confirmCancel: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("confirmCancel", options, onConfirm, onCancel)
  ),
  error: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("error", options, onConfirm, onCancel)
  ),
  warning: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("warning", options, onConfirm, onCancel)
  ),
  success: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("success", options, onConfirm, onCancel)
  ),
  info: (options: TOptions, onConfirm: ()=> void, onCancel: ()=> void): void => (
    createDialog("info", options, onConfirm, onCancel)
  ),
};
