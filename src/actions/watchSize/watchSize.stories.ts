import { action } from "@storybook/addon-actions";
import type { ArgType } from "@storybook/addons";
import WatchSize from "./WatchSize.svelte";

export default {
  title: "Internal Documentation/Actions/WatchSize",
  component: "WatchSize",
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: WatchSize,
    props,
    on: {
      actionResize: action("on:actionResize"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
