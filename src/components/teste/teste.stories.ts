import type { ArgType } from "@storybook/addons";
import teste from "./teste.svelte";

export default {
  title: "Components/Teste",
  component: teste,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: teste,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
