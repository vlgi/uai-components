import type { ArgType } from "@storybook/addons";
import DatepickerRange from "./DatepickerRange.svelte";
import { EPickerType } from "../Datepicker/types";

export default {
  title: "Internal Documentation/Components/DataFilter/Formfields/Datepicker Range",
  component: DatepickerRange,
  // skip all screen test for button stories
  creevey: {
    skip: true,
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DatepickerRange,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "My Range Label",
  name: "my-range-name",
  pickerType: EPickerType.date,
  value: {
    from: "2001-01-01",
    to: "2010-10-10",
  },
});

export const Invalid = Template({
  label: "My Range Label",
  name: "my-range-name",
  pickerType: EPickerType.date,
  value: {
    from: "2010-10-10",
    to: "2001-01-01",
  },
});

export const Empty = Template({
  label: "My Range Label",
  name: "my-range-name",
  pickerType: EPickerType.date,
});
