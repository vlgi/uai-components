import type { ArgType } from "@storybook/addons";
// import { action } from "@storybook/addon-actions";
import Select from "./Select.svelte";

export default {
  title: "Form/Select",
  component: Select,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Select,
    props,
  });
  ret.args = _args;
  return ret;
};

const options = [
  { text: "Torta alemã" },
  { text: "Pavê" },
  { text: "Bolo" },
  { text: "Brigadeiro" },
  { text: "Pudim" },
  { text: "Rabanada" },
  { text: "Beijinho" },
];

export const Single = Template({
  multiple: false,
  selectAttributes: { id: "doce", name: "doce" },
  label: "Sobremesas",
  options,
});

export const SingleSelected = Template({
  multiple: false,
  selectAttributes: { id: "doce", name: "doce" },
  label: "Sobremesas",
  options,
  selected: options[0],
});

export const Multiple = Template({
  multiple: true,
  selectAttributes: { id: "doce", name: "doce" },
  label: "Sobremesas",
  options,
});

export const MultipleSelected = Template({
  multiple: true,
  selectAttributes: { id: "doce", name: "doce" },
  label: "Sobremesas",
  options,
  selected: options.slice(0, 3),
});
