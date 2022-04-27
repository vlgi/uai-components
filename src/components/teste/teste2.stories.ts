import type { ArgType } from "@storybook/addons";
import teste2 from "./teste2.svelte";

export default {
  title: "Components/Teste2",
  component: teste2,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: teste2,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
