import type { ArgType } from "@storybook/addons";
import Modal from "./Modal.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/Modal",
  component: Modal,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Modal,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
