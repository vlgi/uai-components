import type { ArgType } from "@storybook/addons";
import { longDesserts, simpleDesserts } from "./fixtures";
// import { action } from "@storybook/addon-actions";
import Select from "./Select.svelte";
import SelectWrapper from "./SelectWrapper.svelte";

export default {
  title: "Components/FormFields/Select",
  component: Select,
  argTypes: {
    selectStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    selectBorder: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["bottom", "outline"],
      },
    },
    badgeStyle: { table: { category: "visual properties" } },
  },
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

export const SimpleRequired = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  required: true,
});

export const SimpleForceInvalid = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  forceInvalid: true,
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

export const MultipleRequired = Template({
  multiple: true,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  required: true,
  min: 2,
});

export const MultipleForceInvalid = Template({
  multiple: true,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  forceInvalid: true,
});

export const CustomExample: any = Template({
  multiple: false,
  id: "doce",
  name: "doce",
  label: "Sobremesas",
  options,
  style: "--szot-select-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
});

CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <div
      style="--szot-select-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);
      "--szot-select-border-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
    >
      <Select
        multiple={false} 
        id="doce" name="doce" 
        label="Sobremesas" 
        options={[
          {"text":"Torta alemã"},{"text":"Pavê"},{"text":"Bolo"},{"text":"Brigadeiro"},
          {"text":"Pudim"},{"text":"Rabanada"},{"text":"Beijinho"},
        ]}
      />
    </div>
    `,
    },
  },
};
