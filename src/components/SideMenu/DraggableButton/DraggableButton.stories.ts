import type { ArgType } from "@storybook/addons";
import DraggableButton from "./DraggableButton.svelte";

export default {
  title: "Components/SideMenu/Components/DraggableButton",
  component: DraggableButton,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DraggableButton,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
