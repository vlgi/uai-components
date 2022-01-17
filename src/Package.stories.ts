import type { ArgType } from "@storybook/addons";
import Package from "./Package.svelte";

export default {
  title: "External/SveltePdfViewer",
  component: Package,
  parameters: {
    // add delay in ms to have time to render image
    creevey: {
      delay: 1000,
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Package,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
