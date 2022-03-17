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

const radioOptions = [
  {
    value: "firstOption",
    label: "Opção 1",
  },
  {
    value: "secondOption",
    label: "Opção 2",
  },
  {
    value: "thirdOption",
    label: "Opção 3",
  },
];

const radioOptionsChecked = [
  {
    value: "firstOption",
    label: "Opção 1",
  },
  {
    value: "secondOption",
    label: "Opção 2",
    checked: true,
  },
  {
    value: "thirdOption",
    label: "Opção 3",
  },
];

export const Default = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions,
});

export const DefaultChecked = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions: radioOptionsChecked,
});

export const FilledRadios = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions,
  filled: true,
});
