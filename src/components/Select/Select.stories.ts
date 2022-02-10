import type { ArgType } from "@storybook/addons";
import { longDesserts, simpleDesserts } from "./fixtures";
// import { action } from "@storybook/addon-actions";
import Select from "./Select.svelte";
import SelectWrapper from "./SelectWrapper.svelte";

export default {
  title: "Components/Form/FormFields/Select",
  component: Select,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SelectWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

const options = simpleDesserts;

export const Single = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
});

export const SingleSelected = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  selected: options[0],
});

export const SimpleLong = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options: longDesserts,
});

export const Multiple = Template({
  multiple: true,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
});

export const MultipleSelected = Template({
  multiple: true,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  selected: options.slice(0, 3),
});

export const MultipleLong = Template({
  multiple: true,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options: longDesserts,
});
