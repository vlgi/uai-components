import type { ArgType } from "@storybook/addons";
import { desserts } from "./fixtures";
// import { action } from "@storybook/addon-actions";
import SearchInput from "./SearchInput.svelte";
import SearchInputWrapper from "./SearchInputWrapper.svelte";

export default {
  title: "Form/Select/SearchInput",
  component: SearchInput,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SearchInputWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

const items = desserts;

export const Default = Template({
  items,
  searchable: ["variety"],
  searchQuery: "",
});

export const Searching = Template({
  items,
  searchable: ["variety"],
  searchQuery: "brownie",
});

export const MultipleFieldsSearching = Template({
  items,
  searchable: ["variety", "topping", "flavor"],
  searchQuery: "brownie chocolate",
});
