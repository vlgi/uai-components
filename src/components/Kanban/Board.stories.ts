import type { ArgType } from "@storybook/addons";
import BoardWrapper from "./BoardWrapperForTest.svelte";

export default {
  title: "Components/Kanban",
  component: BoardWrapper,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BoardWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});

