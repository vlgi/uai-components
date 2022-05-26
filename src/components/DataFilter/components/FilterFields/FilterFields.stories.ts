import type { ArgType } from "@storybook/addons";
import FilterFields from "./FilterFields.svelte";
import { EFieldType } from "./types";
import { allCommonConfigs } from "./fixtures";

export default {
  title: "Internal Documentation/Components/DataFilter/FilterFields",
  component: FilterFields,
  parameters: {
    // skip all screen test
    creevey: {
      skip: true,
    },
    // disabled
    storyshots: false,
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: FilterFields,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  selectedValues: [],
  selectedFilters: [],
  configs: allCommonConfigs,
});

export const Selected = Template({
  configs: allCommonConfigs,
  selectedFilters: ["datetime"],
  selectedValues: [
    {
      fieldType: EFieldType.datepicker,
      key: "datetime",
      value: "2000-01-13T11:50",
    },
    {
      fieldType: EFieldType.input,
      key: "input-money",
      value: "100000,12",
    },
  ],
});
