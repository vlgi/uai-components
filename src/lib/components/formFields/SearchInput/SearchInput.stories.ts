import type { ArgType } from "@storybook/addons";
import { complexDesserts } from "./fixtures";
import SearchInput from "./SearchInput.svelte";
import Wrapper from "./SearchInputWrapper.svelte";

export default {
  title: "Components/FormFields/SearchInput",
  component: SearchInput,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Wrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  items: complexDesserts,
  searchable: ["variety", "flavor"],
  searchQuery: "",
});

export const Searching = Template({
  items: complexDesserts,
  searchable: ["variety"],
  searchQuery: "brownie",
  icon: "mdi:magnify",
});

export const MultipleFieldsSearching = Template({
  items: complexDesserts,
  searchable: ["variety", "topping", "flavor"],
  searchQuery: "brownie chocolate",
});
