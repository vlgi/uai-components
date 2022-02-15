import "./ionic-components";
import DialogShorthand from "./components/Dialog/DialogShorthand";
import _Dialog from "./components/Dialog/Dialog.svelte";

export { default as Badge } from "./components/Badge/Badge.svelte";
export { default as Icon } from "./components/Icon/Icon.svelte";
export { default as Form } from "./components/Form/Form.svelte";
export { default as SideMenu } from "./components/SideMenu/SideMenu.svelte";
export { default as Dropdown } from "./components/Dropdown/Dropdown.svelte";

export { default as Select } from "./components/formFields/Select/Select.svelte";
export { default as SearchInput } from "./components/formFields/Select/SearchInput/SearchInput.svelte";
export { default as Input } from "./components/formFields/Input/Input.svelte";
export { default as Button } from "./components/formFields/Button/Button.svelte";
export { default as Textarea } from "./components/formFields/Textarea/Textarea.svelte";

export { default as Modal } from "./components/Modal/Modal.svelte";

// add shorthand to dialog component as static methods
export const Dialog = {
  ..._Dialog.prototype,
  ...DialogShorthand,
};
