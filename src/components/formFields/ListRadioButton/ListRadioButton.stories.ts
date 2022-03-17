import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import ListRadioButton from "./ListRadioButton.svelte";

export default {
  title: "Components/FormFields/ListRadioButton",
  component: ListRadioButton,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListRadioButton,
    props,
    on: {
      submit: action("submit"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});
