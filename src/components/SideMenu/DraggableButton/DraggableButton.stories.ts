import type { ArgType } from "@storybook/addons";
import DraggableButton from "./DraggableButton.svelte";

export default {
  title: "Internal Documentation/Components/SideMenu/Components/DraggableButton",
  component: DraggableButton,
  parameters: {
    // skip all screen test for button stories
    creevey: {
      skip: true,
    },
    storyshots: false,
  },
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
