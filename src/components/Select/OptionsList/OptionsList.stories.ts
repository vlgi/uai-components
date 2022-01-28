import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import { longDesserts, simpleDesserts } from "../fixtures";
import OptionsList from "./OptionsList.svelte";
import OptionsListWrapper from "./OptionsListWrapper.svelte";

export default {
  title: "Components/Select/OptionsList",
  component: OptionsList,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: OptionsListWrapper,
    props,
    on: {
      changeSelected: action("onChangeSelected"),
    },
  });
  ret.args = _args;
  return ret;
};

const options = longDesserts;

export const Default = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
});

export const SingleSelected = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
  selected: options[3],
});

export const Focused = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
  focused: 3,
});

export const FocusedSelected = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
  selected: options[2],
  focused: 3,
});

export const Multiple = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
  selected: [],
});

export const MultipleSelected = Template({
  id: "doce-listbox",
  labelledBy: "doce-label",
  options,
  selected: [...options.slice(2, 5), options[0]],
});
